/**
 * Onboarding & Training Automator with Claude AI
 * Personalized learning paths and just-in-time help
 */

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export interface UserProfile {
  userId: string;
  name: string;
  role: "cfo" | "benefits_manager" | "hr_director" | "analyst" | "executive" | "admin";
  department: string;
  technicalSkill: "beginner" | "intermediate" | "advanced";
  goals: string[];
}

export interface LearningPath {
  userId: string;
  totalDuration: string;
  estimatedCompletion: string;
  weeks: Array<{
    weekNumber: number;
    title: string;
    focus: string;
    modules: Array<{
      moduleId: string;
      title: string;
      duration: string;
      type: "video" | "interactive" | "reading" | "hands-on";
      objectives: string[];
      completed: boolean;
    }>;
  }>;
  milestones: Array<{
    name: string;
    date: string;
    achievement: string;
  }>;
}

export interface ContextualHelp {
  context: string;
  helpType: "tip" | "warning" | "tutorial" | "best-practice";
  title: string;
  content: string;
  actions: Array<{
    label: string;
    action: string;
  }>;
  relatedTopics: string[];
}

/**
 * Generate personalized learning path
 */
export async function generateLearningPath(
  profile: UserProfile
): Promise<LearningPath> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 6144,
      system: `You are an enterprise software training expert. Create personalized onboarding paths based on user roles and skill levels.

Role-Specific Focus Areas:

CFO:
- Financial metrics and ROI tracking
- Executive reporting and dashboards
- Budget impact analysis
- Audit trails and compliance

Benefits Manager:
- Plan design and optimization
- Vendor management
- Member communications
- Cost containment strategies

HR Director:
- Employee onboarding and education
- Benefits enrollment
- Compliance requirements
- Employee satisfaction

Analyst:
- Data analysis and reporting
- Advanced features and integrations
- API usage and automation
- Custom dashboards

Executive:
- High-level dashboards
- Strategic insights
- Board reporting
- Decision support

Structure learning in 4 weeks:
- Week 1: Platform fundamentals (everyone)
- Week 2: Role-specific core features
- Week 3: Advanced capabilities
- Week 4: Optimization and mastery

Balance time investment: Beginners need more basics, advanced users can skip ahead.`,
      messages: [{
        role: "user",
        content: `Create personalized learning path:

USER PROFILE:
Name: ${profile.name}
Role: ${profile.role}
Department: ${profile.department}
Skill Level: ${profile.technicalSkill}
Goals: ${profile.goals.join(", ")}

Generate comprehensive 4-week learning path with daily modules, objectives, and milestones.`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    const learningPath = JSON.parse(content.text);
    
    return {
      userId: profile.userId,
      ...learningPath
    } as LearningPath;
  } catch (error) {
    console.error("Failed to generate learning path:", error);
    throw error;
  }
}

/**
 * Provide contextual help
 */
export async function getContextualHelp(
  userContext: {
    currentPage: string;
    userRole: string;
    recentActions: string[];
    skillLevel: string;
  }
): Promise<ContextualHelp> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2048,
      system: `You are a helpful in-app assistant. Provide contextual, just-in-time help based on what the user is doing.

Guidelines:
1. Be concise but helpful (2-3 sentences)
2. Match complexity to user's skill level
3. Provide specific next steps
4. Include visual cues (emojis for clarity)
5. Suggest related features they might not know about

Help Types:
- TIP: Helpful suggestion to improve workflow
- WARNING: Alert about potential issue or mistake
- TUTORIAL: Step-by-step guidance for complex task
- BEST-PRACTICE: Industry standard or recommended approach`,
      messages: [{
        role: "user",
        content: `Provide contextual help:

CURRENT PAGE: ${userContext.currentPage}
USER ROLE: ${userContext.userRole}
SKILL LEVEL: ${userContext.skillLevel}
RECENT ACTIONS: ${userContext.recentActions.join(" → ")}

What help would be most useful right now?`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    const help = JSON.parse(content.text);
    
    return {
      context: userContext.currentPage,
      ...help
    } as ContextualHelp;
  } catch (error) {
    console.error("Failed to get contextual help:", error);
    throw error;
  }
}

/**
 * Generate interactive tutorial
 */
export async function generateInteractiveTutorial(
  feature: string,
  userSkillLevel: "beginner" | "intermediate" | "advanced"
): Promise<{
  title: string;
  estimatedTime: string;
  steps: Array<{
    stepNumber: number;
    instruction: string;
    element: string;
    action: string;
    validation: string;
    tip?: string;
  }>;
  completionCriteria: string;
}> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 3072,
      system: `You are an interactive tutorial designer. Create step-by-step guided experiences.

Tutorial Best Practices:
1. Start with clear objective
2. Break into small, achievable steps (5-10 steps)
3. Show, don't just tell (point to UI elements)
4. Validate completion before moving forward
5. Provide encouraging feedback
6. End with summary and next steps

Adjust complexity to skill level:
- Beginner: More hand-holding, explain everything
- Intermediate: Focus on new concepts, less basics
- Advanced: Shortcuts, advanced features, efficiency tips`,
      messages: [{
        role: "user",
        content: `Create interactive tutorial for: ${feature}

TARGET AUDIENCE: ${userSkillLevel} users

Generate step-by-step tutorial with clear instructions, UI element selectors, actions, and validation.`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return JSON.parse(content.text);
  } catch (error) {
    console.error("Failed to generate tutorial:", error);
    throw error;
  }
}

/**
 * Track learning progress and suggest next steps
 */
export async function suggestNextSteps(
  completedModules: string[],
  userProfile: UserProfile,
  learningPath: LearningPath
): Promise<{
  progressPercentage: number;
  nextRecommendations: Array<{
    module: string;
    priority: "high" | "medium" | "low";
    reason: string;
    estimatedTime: string;
  }>;
  achievements: Array<{
    title: string;
    description: string;
    unlockedAt: string;
  }>;
  insights: string[];
}> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2048,
      system: `You are a learning analytics expert. Analyze user progress and recommend next steps.

Consider:
1. COMPLETED: What they've mastered
2. GAPS: What's missing for their role
3. GOALS: What they want to achieve
4. TIME: Realistic time investment
5. MOMENTUM: Keep them engaged

Recommendations should be:
- Relevant to role and goals
- Progressively challenging
- Time-appropriate (don't overwhelm)
- Achievement-focused (celebrate wins)`,
      messages: [{
        role: "user",
        content: `Analyze learning progress:

USER: ${profile.name} (${profile.role})
GOALS: ${profile.goals.join(", ")}

COMPLETED MODULES (${completedModules.length}):
${completedModules.join(", ")}

TOTAL PATH MODULES: ${learningPath.weeks.reduce((sum, w) => sum + w.modules.length, 0)}

Recommend next steps with priorities and insights.`
      }]
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return JSON.parse(content.text);
  } catch (error) {
    console.error("Failed to suggest next steps:", error);
    throw error;
  }
}