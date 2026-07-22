export type Language = 'en' | 'es';

export const translations = {
    en: {
        appTitle: 'Technical Assistance for Home Projects',
        selectSpecialty: 'Select a specialty:',
        chooseOption: '-- Choose an option --',
        specialties: {
            plumbing: '🔧 Plumbing',
            masonry: '🧱 Masonry',
            electrical: '⚡ Electrical'
        },
        distanceLabel: 'Distance (meters):',
        gaugeLabel: 'Gauge/Thickness:',
        descriptionLabel: 'In your own words, what do you want to do?',
        descriptionPlaceholder: 'For example: I want to install a sink and connect it to the main water line.',
        cornerCountLabel: 'Corner count:',
        connectionCountLabel: 'Connection count:',
        placeholderExample: 'Example: 10',
        placeholderGauge: 'Specification',
        submitButton: '📋 Generate Assistance',
        submittingButton: '⏳ Processing...',
        errorTitle: 'Error',
        errorSelectSpecialty: 'Please select a specialty',
        errorUnknown: 'Unknown error while processing the request',
        resultsTitle: 'Results',
        resultsSpecialty: 'Specialty',
        requiredParts: 'Required Parts',
        part: 'Part',
        quantity: 'Quantity',
        unit: 'Unit',
        gauge: 'Gauge/Specification',
        installationInstructions: 'Installation Instructions',
        conceptualDiagram: 'Conceptual Diagram',
        nextPhases: 'Next Phases',
        phase2Button: '🔍 Search Parts and Calculate Budget (Phase 2)',
        phase2Description: 'This functionality will be enabled in Phase 2, where parts will be searched in nearby inventories, budgets will be calculated, and nearby stores will be displayed.',
        returnToForm: '← Return to Form',
        languageLabel: 'Language',
        languageEnglish: 'English',
        languageSpanish: 'Español'
    },
    es: {
        appTitle: 'Asistencia Técnica para Proyectos de Hogar',
        selectSpecialty: 'Selecciona una especialidad:',
        chooseOption: '-- Elige una opción --',
        specialties: {
            plumbing: '🔧 Plomería',
            masonry: '🧱 Albañilería',
            electrical: '⚡ Electricidad'
        },
        distanceLabel: 'Distancia (metros):',
        gaugeLabel: 'Calibre/Grosor:',
        descriptionLabel: 'En tus palabras, ¿qué quieres hacer?',
        descriptionPlaceholder: 'Por ejemplo: quiero instalar un fregadero y conectarlo a la línea de agua principal.',
        cornerCountLabel: 'Cantidad de esquinas:',
        connectionCountLabel: 'Cantidad de derivaciones*(salidas):',
        placeholderExample: 'Ejemplo: 10',
        placeholderGauge: 'Especificación',
        submitButton: '📋 Generar Asistencia',
        submittingButton: '⏳ Procesando...',
        errorTitle: 'Error',
        errorSelectSpecialty: 'Por favor selecciona una especialidad',
        errorUnknown: 'Error desconocido al procesar la solicitud',
        resultsTitle: 'Resultados',
        resultsSpecialty: 'Especialidad',
        requiredParts: 'Piezas Requeridas',
        part: 'Pieza',
        quantity: 'Cantidad',
        unit: 'Unidad',
        gauge: 'Calibre/Grosor(Opcional)',
        installationInstructions: 'Instrucciones de Instalación',
        conceptualDiagram: 'Esquema Conceptual',
        nextPhases: 'Próximas Fases',
        phase2Button: '🔍 Buscar Piezas y Calcular Presupuesto (Fase 2)',
        phase2Description: 'Esta funcionalidad se habilitará en la Fase 2, donde se buscarán piezas en inventarios cercanos, se calculará el presupuesto y se mostrarán tiendas cercanas.',
        returnToForm: '← Volver al Formulario',
        languageLabel: 'Idioma',
        languageEnglish: 'English',
        languageSpanish: 'Español'
    }
};

export function getText(key: keyof typeof translations.en, language: Language): string {
    return translations[language][key] as string;
}
