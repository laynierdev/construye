export interface Ubicacion {
  provincia: string;
  municipios: string[];
}

export const UBICACIONES: Ubicacion[] = [
  {
    provincia: 'Pinar del Río',
    municipios: [
      'Consolación del Sur', 'Guane', 'La Palma', 'Los Palacios',
      'Mantua', 'Minas de Matahambre', 'Pinar del Río', 'San Luis',
      'Sandino', 'Viñales',
    ],
  },
  {
    provincia: 'Artemisa',
    municipios: [
      'Alquízar', 'Artemisa', 'Bahía Honda', 'Bauta', 'Caimito',
      'Candelaria', 'Guanajay', 'Güira de Melena', 'Mariel',
      'San Antonio de los Baños', 'San Cristóbal',
    ],
  },
  {
    provincia: 'La Habana',
    municipios: [
      'Arroyo Naranjo', 'Boyeros', 'Centro Habana', 'Cerro', 'Cotorro',
      'Diez de Octubre', 'Guanabacoa', 'Habana del Este', 'Habana Vieja',
      'La Lisa', 'Marianao', 'Playa', 'Plaza de la Revolución',
      'Regla', 'San Miguel del Padrón',
    ],
  },
  {
    provincia: 'Mayabeque',
    municipios: [
      'Batabanó', 'Bejucal', 'Güines', 'Jaruco', 'Madruga',
      'Melena del Sur', 'Nueva Paz', 'Quivicán',
      'San José de las Lajas', 'San Nicolás de Bari', 'Santa Cruz del Norte',
    ],
  },
  {
    provincia: 'Matanzas',
    municipios: [
      'Calimete', 'Cárdenas', 'Ciénaga de Zapata', 'Colón',
      'Jagüey Grande', 'Jovellanos', 'Limonar', 'Los Arabos',
      'Matanzas', 'Pedro Betancourt', 'Perico', 'Unión de Reyes',
    ],
  },
  {
    provincia: 'Cienfuegos',
    municipios: [
      'Abreus', 'Aguada de Pasajeros', 'Cienfuegos', 'Cruces',
      'Cumanayagua', 'Lajas', 'Palmira', 'Rodas',
    ],
  },
  {
    provincia: 'Villa Clara',
    municipios: [
      'Caibarién', 'Camajuaní', 'Cifuentes', 'Corralillo', 'Encrucijada',
      'Manicaragua', 'Placetas', 'Quemado de Güines', 'Ranchuelo',
      'Remedios', 'Sagua la Grande', 'Santa Clara', 'Santo Domingo',
    ],
  },
  {
    provincia: 'Sancti Spíritus',
    municipios: [
      'Cabaiguán', 'Fomento', 'Jatibonico', 'La Sierpe',
      'Sancti Spíritus', 'Taguasco', 'Trinidad', 'Yaguajay',
    ],
  },
  {
    provincia: 'Ciego de Ávila',
    municipios: [
      'Baraguá', 'Bolivia', 'Ciego de Ávila', 'Chambas',
      'Ciro Redondo', 'Florencia', 'Majagua', 'Morón',
      'Primero de Enero', 'Venezuela',
    ],
  },
  {
    provincia: 'Camagüey',
    municipios: [
      'Camagüey', 'Carlos Manuel de Céspedes', 'Esmeralda', 'Florida',
      'Guáimaro', 'Jimagüayú', 'Minas', 'Najasa', 'Nuevitas',
      'Santa Cruz del Sur', 'Sibanicú', 'Sierra de Cubitas', 'Vertientes',
    ],
  },
  {
    provincia: 'Las Tunas',
    municipios: [
      'Amancio', 'Colombia', 'Jesús Menéndez', 'Jobabo',
      'Las Tunas', 'Majibacoa', 'Manatí', 'Puerto Padre',
    ],
  },
  {
    provincia: 'Holguín',
    municipios: [
      'Antilla', 'Báguanos', 'Banes', 'Cacocum', 'Calixto García',
      'Cueto', 'Frank País', 'Gibara', 'Holguín', 'Mayarí',
      'Moa', 'Rafael Freyre', 'Sagua de Tánamo', 'Urbano Noris',
    ],
  },
  {
    provincia: 'Granma',
    municipios: [
      'Bartolomé Masó', 'Bayamo', 'Buey Arriba', 'Campechuela',
      'Cauto Cristo', 'Guisa', 'Jiguaní', 'Manzanillo',
      'Media Luna', 'Niquero', 'Pilón', 'Río Cauto', 'Yara',
    ],
  },
  {
    provincia: 'Santiago de Cuba',
    municipios: [
      'Contramaestre', 'Guamá', 'Julio Antonio Mella', 'Palma Soriano',
      'San Luis', 'Santiago de Cuba', 'Segundo Frente',
      'Songo-La Maya', 'Tercer Frente',
    ],
  },
  {
    provincia: 'Guantánamo',
    municipios: [
      'Baracoa', 'Caimanera', 'El Salvador', 'Guantánamo',
      'Imías', 'Maisí', 'Manuel Tames', 'Niceto Pérez',
      'San Antonio del Sur', 'Yateras',
    ],
  },
  {
    provincia: 'Isla de la Juventud',
    municipios: ['Nueva Gerona'],
  },
];

export const PROVINCIAS = UBICACIONES.map((u) => u.provincia);

export function getMunicipios(provincia: string): string[] {
  return UBICACIONES.find((u) => u.provincia === provincia)?.municipios ?? [];
}
