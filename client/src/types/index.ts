export interface Pieza {
    nombre: string;
    cantidad: number;
    calibre: string;
    unidad: string;
}

export interface Fase1Response {
    especialidad: string;
    piezas: Pieza[];
    instrucciones: string;
    esquemaConceptual: string;
    proximasFases: string;
}

export type Especialidad = 'plomeria' | 'albanileria' | 'electricidad';

export interface FormData {
    especialidad: Especialidad | '';
    distancia: number;
    calibre: string;
    cantidadEsquinas: number;
    cantidadDerivaciones: number;
}
