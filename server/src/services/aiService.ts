/// <reference types="node" />

interface GeminiResponse {
    candidates?: Array<{
        content?: {
            parts?: Array<{ text?: string }>;
        };
    }>;
}

interface GenerateResponse {
    text: string;
}

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY || '';
const MODEL = process.env.GOOGLE_GENERATIVE_AI_MODEL || 'gemini-2.0-flash';
const BASE_URL = process.env.GOOGLE_GENERATIVE_AI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/models';
const TEMPERATURE = Number(process.env.PROMPT_TEMPERATURE || 0.2);
const MAX_OUTPUT_TOKENS = Number(process.env.AI_MAX_OUTPUT_TOKENS || 512);

export async function generateAIResponse(prompt: string): Promise<GenerateResponse> {
    if (!API_KEY) {
        return {
            text: 'AI API key is not configured. Please set GOOGLE_GENERATIVE_AI_API_KEY in the server environment.'
        };
    }

    const url = `${BASE_URL}/${MODEL}:generateContent?key=${API_KEY}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: TEMPERATURE,
                maxOutputTokens: MAX_OUTPUT_TOKENS
            }
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`AI request failed: ${response.status} ${response.statusText} ${errorText}`);
    }

    const data = (await response.json()) as GeminiResponse;
    const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('') || '';

    return { text };
}
