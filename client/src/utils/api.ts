import type { FormData, Phase1Response } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

// ─── Phase 1 ────────────────────────────────────────────────────────────────

export async function sendPhase1Request(data: FormData): Promise<Phase1Response> {
    const response = await fetch(`${API_BASE_URL}/api/v1/phase1/assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    return response.json();
}

// ─── Shared types ────────────────────────────────────────────────────────────

export interface Pieza {
    id: number;
    nombre: string;
    calibre: string | null;
    stock: number;
    provincia: string;
    municipio: string;
    vendedorId: number;
    vendedor: { nombre: string | null; telefono: string };
}

export interface Solicitud {
    id: number;
    piezaNombre: string;
    calibre: string | null;
    cantidad: number;
    nota: string | null;
    telefonoCliente: string;
    prefiereMensajeria: boolean;
    vendedorId: number | null;
    createdAt: string;
}

// ─── Piezas ──────────────────────────────────────────────────────────────────

export async function fetchPiezas(provincia: string, municipio?: string): Promise<Pieza[]> {
    const params = new URLSearchParams({ provincia });
    if (municipio) params.set('municipio', municipio);
    const res = await fetch(`${API_BASE_URL}/piezas?${params}`);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}

export async function postPieza(data: {
    nombre: string;
    calibre?: string;
    stock: number;
    provincia: string;
    municipio: string;
    telefonoVendedor: string;
    nombreVendedor?: string;
}): Promise<Pieza> {
    const res = await fetch(`${API_BASE_URL}/piezas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(err.error ?? `Error ${res.status}`);
    }
    return res.json();
}

// ─── Solicitudes ─────────────────────────────────────────────────────────────

export async function fetchSolicitudes(): Promise<Solicitud[]> {
    const res = await fetch(`${API_BASE_URL}/solicitudes`);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}

export async function postSolicitud(data: {
    piezaNombre: string;
    calibre?: string;
    cantidad: number;
    nota?: string;
    telefonoCliente: string;
    prefiereMensajeria: boolean;
}): Promise<Solicitud> {
    const res = await fetch(`${API_BASE_URL}/solicitudes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(err.error ?? `Error ${res.status}`);
    }
    return res.json();
}
