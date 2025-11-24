import { GoogleGenAI, Type, Schema } from "@google/genai";
import { WageData, EstimationResult } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to extract JSON from model response
const cleanJson = (text: string) => {
  // First try to match a JSON code block
  const match = text.match(/```json\s*([\s\S]*?)\s*```/);
  if (match) return match[1];

  // If no code block, try to find the first { and last } to isolate the object
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    return text.substring(firstBrace, lastBrace + 1);
  }

  // Fallback: just strip markdown code block markers if present at edges
  return text.replace(/```json\n?|\n?```/g, "").trim();
};

/**
 * Step 1: Get Market Data using Gemini 2.5 Flash + Google Search
 */
export const getMarketData = async (country: string): Promise<WageData> => {
  const prompt = `
    Find the current 2024/2025 software developer hourly rates in ${country}.
    I need the average hourly rate in local currency for:
    1. Junior Developer
    2. Mid-level Developer
    3. Senior Developer
    4. DevOps Engineer
    
    Also identify the local Currency Symbol and Currency Code (ISO 4217).
    
    IMPORTANT: Provide the output strictly as a valid JSON object. Do not include markdown formatting or conversational text outside the JSON.
    
    Return the data in this JSON structure:
    {
      "country": "${country}",
      "currencySymbol": "string",
      "currencyCode": "string",
      "hourlyRates": {
        "junior": number,
        "mid": number,
        "senior": number,
        "devops": number
      },
      "sourceSummary": "A short sentence about where this data came from (e.g. 'Based on 2024 salary surveys from Glassdoor and Payscale in Germany')."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // responseMimeType: "application/json" is NOT supported with tools (Search)
        // We rely on the prompt to enforce JSON output structure.
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(cleanJson(text)) as WageData;
    
    // Fallback defaults if search fails or returns nulls
    if (!data.hourlyRates) {
      throw new Error("Failed to structure wage data");
    }
    return data;
  } catch (error) {
    console.error("Market Data Error:", error);
    // Return dummy fallback if search fails completely to allow app to continue (for demo purposes)
    return {
      country,
      currencyCode: "USD",
      currencySymbol: "$",
      hourlyRates: { junior: 25, mid: 50, senior: 80, devops: 70 },
      sourceSummary: "Fallback estimation data (Search failed)"
    };
  }
};

/**
 * Step 2: Analyze Project and Estimate using Gemini 3 Pro + Thinking Mode
 */
export const generateProjectEstimate = async (
  files: { base64: string; mimeType: string }[], 
  requirements: string,
  wageData: WageData
): Promise<EstimationResult> => {
  
  const fileParts = files.map(f => ({
    inlineData: {
      data: f.base64,
      mimeType: f.mimeType
    }
  }));

  const systemInstruction = `
    You are a Senior Technical Project Manager and Solution Architect.
    Your goal is to estimate software development costs and timelines.
    
    CRITICAL RULES:
    1. specific logic for "Total Cost":
       - Use the provided wage data.
       - Calculate total developer hours based on complexity.
       - Apply the wage rates to the hours.
       - "Min" uses Junior/Mid blend. "Max" uses Senior/Specialist blend.
    2. Specific logic for "Component Allocation":
       - Calculate total cost first, then strictly distribute:
       - Backend: 40%
       - Frontend: 30%
       - DevOps: 20%
       - QA: 10%
    3. Infrastructure & Licenses:
       - Estimate monthly cloud costs (AWS/GCP/Azure) based on identified architecture.
       - Estimate 3rd party API costs (Auth0, Stripe, etc).
    4. Timeline:
       - Be realistic. 
    5. Analyze the provided images (wireframes, diagrams) and text deeply to identify features.
  `;

  const prompt = `
    Analyze the attached project documents/images.
    
    Context:
    - Target Country: ${wageData.country}
    - Currency: ${wageData.currencyCode} (${wageData.currencySymbol})
    - Hourly Rates: Junior ${wageData.hourlyRates.junior}, Mid ${wageData.hourlyRates.mid}, Senior ${wageData.hourlyRates.senior}, DevOps ${wageData.hourlyRates.devops}.
    
    User Requirements Text: "${requirements}"
    
    Generate a detailed JSON estimate matching this schema:
    {
      "projectName": "string",
      "summary": "string (executive summary of scope)",
      "totalCost": { "min": number, "avg": number, "max": number },
      "timelineWeeks": { "min": number, "max": number },
      "componentCosts": { "backend": number, "frontend": number, "devops": number, "qa": number },
      "infrastructureCostMonthly": number,
      "thirdPartyLicensesCost": number,
      "assumptions": ["string", "string"],
      "wageDataUsed": ${JSON.stringify(wageData)}
    }
  `;

  // Define the schema for structured output
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      projectName: { type: Type.STRING },
      summary: { type: Type.STRING },
      totalCost: {
        type: Type.OBJECT,
        properties: {
          min: { type: Type.NUMBER },
          avg: { type: Type.NUMBER },
          max: { type: Type.NUMBER },
        },
        required: ["min", "avg", "max"]
      },
      timelineWeeks: {
        type: Type.OBJECT,
        properties: {
          min: { type: Type.NUMBER },
          max: { type: Type.NUMBER },
        },
        required: ["min", "max"]
      },
      componentCosts: {
        type: Type.OBJECT,
        properties: {
          backend: { type: Type.NUMBER },
          frontend: { type: Type.NUMBER },
          devops: { type: Type.NUMBER },
          qa: { type: Type.NUMBER },
        },
        required: ["backend", "frontend", "devops", "qa"]
      },
      infrastructureCostMonthly: { type: Type.NUMBER },
      thirdPartyLicensesCost: { type: Type.NUMBER },
      assumptions: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      },
      // We don't strictly enforce wageDataUsed schema here to save tokens, we just want it passed back or we re-attach it on client
    },
    required: ["projectName", "totalCost", "timelineWeeks", "componentCosts", "infrastructureCostMonthly", "assumptions"]
  };

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: [
      ...fileParts,
      { text: prompt }
    ],
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: schema,
      thinkingConfig: {
        thinkingBudget: 16000 // Allocating budget for complex estimation
      }
    }
  });

  const text = response.text || "{}";
  const result = JSON.parse(cleanJson(text)) as EstimationResult;
  
  // Re-attach the wage data source to the result for display
  result.wageDataUsed = wageData;
  
  return result;
};

/**
 * Chat with context
 */
export const sendFollowUpChat = async (history: any[], newMessage: string, projectContext: EstimationResult) => {
    const contextPrompt = `
      You are discussing a project estimate.
      Project: ${projectContext.projectName}
      Cost Range: ${projectContext.wageDataUsed.currencySymbol}${projectContext.totalCost.min} - ${projectContext.totalCost.max}
      Timeline: ${projectContext.timelineWeeks.min}-${projectContext.timelineWeeks.max} weeks.
      Country: ${projectContext.wageDataUsed.country}
      
      User Question: ${newMessage}
    `;

    // Use Gemini 3 Pro for chat as requested
    const chat = ai.chats.create({
        model: "gemini-3-pro-preview",
        history: history,
        config: {
          systemInstruction: "You are a helpful AI consultant explaining software development costs."
        }
    });

    const result = await chat.sendMessage({ message: contextPrompt });
    return result.text;
};