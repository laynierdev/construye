import { Hono } from 'hono';
import { cors } from 'hono/cors';

// Tipos para las solicitudes
interface Fase1Request {
    especialidad: 'plomeria' | 'albanileria' | 'electricidad';
    distancia?: number; // metros
    calibre?: string; // grosor/especificación
    cantidadEsquinas?: number;
    cantidadDerivaciones?: number;
}

interface Pieza {
    nombre: string;
    cantidad: number;
    calibre: string;
    unidad: string;
}

interface Fase1Response {
    especialidad: string;
    piezas: Pieza[];
    instrucciones: string;
    esquemaConceptual: string;
    proximasFases: string;
}

const app = new Hono();

// Middleware CORS
app.use('*', cors());

// Health check
app.get('/health', (c) => {
    return c.json({ status: 'ok', message: 'Servidor Construye API funcionando' });
});

/**
 * Endpoint para Fase 1: Asistencia técnica con motor de IA mockeado
 * POST /api/v1/fase1/asistente
 */
app.post('/api/v1/fase1/asistente', async (c) => {
    try {
        const body = await c.req.json<Fase1Request>();

        // Validar entrada
        if (!body.especialidad || !['plomeria', 'albanileria', 'electricidad'].includes(body.especialidad)) {
            return c.json(
                { error: 'Especialidad inválida. Debe ser: plomeria, albanileria o electricidad' },
                { status: 400 }
            );
        }

        // Construir respuesta según especialidad
        const respuesta = procesarFase1(body);

        return c.json(respuesta, { status: 200 });
    } catch (error) {
        return c.json(
            { error: 'Error procesando solicitud', details: String(error) },
            { status: 500 }
        );
    }
});

/**
 * Procesa la solicitud de Fase 1 y devuelve piezas recomendadas
 */
function procesarFase1(request: Fase1Request): Fase1Response {
    const { especialidad, distancia = 10, calibre = 'estándar', cantidadEsquinas = 0, cantidadDerivaciones = 0 } = request;

    let piezas: Pieza[] = [];
    let instrucciones = '';
    let esquemaConceptual = '';

    if (especialidad === 'plomeria') {
        piezas = generarPiezasPlomeria(distancia, calibre, cantidadDerivaciones);
        instrucciones = `
1. Verificar presión del sistema (máx 80 psi)
2. Preparar tuberías cortando a medida (${distancia}m total)
3. Instalar conexiones con teflón
4. Sellar derivaciones secundarias (${cantidadDerivaciones} conexiones)
5. Realizar prueba de hermeticidad
    `.trim();
        esquemaConceptual = `
┌─────────────────────┐
│   Fuente Principal  │
└──────────┬──────────┘
           │
      [Válvula]
           │
    ┌──────┴──────┐
    │              │
[Derivación 1] [Derivación 2]
    `;
    } else if (especialidad === 'albanileria') {
        piezas = generarPiezasAlbanileria(distancia, calibre, cantidadEsquinas);
        instrucciones = `
1. Nivelar y preparar base (área aprox. ${distancia * 2}m²)
2. Colocar varillas de refuerzo en esquinas (${cantidadEsquinas} esquinas)
3. Vertir concreto/mortero según especificación
4. Dejar curar mínimo 7 días
5. Realizar inspección visual
    `.trim();
        esquemaConceptual = `
    ┌─────────────────────┐
    │   Estructura Base   │
    │  (${distancia * 2}m²)         │
    └──────┬──────┬────┬──┘
         [Esquina 1..${cantidadEsquinas}]
    `;
    } else if (especialidad === 'electricidad') {
        piezas = generarPiezasElectricidad(distancia, calibre, cantidadDerivaciones);
        instrucciones = `
1. Verificar carga total del circuito
2. Tender cables de calibre ${calibre} en bandejas/tuberías
3. Instalar cajas de conexión cada 1.5-2m
4. Conectar ${cantidadDerivaciones} derivaciones secundarias
5. Probar continuidad y aislamiento antes de energizar
    `.trim();
        esquemaConceptual = `
    ┌──────────────┐
    │  Panel Prin. │
    └───────┬──────┘
            │ (${calibre})
      ┌─────┴──────┐
      │            │
   [Carga 1]   [Derivaciones: ${cantidadDerivaciones}]
    `;
    }

    return {
        especialidad,
        piezas,
        instrucciones,
        esquemaConceptual,
        proximasFases: 'En la Fase 2 buscaremos piezas en inventarios cercanos, calcularemos presupuesto y geolocalización de tiendas.',
    };
}

