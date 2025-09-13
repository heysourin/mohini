import { type ColorRecommendation } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface ColorPaletteProps {
  colors: ColorRecommendation[];
  category?: string;
}

function ColorSwatch({ color }: { color: ColorRecommendation }) {
  const [copied, setCopied] = useState(false);

  const copyColor = async () => {
    await navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      <div 
        className="w-full aspect-square rounded-lg shadow-sm border border-border overflow-hidden hover-elevate cursor-pointer transition-all duration-200"
        style={{ backgroundColor: color.hex }}
        onClick={copyColor}
        data-testid={`color-swatch-${color.hex.substring(1)}`}
      />
      
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm text-foreground line-clamp-1">
            {color.name}
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={copyColor}
            data-testid={`button-copy-${color.hex.substring(1)}`}
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-600" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground font-mono">
          {color.hex.toUpperCase()}
        </p>
        
        <Badge variant="secondary" className="text-xs">
          {color.category}
        </Badge>
        
        {color.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
            {color.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ColorPalette({ colors, category }: ColorPaletteProps) {
  const filteredColors = category 
    ? colors.filter(color => color.category === category)
    : colors;

  if (filteredColors.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Colors` : 'Your Color Palette'}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredColors.map((color, index) => (
            <ColorSwatch key={`${color.hex}-${index}`} color={color} />
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            💡 Click on any color to copy its hex code
          </p>
        </div>
      </CardContent>
    </Card>
  );
}