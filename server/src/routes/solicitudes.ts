import { Hono } from 'hono';
import { createSolicitud, getSolicitudes } from '../controllers/solicitudesController.js';

const router = new Hono();

router.post('/', createSolicitud);
router.get('/', getSolicitudes);

export default router;
