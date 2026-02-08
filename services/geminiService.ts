
import { GoogleGenAI, Type } from "@google/genai";

// Safe access to API Key to prevent white screen crashes if process is undefined
const getApiKey = () => {
  try {
    return typeof process !== 'undefined' ? process.env.API_KEY : '';
  } catch (e) {
    return '';
  }
};

const ai = new GoogleGenAI({ apiKey: getApiKey() || '' });

export const generatePropertyDescription = async (details: {
  title: string;
  type: string;
  location: string;
  amenities: string[];
}) => {
  const prompt = `Write a high-end, persuasive real estate description for a ${details.type} called "${details.title}" located in ${details.location}. 
  Include these amenities: ${details.amenities.join(', ')}. 
  Make it sound luxury and professional for the Nigerian market. Focus on prestige and quality.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error('Gemini error:', error);
    return "Experience unparalleled luxury and professional design in this exclusive property listing. Contact our agents for a full consultation on the specific features and amenities available.";
  }
};

export const smartSearch = async (query: string, properties: any[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on this user query: "${query}", filter the following properties and return the IDs of the most relevant ones. 
      Properties: ${JSON.stringify(properties.map(p => ({ id: p.id, title: p.title, location: p.location, price: p.price })))}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            relevantIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });
    
    const result = JSON.parse(response.text || '{"relevantIds": []}');
    return result.relevantIds;
  } catch (e) {
    return properties.map(p => p.id); // Fallback to all if AI fails
  }
};
