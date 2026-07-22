export function buildPhase1Prompt(input: {
    specialty: string;
    distance: number;
    gauge: string;
    description?: string;
    cornerCount: number;
    connectionCount: number;
}): string {
    const description = input.description?.trim() ? `\nUser description: ${input.description.trim()}` : '';

    return `You are a construction assistant for home projects.
Specialty: ${input.specialty}
Distance: ${input.distance} meters
Gauge/specification: ${input.gauge}
Corner count: ${input.cornerCount}
Connection count: ${input.connectionCount}${description}

Give a short practical answer with:
1. Bulleted list of piece->caliber->number of that piece
2. Graphical representation of the construction layout
3. A short list of other required materials
4. Any additional tips or recommendations for the construction process

Keep it concise and use Spanish as response default language`;
}
