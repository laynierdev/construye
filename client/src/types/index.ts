export interface RequiredPart {
    name: string;
    quantity: number;
    unit: string;
    gauge: string;
    notes?: string;
}

export interface Phase1Response {
    specialty: string;
    parts: RequiredPart[];
    instructions: string[];
    conceptualDiagram: string;
    tips: string[];
    nextPhases: string;
    aiGenerated: boolean;
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
