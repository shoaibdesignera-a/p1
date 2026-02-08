
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateDescription = async (details: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a luxury real estate or product description for: ${JSON.stringify(details)}. Focus on Nigerian elite market prestige.`
    });
    return response.text;
  } catch (error) {
    console.error('Gemini error:', error);
    return "An exclusive masterpiece in Nigerian architecture and design, offering unmatched prestige and comfort.";
  }
};
