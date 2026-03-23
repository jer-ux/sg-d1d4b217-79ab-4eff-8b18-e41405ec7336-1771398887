/**
 * RFP Response Generator with Claude AI
 * Automatically generates tailored RFP responses
 */

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export interface RFPQuestion {
  section: string;
  questionNumber: string;
  question: string;
  wordLimit?: number;
  required: boolean;
}

export interface RFPResponse {
  questionNumber: string;
  question: string;
  answer: string;
  confidence: number;
  needsReview: boolean;
  sources: string[];
  wordCount: number;
}

export interface CompanyProfile {
  name: string;
  industry: string;
  yearsInBusiness: number;
  employeeCount: number;
  clients: string[];
  certifications: string[];
  capabilities: string[];
  caseStudies: Array<{
    client: string;
    challenge: string;
    solution: string;
    results: string;
  }>;
}

/**
 * Extract questions from RFP document
 */
export async function extractRFPQuestions(rfpText: string): Promise<RFPQuestion[]> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      system: `You are an expert at analyzing RFP documents. Extract all questions that require responses.

For each question, identify:
1. Section heading
2. Question number
3. Full question text
4. Word limit (if specified)
5. Whether it's required or optional

Return as JSON array:
[{
  "section": "Company Overview",
  "questionNumber": "1.1",
  "question": "Describe your company's experience...",
  "wordLimit": 500,
  "required": true
}]`,
      messages: [{
        role: "user",
        content: `Extract all questions from this RFP:\n\n${rfpText.substring(0, 15000)}`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    const questions = JSON.parse(content.text);
    return questions;
  } catch (error) {
    console.error("Failed to extract RFP questions:", error);
    return [];
  }
}

/**
 * Generate response to single RFP question
 */
export async function generateRFPResponse(
  question: RFPQuestion,
  companyProfile: CompanyProfile,
  context: string = ""
): Promise<RFPResponse> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2048,
      system: `You are a professional proposal writer. Generate compelling, accurate responses to RFP questions.

Use this company information:
- Name: ${companyProfile.name}
- Industry: ${companyProfile.industry}
- Experience: ${companyProfile.yearsInBusiness} years
- Team Size: ${companyProfile.employeeCount} employees
- Certifications: ${companyProfile.certifications.join(", ")}
- Key Capabilities: ${companyProfile.capabilities.join(", ")}
- Notable Clients: ${companyProfile.clients.join(", ")}

Guidelines:
1. Be specific and quantitative (use numbers, metrics)
2. Reference relevant case studies when applicable
3. Stay within word limit (${question.wordLimit || "no limit"})
4. Use professional but accessible language
5. Address all parts of the question
6. Highlight competitive differentiators

Return JSON:
{
  "answer": "The response text...",
  "confidence": 0.85,
  "needsReview": false,
  "sources": ["case study X", "certification Y"],
  "wordCount": 245
}`,
      messages: [{
        role: "user",
        content: `Question ${question.questionNumber}: ${question.question}\n\nAdditional Context: ${context}`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    const result = JSON.parse(content.text);
    
    return {
      questionNumber: question.questionNumber,
      question: question.question,
      ...result
    };
  } catch (error) {
    console.error(`Failed to generate response for question ${question.questionNumber}:`, error);
    return {
      questionNumber: question.questionNumber,
      question: question.question,
      answer: "[ERROR: Unable to generate response. Manual input required.]",
      confidence: 0,
      needsReview: true,
      sources: [],
      wordCount: 0
    };
  }
}

/**
 * Generate complete RFP response document
 */
export async function generateCompleteRFP(
  rfpText: string,
  companyProfile: CompanyProfile
): Promise<{
  questions: RFPQuestion[];
  responses: RFPResponse[];
  summary: {
    totalQuestions: number;
    answered: number;
    needsReview: number;
    estimatedTime: string;
    complianceScore: number;
  };
}> {
  // Extract questions
  const questions = await extractRFPQuestions(rfpText);
  
  // Generate responses for each question
  const responses: RFPResponse[] = [];
  
  for (const question of questions) {
    const response = await generateRFPResponse(question, companyProfile);
    responses.push(response);
    
    // Small delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Calculate summary stats
  const needsReview = responses.filter(r => r.needsReview).length;
  const avgConfidence = responses.reduce((sum, r) => sum + r.confidence, 0) / responses.length;
  
  return {
    questions,
    responses,
    summary: {
      totalQuestions: questions.length,
      answered: responses.length,
      needsReview,
      estimatedTime: `${Math.ceil(questions.length * 0.5)} minutes`,
      complianceScore: Math.round(avgConfidence * 100)
    }
  };
}

/**
 * Export RFP response to formatted document
 */
export function exportRFPResponse(
  responses: RFPResponse[],
  format: "markdown" | "html" = "markdown"
): string {
  if (format === "markdown") {
    return responses.map(r => `
## ${r.questionNumber}. ${r.question}

${r.answer}

${r.needsReview ? "⚠️ **Requires Manual Review**" : ""}
${r.confidence < 0.7 ? `*Confidence: ${Math.round(r.confidence * 100)}%*` : ""}

---
`).join("\n");
  }
  
  // HTML format
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    .question { margin-bottom: 30px; }
    .question-number { color: #1e40af; font-weight: bold; }
    .answer { line-height: 1.6; }
    .review-flag { background: #fef3c7; padding: 10px; border-left: 4px solid #f59e0b; }
  </style>
</head>
<body>
  ${responses.map(r => `
    <div class="question">
      <h3 class="question-number">${r.questionNumber}. ${r.question}</h3>
      <div class="answer">${r.answer}</div>
      ${r.needsReview ? '<div class="review-flag">⚠️ Requires Manual Review</div>' : ''}
    </div>
  `).join("")}
</body>
</html>
  `;
}