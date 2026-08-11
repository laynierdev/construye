import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { processPhase1 } from './services/phase1Service.js';
import type { Phase1Request } from './types.js';

const app = new Hono();

app.use('*', cors());

app.get('/health', (c) => {
    return c.json({ status: 'ok', message: 'Construye API server is running' });
});

app.post('/api/v1/phase1/assistant', async (c) => {
    try {
        const body = await c.req.json<Phase1Request>();

        if (!body.specialty || !['plumbing', 'masonry', 'electrical'].includes(body.specialty)) {
            return c.json(
                { error: 'Especialidad inválida. Se esperaba: plumbing, masonry o electrical.' },
                { status: 400 }
            );
        }

        const response = await processPhase1(body);
        return c.json(response, { status: 200 });
    } catch (error) {
        return c.json(
            { error: 'Error al procesar la solicitud', details: String(error) },
            { status: 500 }
        );
    }
});

const port = parseInt(process.env.PORT || '3000');

serve({ fetch: app.fetch, port });
console.log(`🚀 Construye server corriendo en el puerto ${port}`);
