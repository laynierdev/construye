import { generateAIResponse } from './aiService.js';
import { buildPhase1Prompt } from './promptBuilder.js';

interface Phase1Request {
    specialty: 'plumbing' | 'masonry' | 'electrical';
    distance?: number;
    gauge?: string;
    description?: string;
    cornerCount?: number;
    connectionCount?: number;
}

interface RequiredPart {
    name: string;
    quantity: number;
    gauge: string;
    unit: string;
}

interface Phase1Response {
    specialty: string;
    parts: RequiredPart[];
    instructions: string;
    conceptualDiagram: string;
    nextPhases: string;
}

export async function processPhase1(request: Phase1Request): Promise<Phase1Response> {
    const { specialty, distance = 10, gauge = 'standard', description = '', cornerCount = 0, connectionCount = 0 } = request;

    const prompt = buildPhase1Prompt({ specialty, distance, gauge, description, cornerCount, connectionCount });

    const aiResult = await generateAIResponse(prompt);

    const aiText = aiResult.text || '';

    const parts = buildParts(specialty, distance, gauge, cornerCount, connectionCount);

    return {
        specialty,
        parts,
        instructions: buildInstructions(specialty, distance, gauge, cornerCount, connectionCount, aiText),
        conceptualDiagram: buildConceptualDiagram(specialty, distance, gauge, cornerCount, connectionCount),
        nextPhases: 'In Phase 2 we will search for parts in nearby inventories, calculate the budget, and locate nearby stores.'
    };
}

function buildParts(
    specialty: string,
    distance: number,
    gauge: string,
    cornerCount: number,
    connectionCount: number
): RequiredPart[] {
    if (specialty === 'plumbing') {
        const pipeQuantity = Math.ceil(distance / 5) + 1;
        return [
            { name: 'PVC Pipe', quantity: pipeQuantity, gauge, unit: 'meters' },
            { name: '90° Elbows', quantity: Math.max(2, Math.floor(distance / 3)), gauge, unit: 'units' },
            { name: 'Branch Tees', quantity: connectionCount, gauge, unit: 'units' },
            { name: 'Gate Valve', quantity: 1, gauge, unit: 'units' }
        ];
    }

    if (specialty === 'masonry') {
        const coveredArea = distance * 2;
        return [
            { name: 'Steel Rebar', quantity: cornerCount * 4, gauge: gauge || '#4', unit: 'meters' },
            { name: 'Cement Bags', quantity: Math.ceil(coveredArea / 2), gauge: '50kg', unit: 'bags' },
            { name: 'Mortar Sand', quantity: Math.ceil(coveredArea / 1.5), gauge: 'standard', unit: 'm³' },
            { name: 'Tie Wire', quantity: Math.ceil(distance * 0.5), gauge: '#16', unit: 'kg' }
        ];
    }

    return [
        { name: 'Conductive Cable', quantity: Math.ceil(distance * 1.1), gauge: gauge || '14 AWG', unit: 'meters' },
        { name: 'Connection Boxes', quantity: Math.ceil(distance / 1.5), gauge: 'standard', unit: 'units' },
        { name: 'Wire Nuts', quantity: Math.ceil(distance / 1.5) * 2, gauge: gauge || '14 AWG', unit: 'units' },
        { name: 'Breakers/Switches', quantity: connectionCount + 1, gauge: '20A', unit: 'units' }
    ];
}

function buildInstructions(
    specialty: string,
    distance: number,
    gauge: string,
    cornerCount: number,
    connectionCount: number,
    aiText: string
): string {
    const baseInstructions = {
        plumbing: [
            `Verify system pressure (max 80 psi).`,
            `Prepare pipes by cutting to size (${distance}m total).`,
            `Install connections with PTFE tape.`,
            `Seal ${connectionCount} secondary branches.`,
            'Perform a leak test before finishing.'
        ],
        masonry: [
            `Level and prepare the base (approx. ${distance * 2}m² area).`,
            `Place reinforcement bars at the corners (${cornerCount} corners).`,
            'Pour concrete or mortar according to specification.',
            'Allow curing for at least 7 days.'
        ],
        electrical: [
            'Verify the total circuit load.',
            `Run cables of gauge ${gauge} through trays or conduits.`,
            `Install connection boxes every 1.5-2m.`,
            `Connect ${connectionCount} secondary branches.`,
            'Test continuity and insulation before energizing.'
        ]
    };

    const lines = baseInstructions[specialty as keyof typeof baseInstructions] || baseInstructions.electrical;
    const aiSection = aiText ? `\nAI note:\n${aiText}` : '';

    return [...lines, aiSection].filter(Boolean).join('\n');
}

function buildConceptualDiagram(
    specialty: string,
    distance: number,
    gauge: string,
    cornerCount: number,
    connectionCount: number
): string {
    if (specialty === 'plumbing') {
        return `Main supply -> valve -> branch lines (${connectionCount} connections)`;
    }

    if (specialty === 'masonry') {
        return `Base structure (${distance * 2}m²) -> corners (${cornerCount}) -> reinforcement -> finish`;
    }

    return `Main panel -> conduit (${gauge}) -> connection boxes -> loads (${connectionCount} branches)`;
}
