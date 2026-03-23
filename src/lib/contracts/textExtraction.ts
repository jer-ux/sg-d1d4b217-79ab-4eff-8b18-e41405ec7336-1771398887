/**
 * Contract Text Extraction
 * Handles PDF, DOCX, and OCR-based text extraction
 */

import type { ContractDocument, ExtractionResult } from "./types";

/**
 * Extract text from uploaded contract file
 * Supports: PDF, DOCX, DOC
 */
export async function extractTextFromFile(
  file: File
): Promise<ExtractionResult> {
  const startTime = Date.now();
  
  try {
    let extractedText = "";
    let method = "unknown";

    // Determine extraction method based on file type
    if (file.type === "application/pdf") {
      extractedText = await extractFromPDF(file);
      method = "pdf-parse";
    } else if (
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword"
    ) {
      extractedText = await extractFromDOCX(file);
      method = "mammoth";
    } else {
      throw new Error(`Unsupported file type: ${file.type}`);
    }

    const processingTime = Date.now() - startTime;
    const wordCount = extractedText.split(/\s+/).length;
    const charCount = extractedText.length;

    return {
      success: true,
      text: extractedText,
      metadata: {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        extractionMethod: method,
        processingTimeMs: processingTime,
        wordCount,
        characterCount: charCount,
        pageCount: estimatePageCount(extractedText)
      }
    };
  } catch (error) {
    return {
      success: false,
      text: "",
      error: error instanceof Error ? error.message : "Text extraction failed",
      metadata: {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        extractionMethod: "failed",
        processingTimeMs: Date.now() - startTime,
        wordCount: 0,
        characterCount: 0,
        pageCount: 0
      }
    };
  }
}

/**
 * Extract text from PDF using pdf-parse
 */
async function extractFromPDF(file: File): Promise<string> {
  // Dynamic import for browser compatibility
  const pdfParse = (await import("pdf-parse/lib/pdf-parse")).default;
  
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  const data = await pdfParse(buffer);
  
  if (!data.text || data.text.trim().length === 0) {
    throw new Error("No text found in PDF - may be scanned image");
  }
  
  return data.text;
}

/**
 * Extract text from DOCX using mammoth
 */
async function extractFromDOCX(file: File): Promise<string> {
  const mammoth = await import("mammoth");
  
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  
  if (!result.value || result.value.trim().length === 0) {
    throw new Error("No text found in DOCX file");
  }
  
  return result.value;
}

/**
 * Estimate page count based on text length
 * Assumes ~500 words per page (industry standard)
 */
function estimatePageCount(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 500);
}

/**
 * Clean and normalize extracted text
 */
export function cleanExtractedText(text: string): string {
  return text
    .replace(/\r\n/g, "\n") // Normalize line endings
    .replace(/\n{3,}/g, "\n\n") // Remove excessive blank lines
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
}

/**
 * Split text into chunks for AI processing
 * Max chunk size: 8000 tokens (~32000 characters)
 */
export function chunkText(text: string, maxChunkSize: number = 32000): string[] {
  const chunks: string[] = [];
  let currentChunk = "";
  
  const paragraphs = text.split("\n\n");
  
  for (const paragraph of paragraphs) {
    if (currentChunk.length + paragraph.length > maxChunkSize) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = "";
      }
    }
    currentChunk += paragraph + "\n\n";
  }
  
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}