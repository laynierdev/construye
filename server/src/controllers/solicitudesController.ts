import type { Context } from 'hono';
import * as solicitudesService from '../services/solicitudesService.js';

interface CreateSolicitudBody {
  piezaNombre?: string;
  calibre?: string;
  cantidad?: number;
  nota?: string;
  telefonoCliente?: string;
  prefiereMensajeria?: boolean;
}

export async function createSolicitud(c: Context) {
  try {
    const body = await c.req.json<CreateSolicitudBody>();
    const { piezaNombre, calibre, cantidad, nota, telefonoCliente, prefiereMensajeria } = body;

    if (!piezaNombre || cantidad == null || !telefonoCliente) {
      return c.json(
        { error: 'Faltan campos requeridos: piezaNombre, cantidad, telefonoCliente' },
        400
      );
    }

    const solicitud = await solicitudesService.createSolicitud({
      piezaNombre,
      calibre,
      cantidad: Number(cantidad),
      nota,
      telefonoCliente,
      prefiereMensajeria: Boolean(prefiereMensajeria),
    });
    return c.json(solicitud, 201);
  } catch (err) {
    return c.json({ error: 'Error al crear la solicitud', details: String(err) }, 500);
  }
}

export async function getSolicitudes(c: Context) {
  try {
    const solicitudes = await solicitudesService.getSolicitudes();
    return c.json(solicitudes);
  } catch (err) {
    return c.json({ error: 'Error al obtener las solicitudes', details: String(err) }, 500);
  }
}
