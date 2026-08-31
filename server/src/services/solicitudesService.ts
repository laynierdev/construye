import * as solicitudesRepo from '../repositories/solicitudesRepository.js';

export async function createSolicitud(body: {
  piezaNombre: string;
  calibre?: string;
  cantidad: number;
  nota?: string;
  telefonoCliente: string;
  prefiereMensajeria: boolean;
}) {
  return solicitudesRepo.create({ ...body, vendedorId: null });
}

export async function getSolicitudes() {
  return solicitudesRepo.findAll();
}
