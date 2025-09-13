import ColorPalette from '../ColorPalette';
import { type ColorRecommendation } from "@shared/schema";

const sampleColors: ColorRecommendation[] = [
  { hex: "#8B4513", name: "Warm Brown", category: "makeup", description: "Perfect for bronzer and contouring" },
  { hex: "#CD853F", name: "Golden Bronze", category: "makeup", description: "Ideal for eyeshadow and highlights" },
  { hex: "#F4A460", name: "Sandy Brown", category: "clothing", description: "Great for casual wear and accessories" },
  { hex: "#DEB887", name: "Burlywood", category: "clothing", description: "Perfect for professional attire" },
  { hex: "#D2691E", name: "Chocolate", category: "hair", description: "Rich brown hair color option" },
  { hex: "#B8860B", name: "Dark Goldenrod", category: "accessories", description: "Excellent for jewelry and bags" },
];

export default function ColorPaletteExample() {
  return <ColorPalette colors={sampleColors} />;
}