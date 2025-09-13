import { type SkinAnalysis } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import ColorPalette from "./ColorPalette";

interface AnalysisResultsProps {
  analysis: SkinAnalysis;
}

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const categories = ["makeup", "clothing", "accessories", "hair"] as const;
  
  const getUndertoneColor = (undertone: string) => {
    switch (undertone) {
      case "warm": return "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30";
      case "cool": return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30";
      case "neutral": return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
      default: return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30";
    }
  };

  return (
    <div className="space-y-6" data-testid="analysis-results">
      {/* Main Analysis Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center justify-between">
            Your Skin Analysis
            <Badge variant="secondary" className="text-xs">
              {Math.round(analysis.confidence * 100)}% confidence
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Skin Tone & Undertone */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Skin Tone</h3>
              <p className="text-lg font-semibold text-accent-foreground" data-testid="text-skin-tone">
                {analysis.skinTone}
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Undertone</h3>
              <Badge className={`${getUndertoneColor(analysis.undertone)} font-medium`} data-testid="badge-undertone">
                {analysis.undertone.charAt(0).toUpperCase() + analysis.undertone.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Seasonal Type */}
          {analysis.seasonalType && (
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Seasonal Color Type</h3>
              <Badge variant="outline" className="capitalize" data-testid="badge-seasonal-type">
                {analysis.seasonalType}
              </Badge>
            </div>
          )}

          {/* Confidence Score */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-foreground">Analysis Confidence</h3>
              <span className="text-sm text-muted-foreground">
                {Math.round(analysis.confidence * 100)}%
              </span>
            </div>
            <Progress value={analysis.confidence * 100} className="h-2" />
          </div>

          {/* Analysis Description */}
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Detailed Analysis</h3>
            <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-analysis">
              {analysis.analysis}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Color Recommendations by Category */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Your Personalized Color Palette
        </h2>
        
        {categories.map(category => {
          const categoryColors = analysis.colorRecommendations.filter(
            color => color.category === category
          );
          
          if (categoryColors.length === 0) return null;
          
          return (
            <ColorPalette
              key={category}
              colors={categoryColors}
              category={category}
            />
          );
        })}
      </div>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Color Tips for Your Skin Tone
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Best Colors</h4>
              <p>Colors that complement your {analysis.undertone} undertones will make your skin glow naturally.</p>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-2">Application Tips</h4>
              <p>Use these colors in makeup, clothing, and accessories to enhance your natural beauty.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}