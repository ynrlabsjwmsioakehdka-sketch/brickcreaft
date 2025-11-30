import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedBlock } from "../types";

// Note: process.env.API_KEY is expected to be defined in the environment
const apiKey = process.env.API_KEY || '';

export const generateLegoStructure = async (prompt: string): Promise<GeneratedBlock[]> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a 3D voxel structure of a ${prompt}. 
      Use a coordinate system where y=0 is the ground level. 
      Limit the size to roughly 10x10x10. 
      Return a JSON array of blocks.
      Ensure the structure is stable (blocks are supported).
      Use standard lego colors (hex codes).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              x: { type: Type.INTEGER, description: "X coordinate" },
              y: { type: Type.INTEGER, description: "Y coordinate (height, starts at 0)" },
              z: { type: Type.INTEGER, description: "Z coordinate" },
              color: { type: Type.STRING, description: "Hex color code, e.g., #ff0000" }
            },
            required: ["x", "y", "z", "color"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No content generated from Gemini.");
    }

    const blocks = JSON.parse(text) as GeneratedBlock[];
    return blocks;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};