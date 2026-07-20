import type { Fase1Response, FormData } from '../types';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000';

export async function enviarSolicitudFase1(data: FormData): Promise<Fase1Response> {
    const response = await fetch(`${API_BASE_URL}/api/v1/fase1/asistente`, {
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
