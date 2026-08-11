import { generateAIResponse } from './aiService.js';
import { buildPhase1Prompt } from './promptBuilder.js';
import type { Phase1Request, Phase1Response, RequiredPart } from '../types.js';

interface AIData {
    parts: Array<{
        name: string;
        quantity: number;
        unit: string;
        gauge?: string;
        notes?: string;
    }>;
    instructions: string[];
    diagram: string;
    tips: string[];
}

export async function processPhase1(request: Phase1Request): Promise<Phase1Response> {
    const {
        specialty,
        distance = 10,
        gauge = '',
        description = '',
        cornerCount = 0,
        connectionCount = 0
    } = request;

    const prompt = buildPhase1Prompt({ specialty, distance, gauge, description, cornerCount, connectionCount });

    let aiData: AIData | null = null;
    let aiGenerated = false;

    try {
        const aiResult = await generateAIResponse(prompt);
        if (aiResult.text) {
            aiData = parseAIResponse(aiResult.text);
            aiGenerated = aiData !== null;
        }
    } catch (err) {
        console.error('AI request failed, using fallback:', err);
    }

    const data = aiData ?? buildFallbackData(specialty, distance, gauge, cornerCount, connectionCount);

    const parts: RequiredPart[] = data.parts.map((p) => ({
        name: p.name,
        quantity: p.quantity,
        unit: p.unit,
        gauge: p.gauge ?? '',
        notes: p.notes ?? ''
    }));

    return {
        specialty,
        parts,
        instructions: data.instructions,
        conceptualDiagram: data.diagram,
        tips: data.tips,
        nextPhases: 'En la Fase 2 podrás buscar estas piezas en inventarios cercanos, calcular el presupuesto total y localizar ferreterías cercanas.',
        aiGenerated
    };
}

function extractJSON(text: string): string {
    // Extract content between ```json ... ``` or ``` ... ```
    const fenced = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
    if (fenced) return fenced[1].trim();

    // Fallback: find the outermost { ... } block
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end > start) return text.slice(start, end + 1);

    return text.trim();
}

function parseAIResponse(text: string): AIData | null {
    try {
        const cleaned = extractJSON(text);
        const data = JSON.parse(cleaned) as Record<string, unknown>;

        if (!Array.isArray(data.parts) || !Array.isArray(data.instructions)) {
            return null;
        }

        return {
            parts: (data.parts as Record<string, unknown>[]).map((p) => ({
                name: String(p.name ?? ''),
                quantity: Number(p.quantity) || 1,
                unit: String(p.unit ?? 'unidades'),
                gauge: p.gauge ? String(p.gauge) : '',
                notes: p.notes ? String(p.notes) : ''
            })),
            instructions: (data.instructions as unknown[]).map(String),
            diagram: typeof data.diagram === 'string' ? data.diagram : '',
            tips: Array.isArray(data.tips) ? (data.tips as unknown[]).map(String) : []
        };
    } catch {
        return null;
    }
}

