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

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

export async function generateAIResponse(prompt: string): Promise<GenerateResponse> {
    // Read env vars at call time (after dotenv has loaded them)
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || '';
    const model = process.env.GOOGLE_GENERATIVE_AI_MODEL || 'gemini-2.5-flash';
    const temperature = Number(process.env.PROMPT_TEMPERATURE || 0.2);
    const maxOutputTokens = Number(process.env.AI_MAX_OUTPUT_TOKENS || 2048);

    if (!apiKey) {
        return { text: '' };
    }

    const url = `${BASE_URL}/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature,
                maxOutputTokens,
                thinkingConfig: { thinkingBudget: 0 }
            }
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`AI request failed: ${response.status} ${response.statusText} — ${errorText}`);
    }

    const data = (await response.json()) as GeminiResponse;
    const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') || '';

    return { text };
}
