import type { Context } from 'hono';
import * as piezasService from '../services/piezasService.js';

interface CreatePiezaBody {
  nombre?: string;
  calibre?: string;
  stock?: number;
  provincia?: string;
  municipio?: string;
  telefonoVendedor?: string;
  nombreVendedor?: string;
}

export async function createPieza(c: Context) {
  try {
    const body = await c.req.json<CreatePiezaBody>();
    const { nombre, calibre, stock, provincia, municipio, telefonoVendedor, nombreVendedor } = body;

    if (!nombre || stock == null || !provincia || !municipio || !telefonoVendedor) {
      return c.json(
        { error: 'Faltan campos requeridos: nombre, stock, provincia, municipio, telefonoVendedor' },
        400
      );
    }

    const pieza = await piezasService.createPieza({
      nombre,
      calibre,
      stock: Number(stock),
      provincia,
      municipio,
      telefonoVendedor,
      nombreVendedor,
    });
    return c.json(pieza, 201);
  } catch (err) {
    return c.json({ error: 'Error al crear la pieza', details: String(err) }, 500);
  }
}

export async function getPiezas(c: Context) {
  try {
    const provincia = c.req.query('provincia');
    const municipio = c.req.query('municipio');

    if (!provincia) {
      return c.json({ error: 'El parámetro provincia es requerido' }, 400);
    }

    const piezas = await piezasService.getPiezas(provincia, municipio);
    return c.json(piezas);
  } catch (err) {
    return c.json({ error: 'Error al obtener las piezas', details: String(err) }, 500);
  }
}
