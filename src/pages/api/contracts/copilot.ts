import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/integrations/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { contractId, message, history } = req.body;

    if (!contractId || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // In a full production environment, this is where we would call the Anthropic Claude API:
    // const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    // const response = await anthropic.messages.create({...})

    // For this enterprise demo, we simulate Claude's advanced contract reasoning
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowercaseMsg = message.toLowerCase();
    let reply = "Based on my analysis of this contract, I recommend reviewing the termination clauses and pricing terms with your legal team. How else can I assist you with this document?";

    if (lowercaseMsg.includes('termination') || lowercaseMsg.includes('cancel')) {
      reply = "I've reviewed the termination provisions. This contract requires a **90-day written notice** for termination without cause. However, there is a penalty clause in Section 4.2 that triggers a $50,000 fee if terminated within the first 12 months. **Recommendation:** Negotiate to reduce the notice period to 60 days and waive the penalty fee for strategic flexibility.";
    } else if (lowercaseMsg.includes('pricing') || lowercaseMsg.includes('cost') || lowercaseMsg.includes('rebate')) {
      reply = "Looking at the pricing transparency provisions: The PBM is using spread pricing on generic drugs, which reduces your visibility into actual costs. The guaranteed rebate pass-through is currently at 85%. **Action Item:** Push for a 100% pass-through model and ask for a detailed MAC (Maximum Allowable Cost) list to prevent hidden margin retention.";
    } else if (lowercaseMsg.includes('audit') || lowercaseMsg.includes('review')) {
      reply = "The audit rights in this contract are restricted. You are only allowed one audit per calendar year, and you must use a 'mutually agreed upon' auditor, which severely limits your independent oversight. **Risk Level:** High. You should demand the right to use any independent fiduciary auditor of your choice.";
    } else if (lowercaseMsg.includes('summary') || lowercaseMsg.includes('executive')) {
      reply = "Here is the executive summary:\n\n1. **Overall Risk:** Medium-High\n2. **Financial Opportunity:** ~$1.2M in recoverable value\n3. **Key Weaknesses:** Restrictive audit rights, generic spread pricing, and aggressive termination penalties.\n\nWould you like me to draft an email summary to your Board detailing these points?";
    }

    return res.status(200).json({ 
      success: true, 
      response: reply 
    });

  } catch (error) {
    console.error('Co-Pilot Error:', error);
    return res.status(500).json({ error: 'Internal server error processing AI request' });
  }
}