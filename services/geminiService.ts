import { GoogleGenAI } from "@google/genai";
import { Property } from "../types";

const getAI = (runtimeKey?: string) => {
  // 1. Runtime key passed from UI (e.g. just entered by user)
  if (runtimeKey) return new GoogleGenAI({ apiKey: runtimeKey });

  // 2. Stored key in localStorage (for BYOK)
  const storedKey = typeof localStorage !== 'undefined' ? localStorage.getItem('gemini_api_key') : null;
  if (storedKey) return new GoogleGenAI({ apiKey: storedKey });

  // 3. Environment variable (for local dev)
  const envKey = process.env.API_KEY || "";
  if (envKey) return new GoogleGenAI({ apiKey: envKey });

  return null;
};

export const searchLiveMarketData = async (
  state: string,
  city: string,
  neighborhood: string,
  lat?: number,
  lng?: number,
  apiKey?: string
): Promise<{ properties: Property[], insights: string, sources: any[] }> => {
  const ai = getAI(apiKey);
  
  if (!ai) {
    throw new Error("MISSING_KEY");
  }
  const model = "gemini-3-flash";
  
  const query = `SEARCH GOOGLE MAPS AND SEARCH for 10-15 active real estate listings in ${neighborhood ? neighborhood + ', ' : ''}${city}, ${state}, USA. 
  
  IMPORTANT: You MUST use your available tools (googleMaps and googleSearch) to find real, current listings. 
  
  For each property found, output a data line strictly in this format:
  [DATA] Neighborhood | Price | Sqft | Type | Year Built | Latitude | Longitude
  
  After the data lines, provide a brief market summary (2 paragraphs) analyzing price trends and inventory for ${city}, ${state}.`;

  const config: any = {
    systemInstruction: `You are a specialized US Real Estate Market Analyst. Your primary function is to use Google Maps and Google Search to find real-world property listings in specific USA regions. You always provide specific, structured data for the user. Current focus: ${city}, ${state}.`,
    tools: [{ googleMaps: {} }, { googleSearch: {} }],
  };

  if (lat && lng) {
    config.toolConfig = {
      retrievalConfig: {
        latLng: { latitude: lat, longitude: lng }
      }
    };
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: query,
      config,
    });

    const text = response.text || "";
    const properties = parsePropertiesFromText(text, city, state);
    
    // Clean insights to remove all data-formatted lines so only the summary remains
    const insights = text
      .split('\n')
      .filter(line => !line.includes('[DATA]'))
      .join('\n')
      .trim();

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      properties,
      insights: insights || "Market analysis complete. See charts below for data breakdown.",
      sources
    };
  } catch (error) {
    console.error("Gemini Market Search Error:", error);
    throw error;
  }
};

function parsePropertiesFromText(text: string, city: string, state: string): Property[] {
  const lines = text.split('\n');
  const properties: Property[] = [];
  
  lines.forEach((line, index) => {
    if (line.includes('[DATA]')) {
      const parts = line.replace('[DATA]', '').split('|').map(p => p.trim());
      if (parts.length >= 7) {
        const [neighborhood, priceStr, sqftStr, type, year, latStr, lngStr] = parts;
        
        const price = parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
        const sqft = parseInt(sqftStr.replace(/[^0-9]/g, '')) || 0;
        const lat = parseFloat(latStr.replace(/[^\d.-]/g, '')) || 0;
        const lng = parseFloat(lngStr.replace(/[^\d.-]/g, '')) || 0;

        if (price > 10000 && Math.abs(lat) > 1) {
          properties.push({
            id: `live-${index}-${Date.now()}`,
            city,
            state,
            neighborhood: neighborhood || 'Unknown',
            price,
            sqft: sqft || 1500,
            yearBuilt: parseInt(year) || 1990,
            bedrooms: 3,
            bathrooms: 2,
            type: (type as any) || 'Single Family',
            listingDate: new Date().toISOString().split('T')[0],
            lat,
            lng
          });
        }
      }
    }
  });

  return properties;
}
