import prisma from '../lib/prisma.js';

export async function create(data: {
  piezaNombre: string;
  calibre?: string;
  cantidad: number;
  nota?: string;
  telefonoCliente: string;
  prefiereMensajeria: boolean;
  vendedorId: null;
}) {
  return prisma.solicitud.create({ data });
}

export async function findAll() {
  return prisma.solicitud.findMany({ orderBy: { createdAt: 'desc' } });
}
