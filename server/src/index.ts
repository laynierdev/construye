import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { processPhase1 } from './services/phase1Service.js';

interface Phase1Request {
    specialty: 'plumbing' | 'masonry' | 'electrical';
    distance?: number;
    gauge?: string;
    description?: string;
    cornerCount?: number;
    connectionCount?: number;
}

const app = new Hono();

app.use('*', cors());

app.get('/health', (c) => {
    return c.json({ status: 'ok', message: 'Construye API server is running' });
});

/**
 * Phase 1 endpoint: technical assistance with AI-backed logic
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

        const response = await processPhase1(body);

        return c.json(response, { status: 200 });
    } catch (error) {
        return c.json(
            { error: 'Error processing request', details: String(error) },
            { status: 500 }
        );
    }
});

const port = parseInt(process.env.PORT || '3000');
console.log(`🚀 Construye server running on port ${port}`);

export default app;
