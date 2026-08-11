export function buildPhase1Prompt(input: {
    specialty: string;
    distance: number;
    gauge: string;
    description?: string;
    cornerCount: number;
    connectionCount: number;
}): string {
    const specialtyNames: Record<string, string> = {
        plumbing: 'Plomería',
        masonry: 'Albañilería',
        electrical: 'Electricidad'
    };

    const gaugeNote = input.gauge?.trim()
        ? `Calibre/grosor indicado por el usuario: ${input.gauge}`
        : 'El usuario no especificó calibre — recomienda el más apropiado.';

    const descriptionNote = input.description?.trim()
        ? `\nDescripción del usuario: "${input.description.trim()}"`
        : '';

    const specialtyParams: Record<string, string> = {
        plumbing: `- Longitud de tubería: ${input.distance} metros\n- Derivaciones/salidas: ${input.connectionCount}\n- ${gaugeNote}`,
        masonry: `- Longitud/área del trabajo: ${input.distance} metros\n- Esquinas: ${input.cornerCount}\n- ${gaugeNote}`,
        electrical: `- Longitud del cableado: ${input.distance} metros\n- Circuitos/derivaciones: ${input.connectionCount}\n- ${gaugeNote}`
    };

    const params = specialtyParams[input.specialty] ?? '';

    return `Eres un maestro constructor experto en proyectos residenciales en Cuba y Latinoamérica.

Especialidad: ${specialtyNames[input.specialty] ?? input.specialty}
${params}${descriptionNote}

Analiza el trabajo y retorna ÚNICAMENTE un JSON válido (sin markdown, sin backticks, sin explicaciones adicionales — solo el JSON puro) con esta estructura exacta:

{
  "parts": [
    {
      "name": "nombre de la pieza en español",
      "quantity": 3,
      "unit": "unidad de medida (metros, unidades, kg, bolsas, m², etc.)",
      "gauge": "calibre específico recomendado (ej: 1/2\\", 3/4\\", #4, 14 AWG) — vacío si no aplica",
      "notes": "nota breve o vacío"
    }
  ],
  "instructions": [
    "Paso 1: descripción clara del primer paso",
    "Paso 2: descripción del segundo paso"
  ],
  "diagram": "esquema textual del trabajo (ej: Llave principal → válvula de paso → ramal T → salidas)",
  "tips": [
    "consejo práctico importante",
    "otro consejo"
  ]
}

Reglas de contenido:
- Incluye TODAS las piezas necesarias con cantidades basadas exactamente en los parámetros dados.
- Para plomería: tubos PVC, codos 45°/90°, tees, uniones universales, válvulas de paso, reducidores, adhesivo PVC, cinta teflón, etc.
- Para albañilería: cemento Portland, arena, gravilla, agua, varilla de acero, alambre galvanizado, bloques/ladrillos si aplica.
- Para electricidad: cable (fase, neutro, tierra por separado), breakers, cajas de registro, conectores, tubería conduit, cinta aislante.
- Recomienda el calibre más apropiado para cada pieza si el usuario no lo especificó.
- Los pasos deben estar en orden lógico de instalación.
- Máximo 5 tips, solo los más importantes.
- Responde SOLO con el JSON. Sin texto antes ni después.`;
}
