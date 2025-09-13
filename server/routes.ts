import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { analyzeSkinTone } from "./gemini";
import { analysisRequestSchema } from "@shared/schema";

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (supportedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Only ${supportedTypes.join(', ')} files are allowed`));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Error handling middleware for multer
  app.use('/api', (error: any, req: any, res: any, next: any) => {
    if (error) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: "File size too large. Maximum size is 10MB." });
      }
      if (error.message.includes('Only')) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "File upload error" });
    }
    next();
  });

  // Skin tone analysis endpoint
  app.post("/api/analyze-skin", upload.single('photo'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No photo uploaded" });
      }

      // Convert buffer to base64
      const imageBase64 = req.file.buffer.toString('base64');
      const mimeType = req.file.mimetype;

      console.log(`Analyzing image: ${mimeType}, size: ${req.file.size} bytes`);

      // Analyze with Gemini
      const analysis = await analyzeSkinTone(imageBase64, mimeType);

      res.json(analysis);
    } catch (error) {
      console.error("Error in skin analysis:", error);
      res.status(500).json({ 
        error: "Failed to analyze skin tone",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);

  return httpServer;
}
