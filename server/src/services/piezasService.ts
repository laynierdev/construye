import * as vendedoresRepo from '../repositories/vendedoresRepository.js';
import * as piezasRepo from '../repositories/piezasRepository.js';

export async function createPieza(body: {
  nombre: string;
  calibre?: string;
  stock: number;
  provincia: string;
  municipio: string;
  telefonoVendedor: string;
  nombreVendedor?: string;
}) {
  const { nombre, calibre, stock, provincia, municipio, telefonoVendedor, nombreVendedor } = body;

  let vendedor = await vendedoresRepo.findByTelefono(telefonoVendedor);

  if (!vendedor) {
    let finalNombre: string;
    if (nombreVendedor?.trim()) {
      finalNombre = nombreVendedor.trim();
    } else {
      const count = await vendedoresRepo.countAll();
      finalNombre = `vendedor_${String(count + 1).padStart(4, '0')}`;
    }
    vendedor = await vendedoresRepo.create({
      nombre: finalNombre,
      telefono: telefonoVendedor,
      provincia,
      municipio,
    });
  }

  return piezasRepo.create({ nombre, calibre, stock, provincia, municipio, vendedorId: vendedor.id });
}

export async function getPiezas(provincia: string, municipio?: string) {
  return piezasRepo.findByLocation(provincia, municipio);
}
