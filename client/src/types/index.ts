export interface RequiredPart {
    name: string;
    quantity: number;
    gauge: string;
    unit: string;
}

export interface Phase1Response {
    specialty: string;
    parts: RequiredPart[];
    instructions: string;
    conceptualDiagram: string;
    nextPhases: string;
}

export type Specialty = 'plumbing' | 'masonry' | 'electrical';

export interface FormData {
    specialty: Specialty | '';
    distance: number;
    gauge: string;
    description: string;
    cornerCount: number;
    connectionCount: number;
}
