import prisma from '../lib/prisma.js';

export async function create(data: {
  nombre: string;
  calibre?: string;
  stock: number;
  provincia: string;
  municipio: string;
  vendedorId: number;
}) {
  return prisma.pieza.create({
    data,
    include: { vendedor: { select: { nombre: true, telefono: true } } },
  });
}

export async function findByLocation(provincia: string, municipio?: string) {
  return prisma.pieza.findMany({
    where: {
      provincia,
      ...(municipio ? { municipio } : {}),
    },
    include: { vendedor: { select: { nombre: true, telefono: true } } },
  });
}
