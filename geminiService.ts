
import { GoogleGenAI } from "@google/genai";
import { Verse } from "./types";

// Always use the apiKey from process.env.API_KEY as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPeaceReflection = async (verse: Verse): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a 2-sentence peaceful reflection for the following Bible verse. Tone: Wise, calm, encouraging. Verse: "${verse.text}" (${verse.reference})`,
      config: {
        systemInstruction: "You are a 'Wise Companion in the Garden.' Be biblically accurate, non-judgmental, and use a serene tone.",
        temperature: 0.7,
      },
    });
    return response.text?.trim() || "In the stillness of this word, find your rest.";
  } catch (error) {
    return "May this scripture guide your heart to peace today.";
  }
};

export const getGroundedTruth = async (topic: string): Promise<{text: string, sources: any[]}> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `How do biblical principles of peace and stewardship apply to this recent global context: ${topic}? Provide an encouraging perspective.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    return {
      text: response.text || "Grace is present in all seasons.",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    return { text: "The spirit moves even in the unknown.", sources: [] };
  }
};

// Fix: Added missing export getBibleContext
export const getBibleContext = async (reference: string, text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide spiritual context and historical background for this Bible passage: ${reference}. Text: "${text}"`,
      config: {
        systemInstruction: "You are a biblical scholar specializing in contemplative study. Provide a concise but deep explanation of the historical context, key themes, and spiritual application.",
      },
    });
    return response.text || "May the Spirit lead you to deeper understanding of this Word.";
  } catch (error) {
    return "The depths of this scripture are vast; continue to meditate and seek clarity.";
  }
};

// Fix: Added missing export getBlogSummary
export const getBlogSummary = async (content: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize this devotional blog post in 2-3 peaceful sentences that capture its essence: ${content}`,
      config: {
        systemInstruction: "You are a peaceful summarizer. Focus on the spiritual takeaway and the calming essence of the writing.",
      },
    });
    return response.text || "A message of peace and digital rest.";
  } catch (error) {
    return "In the quiet of these words, find a summary of God's grace.";
  }
};

// Fix: Added missing export getJournalPrompt
export const getJournalPrompt = async (verse?: string): Promise<string> => {
  try {
    const promptText = verse 
      ? `Generate a deep, reflective journaling prompt based on this Bible verse: ${verse}`
      : `Generate a peaceful and introspective journaling prompt for someone seeking spiritual rest and growth today.`;
      
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: promptText,
      config: {
        systemInstruction: "You are the 'Spirit Guide of the Garden.' Create prompts that encourage vulnerability, hope, and connection with the Divine.",
      },
    });
    return response.text || "How is your soul today in the light of God's love?";
  } catch (error) {
    return "What is the quietest part of your heart saying to God right now?";
  }
};

export const generateVision = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A high-quality, ethereal, celestial painting in shades of deep blue and gold representing this spiritual theme: ${prompt}. Cinematic lighting, peaceful, oil painting style.` }],
      },
      config: {
        imageConfig: { aspectRatio: "16:9" }
      },
    });
    // Iterate through parts to find the image as per guidelines.
    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error", error);
    return null;
  }
};

export const createCompanionChat = () => {
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are the 'Garden Companion,' a wise, gentle, and biblically-grounded mentor. You help users find peace, understand scripture, and navigate life's trials with grace. Never be judgmental. Always offer a prayer if the user seems distressed.",
    },
  });
};
