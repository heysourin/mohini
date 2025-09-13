import { GoogleGenerativeAI } from "@google/generative-ai";
import { type SkinAnalysis, skinAnalysisSchema } from "@shared/schema";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

// This API key is from Gemini Developer API Key, not vertex AI API Key

import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is required");
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function analyzeSkinTone(imageBase64: string, mimeType: string): Promise<SkinAnalysis> {
  try {
    // Validate supported MIME types
    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!supportedTypes.includes(mimeType)) {
      throw new Error(`Unsupported image type: ${mimeType}. Supported types: ${supportedTypes.join(', ')}`);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const systemPrompt = `You are a professional color analysis expert specializing in skin tone and undertone identification. 

Analyze the uploaded photo to determine:
1. Skin tone description (light, medium, deep, etc.)
2. Undertone classification (warm, cool, or neutral)
3. Seasonal color type if applicable (spring, summer, autumn, winter) - leave undefined if uncertain
4. Confidence level (0-1)
5. Detailed analysis explanation
6. Color recommendations for makeup, clothing, accessories, and hair

Provide color recommendations as hex codes with descriptive names and categories.
Focus on colors that will complement and enhance the person's natural skin tone.

Respond with JSON in this exact format:
{
  "skinTone": "description of skin tone depth and characteristics",
  "undertone": "warm" | "cool" | "neutral",
  "seasonalType": "spring" | "summer" | "autumn" | "winter" | undefined,
  "confidence": number between 0 and 1,
  "analysis": "detailed explanation of the skin analysis and color recommendations",
  "colorRecommendations": [
    {
      "hex": "#hexcode",
      "name": "Color Name",
      "category": "makeup" | "clothing" | "accessories" | "hair",
      "description": "how to use this color"
    }
  ]
}

Provide at least 8-12 color recommendations across all categories.`;

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType: mimeType,
            },
          },
          { text: systemPrompt }
        ]
      }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const rawJson = result.response.text();
    console.log(`Gemini Analysis Response: ${rawJson.substring(0, 200)}...`);

    if (rawJson) {
      const parsed = JSON.parse(rawJson);
      
      // Validate and clean the response
      const analysis = skinAnalysisSchema.parse(parsed);
      
      return analysis;
    } else {
      throw new Error("Empty response from Gemini model");
    }
  } catch (error) {
    console.error("Error analyzing skin tone with Gemini:", error);
    throw new Error(`Failed to analyze skin tone: ${error}`);
  }
}