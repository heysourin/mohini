import ThemeToggle from "./ThemeToggle";
import { Palette } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Palette className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground" data-testid="text-app-title">
              Mohini AI
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Personalized Color Analysis
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}