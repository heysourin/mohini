import { useState } from "react";
import PhotoUpload from "@/components/PhotoUpload";
import AnalysisResults from "@/components/AnalysisResults";
import { type SkinAnalysis } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { RotateCcw, Sparkles } from "lucide-react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SkinAnalysis | null>(null);

  const handleImageSelect = (file: File, preview: string) => {
    setSelectedFile(file);
    setImagePreview(preview);
    setAnalysis(null); // Clear previous analysis
    console.log('Image selected for analysis:', file.name);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    console.log('Starting skin tone analysis...');
    
    // todo: remove mock functionality - replace with actual API call
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis result
    const mockAnalysis: SkinAnalysis = {
      skinTone: "Medium with golden undertones",
      undertone: "warm",
      seasonalType: "autumn",
      confidence: 0.92,
      analysis: "Your skin has beautiful warm undertones with golden highlights. The medium depth of your skin tone pairs excellently with rich, earthy colors. Your warm undertones suggest you belong to the autumn color palette, which includes deep oranges, browns, and golden yellows. These colors will enhance your natural radiance and complement your skin's inherent warmth.",
      colorRecommendations: [
        { hex: "#8B4513", name: "Warm Brown", category: "makeup", description: "Perfect for bronzer and contouring to add warmth" },
        { hex: "#CD853F", name: "Golden Bronze", category: "makeup", description: "Ideal for eyeshadow and highlights" },
        { hex: "#D2B48C", name: "Tan", category: "makeup", description: "Great for foundation matching" },
        { hex: "#F4A460", name: "Sandy Brown", category: "clothing", description: "Excellent for casual wear and earth tones" },
        { hex: "#DEB887", name: "Burlywood", category: "clothing", description: "Perfect for professional attire" },
        { hex: "#BC8F8F", name: "Rosy Brown", category: "clothing", description: "Soft and flattering for everyday wear" },
        { hex: "#D2691E", name: "Chocolate", category: "hair", description: "Rich brown hair color option" },
        { hex: "#8B7355", name: "Dark Khaki", category: "hair", description: "Natural looking brown with warmth" },
        { hex: "#B8860B", name: "Dark Goldenrod", category: "accessories", description: "Excellent for jewelry and metallic accessories" },
        { hex: "#DAA520", name: "Goldenrod", category: "accessories", description: "Perfect for handbags and scarves" },
      ]
    };
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    console.log('Analysis complete:', mockAnalysis);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setAnalysis(null);
    setIsAnalyzing(false);
    console.log('Reset to initial state');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        {!imagePreview && !analysis && (
          <div className="text-center space-y-6 mb-12">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Discover Your Perfect
                <span className="text-accent-foreground block">Color Palette</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Upload your photo and let AI analyze your skin tone and undertones 
                to recommend the most flattering colors for makeup, clothing, and accessories.
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              <span>Powered by advanced AI technology</span>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-8">
          {/* Upload Section */}
          <div className="flex flex-col items-center space-y-6">
            <PhotoUpload 
              onImageSelect={handleImageSelect}
              isAnalyzing={isAnalyzing}
            />
            
            {selectedFile && !analysis && (
              <div className="flex gap-3">
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  size="lg"
                  className="px-8"
                  data-testid="button-analyze"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Analyze My Skin Tone
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                  data-testid="button-reset"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Start Over
                </Button>
              </div>
            )}
          </div>

          {/* Results Section */}
          {analysis && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">
                  Your Analysis Results
                </h2>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  data-testid="button-new-analysis"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  New Analysis
                </Button>
              </div>
              
              <AnalysisResults analysis={analysis} />
            </div>
          )}
        </div>

        {/* Footer Info */}
        {!analysis && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full text-sm text-muted-foreground">
              <span>✨ Professional-grade color analysis in seconds</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}