import prisma from '../lib/prisma.js';
import type { Vendedor } from '@prisma/client';

export async function findByTelefono(telefono: string): Promise<Vendedor | null> {
  return prisma.vendedor.findFirst({ where: { telefono } });
}

export async function countAll(): Promise<number> {
  return prisma.vendedor.count();
}

export async function create(data: {
  nombre: string;
  telefono: string;
  provincia: string;
  municipio: string;
}): Promise<Vendedor> {
  return prisma.vendedor.create({ data });
}
