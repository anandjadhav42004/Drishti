import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Set up JSON parsing with a higher limit for base64 image streams
app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI client (lazy loading API key gracefully)
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      console.warn("⚠️ Warning: GEMINI_API_KEY token is missing or generic inside environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Real-time AI CV Image Analysis utilizing Gemini 3.5 Flash server-side
app.post('/api/analyze', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', threshold = 0.5 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Missing imageBase64 data in request body' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
      // Return beautiful mock threat detections as a fallback so the app continues
      // to display stunning interaction even if they haven't configured their key yet!
      return res.json({
        threat_found: true,
        threat_level: 'CRITICAL',
        summary: 'Demo Threat Analysis Mode: Generic API key found. Returning synthetic drone inspection target outputs.',
        detections: [
          {
            label: 'Weapon Detected',
            confidence: 0.94,
            x: 45,
            y: 30,
            w: 15,
            h: 35,
            details: 'Military grade rifle identified via simulated classification network.'
          },
          {
            label: 'Person Detected',
            confidence: 0.88,
            x: 20,
            y: 25,
            w: 25,
            h: 70,
            details: 'Target ID #01 tracked moving at 1.4 m/s'
          }
        ],
        isFallbackDemo: true
      });
    }

    const client = getAiClient();

    // Compress base64 to remove standard data URI wrapper if present
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: base64Data,
      },
    };

    const textPart = {
      text: `You are the core intelligence processor of the DRISHTI military-tactical real-time automated border surveillance system.
Analyze the provided image for security clearance. Categorize visible entities into weapons/ordnance, suspicious vehicles (unmarked, tactical), personnel (safe militants, normal soldiers, unauthorized individuals, civilians), or objects.
Provide precise bounding box coordinates inside the coordinate system where (0,0) is top-left and (100,100) is bottom-right.
Output bounding box values as integer percentages (0-100) on the width and height scale.
Filter candidates matches with confidence ratings lower than ${threshold}.`,
    };

    const response = await client.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        systemInstruction: 'You are the high-efficiency AI engine for DRISHTI. You analyze images and return structured intelligence responses. Keep details concise and highly tactical.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            threat_found: {
              type: Type.BOOLEAN,
              description: 'Whether any weapon, suspicious vehicle, or unauthorized breach is detected.'
            },
            threat_level: {
              type: Type.STRING,
              description: 'Appropriate threat classification. Choose one of: SAFE, SUSPICIOUS, CRITICAL.'
            },
            summary: {
              type: Type.STRING,
              description: 'A 1-line tactical explanation of the analysis.'
            },
            detections: {
              type: Type.ARRAY,
              description: 'List of detected entities fitting our tactical radar specs.',
              items: {
                type: Type.OBJECT,
                properties: {
                  label: {
                    type: Type.STRING,
                    description: 'Label such as "Weapon Detected", "Person Detected", "Suspicious Vehicle", "Unidentified Object".'
                  },
                  confidence: {
                    type: Type.NUMBER,
                    description: 'Confidence decimal between 0.0 and 1.0.'
                  },
                  x: {
                    type: Type.INTEGER,
                    description: 'The horizontal starting coordinate of the object box as a percentage range (0-100).'
                  },
                  y: {
                    type: Type.INTEGER,
                    description: 'The vertical starting coordinate of the object box as a percentage range (0-100).'
                  },
                  w: {
                    type: Type.INTEGER,
                    description: 'The total width of the bounding box as a percentage range (1-100).'
                  },
                  h: {
                    type: Type.INTEGER,
                    description: 'The total height of the bounding box as a percentage range (1-100).'
                  },
                  details: {
                    type: Type.STRING,
                    description: 'Brief detail explaining the classification reasoning.'
                  }
                },
                required: ['label', 'confidence', 'x', 'y', 'w', 'h']
              }
            }
          },
          required: ['threat_found', 'threat_level', 'detections', 'summary']
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No textual data returned from the Gemini AI backend.");
    }

    const payload = JSON.parse(responseText.trim());
    return res.json(payload);

  } catch (error: any) {
    console.error('Core DRISHTI Engine failure:', error);
    res.status(500).json({
      error: 'Failed to complete tactical threat verification process.',
      details: error.message
    });
  }
});

// Configure Vite integration for local simulation development & container proxying
async function initServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`📡 DRISHTI Full-Stack Core online at http://0.0.0.0:${PORT}`);
  });
}

initServer();