function generarPiezasPlomeria(distancia: number, calibre: string, derivaciones: number): Pieza[] {
    const cantidadTuberia = Math.ceil(distancia / 5) + 1; // Considerar desperdicios
    return [
        { nombre: 'Tubería PVC', cantidad: cantidadTuberia, calibre, unidad: 'metros' },
        { nombre: 'Codos 90°', cantidad: Math.max(2, Math.floor(distancia / 3)), calibre, unidad: 'unidades' },
        { nombre: 'Tés de derivación', cantidad: derivaciones, calibre, unidad: 'unidades' },
        { nombre: 'Válvula de compuerta', cantidad: 1, calibre, unidad: 'unidades' },
        { nombre: 'Empaques de teflón', cantidad: 5, calibre: 'estándar', unidad: 'rollos' },
        { nombre: 'Pegamento PVC', cantidad: 1, calibre: 'estándar', unidad: 'bote' },
    ];
}

function generarPiezasAlbanileria(distancia: number, calibre: string, esquinas: number): Pieza[] {
    const areaCubierta = distancia * 2; // aproximado
    return [
        { nombre: 'Varillas de acero', cantidad: esquinas * 4, calibre: calibre || '#4', unidad: 'metros' },
        { nombre: 'Bolsas de cemento', cantidad: Math.ceil(areaCubierta / 2), calibre: '50kg', unidad: 'bolsas' },
        { nombre: 'Arena para mortero', cantidad: Math.ceil(areaCubierta / 1.5), calibre: 'estándar', unidad: 'm³' },
        { nombre: 'Grava/Piedra triturada', cantidad: Math.ceil(areaCubierta / 2), calibre: '3/4"', unidad: 'm³' },
        { nombre: 'Alambre de amarre', cantidad: Math.ceil(distancia * 0.5), calibre: '#16', unidad: 'kg' },
        { nombre: 'Madera para encofrado', cantidad: Math.ceil(distancia * 2), calibre: '2x4', unidad: 'metros' },
    ];
}

function generarPiezasElectricidad(distancia: number, calibre: string, derivaciones: number): Pieza[] {
    const cantidadCajas = Math.ceil(distancia / 1.5);
    return [
        { nombre: 'Cable conductor', cantidad: Math.ceil(distancia * 1.1), calibre: calibre || '14 AWG', unidad: 'metros' },
        { nombre: 'Cajas de conexión', cantidad: cantidadCajas, calibre: 'estándar', unidad: 'unidades' },
        { nombre: 'Conectores tipo tuerca', cantidad: cantidadCajas * 2, calibre: calibre || '14 AWG', unidad: 'unidades' },
        { nombre: 'Breakers/Interruptores', cantidad: derivaciones + 1, calibre: '20A', unidad: 'unidades' },
        { nombre: 'Canaleta/Tubo conduit', cantidad: Math.ceil(distancia * 0.8), calibre: '1/2"', unidad: 'metros' },
        { nombre: 'Placas de cubierta', cantidad: cantidadCajas, calibre: 'estándar', unidad: 'unidades' },
    ];
}

// Puerto de escucha
const port = parseInt(process.env.PORT || '3000');
console.log(`🚀 Servidor Construye ejecutándose en puerto ${port}`);

export default app;
