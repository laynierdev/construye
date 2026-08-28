import { Hono } from 'hono';
import { createPieza, getPiezas } from '../controllers/piezasController.js';

const router = new Hono();

router.post('/', createPieza);
router.get('/', getPiezas);

export default router;
