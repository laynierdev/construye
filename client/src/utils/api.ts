import type { FormData, Phase1Response } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function sendPhase1Request(data: FormData): Promise<Phase1Response> {
    const response = await fetch(`${API_BASE_URL}/api/v1/phase1/assistant`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.json();
}
