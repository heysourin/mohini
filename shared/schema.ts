import { z } from "zod";

// Color palette recommendation schema
export const colorRecommendationSchema = z.object({
  hex: z.string(),
  name: z.string(),
  category: z.enum(["makeup", "clothing", "accessories", "hair"]),
  description: z.string().optional(),
});

export const skinAnalysisSchema = z.object({
  skinTone: z.string(),
  undertone: z.enum(["warm", "cool", "neutral"]),
  seasonalType: z.enum(["spring", "summer", "autumn", "winter"]).optional(),
  confidence: z.number().min(0).max(1),
  analysis: z.string(),
  colorRecommendations: z.array(colorRecommendationSchema),
});

export const analysisRequestSchema = z.object({
  imageData: z.string(), // base64 encoded image
  mimeType: z.string(),
});

export type ColorRecommendation = z.infer<typeof colorRecommendationSchema>;
export type SkinAnalysis = z.infer<typeof skinAnalysisSchema>;
export type AnalysisRequest = z.infer<typeof analysisRequestSchema>;
