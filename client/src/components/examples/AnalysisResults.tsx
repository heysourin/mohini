import AnalysisResults from '../AnalysisResults';
import { type SkinAnalysis } from "@shared/schema";

// todo: remove mock functionality
const mockAnalysis: SkinAnalysis = {
  skinTone: "Medium with golden undertones",
  undertone: "warm",
  seasonalType: "autumn",
  confidence: 0.92,
  analysis: "Your skin has beautiful warm undertones with golden highlights. The medium depth of your skin tone pairs excellently with rich, earthy colors. Your warm undertones suggest you belong to the autumn color palette, which includes deep oranges, browns, and golden yellows.",
  colorRecommendations: [
    { hex: "#8B4513", name: "Warm Brown", category: "makeup", description: "Perfect for bronzer and contouring" },
    { hex: "#CD853F", name: "Golden Bronze", category: "makeup", description: "Ideal for eyeshadow and highlights" },
    { hex: "#F4A460", name: "Sandy Brown", category: "clothing", description: "Great for casual wear" },
    { hex: "#DEB887", name: "Burlywood", category: "clothing", description: "Perfect for professional attire" },
    { hex: "#D2691E", name: "Chocolate", category: "hair", description: "Rich brown hair color option" },
    { hex: "#B8860B", name: "Dark Goldenrod", category: "accessories", description: "Excellent for jewelry and bags" },
  ]
};

export default function AnalysisResultsExample() {
  return <AnalysisResults analysis={mockAnalysis} />;
}