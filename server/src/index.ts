import { Hono } from 'hono';
import { cors } from 'hono/cors';

interface Phase1Request {
    specialty: 'plumbing' | 'masonry' | 'electrical';
    distance?: number;
    gauge?: string;
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

const app = new Hono();

app.use('*', cors());

app.get('/health', (c) => {
    return c.json({ status: 'ok', message: 'Construye API server is running' });
});

/**
 * Phase 1 endpoint: technical assistance with a mocked AI engine
 * POST /api/v1/phase1/assistant
 */
app.post('/api/v1/phase1/assistant', async (c) => {
    try {
        const body = await c.req.json<Phase1Request>();

        if (!body.specialty || !['plumbing', 'masonry', 'electrical'].includes(body.specialty)) {
            return c.json(
                { error: 'Invalid specialty. Expected: plumbing, masonry, or electrical' },
                { status: 400 }
            );
        }

        const response = processPhase1(body);

        return c.json(response, { status: 200 });
    } catch (error) {
        return c.json(
            { error: 'Error processing request', details: String(error) },
            { status: 500 }
        );
    }
});

function processPhase1(request: Phase1Request): Phase1Response {
    const { specialty, distance = 10, gauge = 'standard', cornerCount = 0, connectionCount = 0 } = request;

    let parts: RequiredPart[] = [];
    let instructions = '';
    let conceptualDiagram = '';

    if (specialty === 'plumbing') {
        parts = generatePlumbingParts(distance, gauge, connectionCount);
        instructions = `
1. Verify system pressure (max 80 psi)
2. Prepare pipes by cutting to size (${distance}m total)
3. Install connections with PTFE tape
4. Seal secondary branches (${connectionCount} connections)
5. Perform a leak test
    `.trim();
        conceptualDiagram = `
┌─────────────────────┐
│   Main Supply       │
└──────────┬──────────┘
           │
      [Valve]
           │
    ┌──────┴──────┐
    │              │
[Branch 1] [Branch 2]
    `;
    } else if (specialty === 'masonry') {
        parts = generateMasonryParts(distance, gauge, cornerCount);
        instructions = `
1. Level and prepare the base (approx. ${distance * 2}m² area)
2. Place reinforcement bars at the corners (${cornerCount} corners)
3. Pour concrete/mortar according to specification
4. Allow curing for at least 7 days
5. Perform a visual inspection
    `.trim();
        conceptualDiagram = `
    ┌─────────────────────┐
    │   Base Structure    │
    │  (${distance * 2}m²)         │
    └──────┬──────┬────┬──┘
         [Corner 1..${cornerCount}]
    `;
    } else if (specialty === 'electrical') {
        parts = generateElectricalParts(distance, gauge, connectionCount);
        instructions = `
1. Verify the total circuit load
2. Run cables of gauge ${gauge} through trays or conduits
3. Install connection boxes every 1.5-2m
4. Connect ${connectionCount} secondary branches
5. Test continuity and insulation before energizing
    `.trim();
        conceptualDiagram = `
    ┌──────────────┐
    │  Main Panel  │
    └───────┬──────┘
            │ (${gauge})
      ┌─────┴──────┐
      │            │
   [Load 1]   [Branches: ${connectionCount}]
    `;
    }

    return {
        specialty,
        parts,
        instructions,
        conceptualDiagram,
        nextPhases: 'In Phase 2 we will search for parts in nearby inventories, calculate the budget, and locate nearby stores.',
    };
}

function generatePlumbingParts(distance: number, gauge: string, branches: number): RequiredPart[] {
    const pipeQuantity = Math.ceil(distance / 5) + 1;
    return [
        { name: 'PVC Pipe', quantity: pipeQuantity, gauge, unit: 'meters' },
        { name: '90° Elbows', quantity: Math.max(2, Math.floor(distance / 3)), gauge, unit: 'units' },
        { name: 'Branch Tees', quantity: branches, gauge, unit: 'units' },
        { name: 'Gate Valve', quantity: 1, gauge, unit: 'units' },
        { name: 'PTFE Tape', quantity: 5, gauge: 'standard', unit: 'rolls' },
        { name: 'PVC Cement', quantity: 1, gauge: 'standard', unit: 'can' },
    ];
}

function generateMasonryParts(distance: number, gauge: string, corners: number): RequiredPart[] {
    const coveredArea = distance * 2;
    return [
        { name: 'Steel Rebar', quantity: corners * 4, gauge: gauge || '#4', unit: 'meters' },
        { name: 'Cement Bags', quantity: Math.ceil(coveredArea / 2), gauge: '50kg', unit: 'bags' },
        { name: 'Mortar Sand', quantity: Math.ceil(coveredArea / 1.5), gauge: 'standard', unit: 'm³' },
        { name: 'Gravel/Crushed Stone', quantity: Math.ceil(coveredArea / 2), gauge: '3/4"', unit: 'm³' },
        { name: 'Tie Wire', quantity: Math.ceil(distance * 0.5), gauge: '#16', unit: 'kg' },
        { name: 'Formwork Lumber', quantity: Math.ceil(distance * 2), gauge: '2x4', unit: 'meters' },
    ];
}

function generateElectricalParts(distance: number, gauge: string, branches: number): RequiredPart[] {
    const boxCount = Math.ceil(distance / 1.5);
    return [
        { name: 'Conductive Cable', quantity: Math.ceil(distance * 1.1), gauge: gauge || '14 AWG', unit: 'meters' },
        { name: 'Connection Boxes', quantity: boxCount, gauge: 'standard', unit: 'units' },
        { name: 'Wire Nuts', quantity: boxCount * 2, gauge: gauge || '14 AWG', unit: 'units' },
        { name: 'Breakers/Switches', quantity: branches + 1, gauge: '20A', unit: 'units' },
        { name: 'Conduit Tubing', quantity: Math.ceil(distance * 0.8), gauge: '1/2"', unit: 'meters' },
        { name: 'Cover Plates', quantity: boxCount, gauge: 'standard', unit: 'units' },
    ];
}

const port = parseInt(process.env.PORT || '3000');
console.log(`🚀 Construye server running on port ${port}`);

export default app;