function buildFallbackData(
    specialty: string,
    distance: number,
    gauge: string,
    cornerCount: number,
    connectionCount: number
): AIData {
    if (specialty === 'plumbing') {
        const pipeQty = Math.ceil(distance / 5) + 1;
        const elbowQty = Math.max(2, Math.floor(distance / 3));
        const g = gauge || '1/2"';
        return {
            parts: [
                { name: 'Tubo PVC', quantity: pipeQty, unit: 'metros', gauge: g },
                { name: 'Codo 90°', quantity: elbowQty, unit: 'unidades', gauge: g },
                { name: 'Tee de derivación', quantity: Math.max(1, connectionCount), unit: 'unidades', gauge: g },
                { name: 'Válvula de paso', quantity: 1, unit: 'unidades', gauge: g },
                { name: 'Unión universal', quantity: Math.ceil(distance / 5), unit: 'unidades', gauge: g },
                { name: 'Adhesivo PVC', quantity: 1, unit: 'frasco', gauge: '' },
                { name: 'Cinta teflón', quantity: 2, unit: 'rollos', gauge: '' }
            ],
            instructions: [
                `Verifica la presión del sistema (máximo 80 psi).`,
                `Corta los tubos PVC a medida para cubrir ${distance} metros en total.`,
                `Lija los extremos de cada corte y aplica adhesivo PVC en ambas superficies.`,
                `Instala los codos en cada cambio de dirección.`,
                `Conecta las ${connectionCount} derivaciones usando las tees correspondientes.`,
                `Instala la válvula de paso en el punto principal de entrada.`,
                `Realiza una prueba de presión antes de cerrar la instalación.`
            ],
            diagram: `Llave principal → válvula de paso → tubería principal (${distance}m) → ${connectionCount} derivaciones (tees) → salidas`,
            tips: [
                'Usa cinta teflón en todas las roscas para prevenir fugas.',
                'Aplica adhesivo PVC en ambas superficies antes de ensamblar.',
                'Verifica la alineación antes de que el adhesivo seque (aprox. 30 segundos).',
                'Deja curar el pegamento al menos 1 hora antes de presurizar el sistema.'
            ]
        };
    }

    if (specialty === 'masonry') {
        const area = distance * 2;
        const cementBags = Math.ceil(area / 2);
        const g = gauge || '#4';
        return {
            parts: [
                { name: 'Varilla de acero', quantity: cornerCount * 4, unit: 'metros', gauge: g },
                { name: 'Cemento Portland', quantity: cementBags, unit: 'bolsas (50kg)', gauge: '' },
                { name: 'Arena fina', quantity: Math.ceil(area / 3), unit: 'm³', gauge: '' },
                { name: 'Gravilla', quantity: Math.ceil(area / 4), unit: 'm³', gauge: '' },
                { name: 'Alambre galvanizado', quantity: Math.ceil(distance * 0.5), unit: 'kg', gauge: '#16' },
                { name: 'Bloque de cemento', quantity: Math.ceil(area * 8), unit: 'unidades', gauge: '' }
            ],
            instructions: [
                `Nivela y prepara la base (área aproximada ${area} m²).`,
                `Coloca las varillas de refuerzo en las ${cornerCount} esquinas.`,
                `Mezcla el cemento en proporción 1:2:3 (cemento:arena:gravilla).`,
                `Levanta las paredes usando bloques y mortero.`,
                `Ata las varillas con alambre galvanizado en cada unión.`,
                `Cura el concreto con agua durante al menos 7 días.`
            ],
            diagram: `Base (${area} m²) → varillas de refuerzo → bloques y mortero → ${cornerCount} esquinas → acabado`,
            tips: [
                'Mantén húmedo el concreto los primeros 7 días para un curado correcto.',
                'Verifica la plomada y el nivel en cada hilada de bloques.',
                'La mezcla no debe ser demasiado líquida para mantener la resistencia.',
                'Usa cemento tipo Portland para estructuras que soporten carga.'
            ]
        };
    }

    // electrical fallback
    const cableQty = Math.ceil(distance * 1.1);
    const g = gauge || '14 AWG';
    return {
        parts: [
            { name: 'Cable eléctrico (fase)', quantity: cableQty, unit: 'metros', gauge: g },
            { name: 'Cable eléctrico (neutro)', quantity: cableQty, unit: 'metros', gauge: g },
            { name: 'Cable a tierra', quantity: cableQty, unit: 'metros', gauge: g },
            { name: 'Breakers/Interruptores', quantity: connectionCount + 1, unit: 'unidades', gauge: '20A' },
            { name: 'Cajas de registro', quantity: Math.ceil(distance / 2), unit: 'unidades', gauge: '' },
            { name: 'Tubería conduit', quantity: Math.ceil(distance * 1.1), unit: 'metros', gauge: '3/4"' },
            { name: 'Conectores de cable', quantity: Math.ceil(distance / 2) * 2, unit: 'unidades', gauge: '' },
            { name: 'Cinta aislante', quantity: 2, unit: 'rollos', gauge: '' }
        ],
        instructions: [
            `Verifica la carga total del circuito antes de comenzar.`,
            `Instala la tubería conduit a lo largo de ${distance} metros.`,
            `Pasa los cables de fase, neutro y tierra por la tubería.`,
            `Instala cajas de registro cada 2 metros aproximadamente.`,
            `Conecta los ${connectionCount} circuitos derivados al panel principal.`,
            `Verifica la continuidad y el aislamiento antes de energizar.`
        ],
        diagram: `Panel principal → conduit (${distance}m) → cajas de registro → ${connectionCount} circuitos → cargas`,
        tips: [
            'Trabaja siempre con el circuito desenergizado y verifica con un tester.',
            'Usa el calibre correcto según la carga: 14 AWG para 15A, 12 AWG para 20A.',
            'Toda instalación debe cumplir con el código eléctrico local.',
            'Instala un breaker del tamaño correcto para proteger cada circuito.'
        ]
    };
}
