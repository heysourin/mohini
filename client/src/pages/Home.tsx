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
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('photo', selectedFile);

      // Call the real API
      const response = await fetch('/api/analyze-skin', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const analysis: SkinAnalysis = await response.json();
      setAnalysis(analysis);
      console.log('Analysis complete:', analysis);
    } catch (error) {
      console.error('Error analyzing skin tone:', error);
      // Show user-friendly error message
      alert(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setIsAnalyzing(false);
    }
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