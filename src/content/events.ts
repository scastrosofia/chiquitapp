import type { EventType, IconName } from '../engine/types';

export interface EventContentTemplate {
  eventType: EventType;
  cardTitle: string;
  cardSubtitle: string;
  cardIcon: IconName;
  institutionalTitle: string;
  hostsPool: readonly string[];
  droneInitialsPool: readonly string[];
  baseGuests: number;
  minInflatedGuests: number;
  maxInflatedGuests: number;
  zoneAName: string;
  zoneASubtitle: string;
  zoneASubgroups: readonly string[];
  zoneBName: string;
  zoneBSubtitle: string;
  zoneBSubgroups: readonly string[];
  classicMatchupsPool: readonly string[];
  interzonalMatchupsPool: readonly string[];
  phaseNamesPool: readonly string[];
  combiManifesto: string;
  combiDecisiveMoments: readonly string[];
  amigosPrivilege: string;
  ligaChampionMidEventPool: readonly {
    holder: string;
    minuteAwarded: string;
    explanation: string;
  }[];
  externalCupsPool: readonly {
    cupName: string;
    cupSubtitle: string;
    participants: readonly string[];
  }[];
  octavosSlotsPool: readonly [string, string, string][];
  finalContenderAPool: readonly string[];
  finalContenderBPool: readonly string[];
  finalNote: string;
  standingsGroups: readonly {
    name: string;
    status: 'campeon_liga' | 'zona_clasificacion' | 'inmune_amigos' | 'descenso_anulado';
    badge?: string;
  }[];
  baseTimeline: readonly {
    time: string;
    title: string;
    description: string;
    icon: IconName;
    highlightType?: 'vip_campeones' | 'combi' | 'titulo_mitad' | 'drones';
  }[];
  realChecklistTasks: readonly string[];
  institutionalChecklistTasks: readonly string[];
}

export const EVENT_CONTENT: Record<EventType, EventContentTemplate> = {
  casamiento: {
    eventType: 'casamiento',
    cardTitle: 'Casamiento',
    cardSubtitle: 'Enlace matrimonial en dos zonas con repechaje civil y Trofeo de Campeones',
    cardIcon: 'anillos',
    institutionalTitle: 'Torneo Oficial de Enlace Matrimonial — Apertura & Clausura Nupcial',
    hostsPool: ['Camila & Tomás', 'Valentina & Julián', 'Sofía & Nicolás', 'Lucía & Mateo'],
    droneInitialsPool: ['C & T', 'V & J', 'S & N', 'BODA'],
    baseGuests: 120,
    minInflatedGuests: 820,
    maxInflatedGuests: 1380,
    zoneAName: 'ZONA A — SECTOR NOVIA',
    zoneASubtitle: 'Familia de la Novia + La Novia (Localía Administrativa)',
    zoneASubgroups: [
      'La Novia (Cabeza de Serie A)',
      'Primos Segundos de Zona Norte',
      'Compañeras del Secundario (Promoción 2012)',
      'Tías Políticas con Tocados Homologados',
    ],
    zoneBName: 'ZONA B — SECTOR NOVIO',
    zoneBSubtitle: 'Familia del Novio + El Novio (Ubicado en Zona Opuesta por Sorteo)',
    zoneBSubgroups: [
      'El Novio (Cabeza de Serie B — Sin cruce hasta Playoff)',
      'Grupo de Fútbol 5 de los Martes',
      'Tíos del Interior Reprogramados',
      'Ex Compañeros de Oficina (Invitados por Vidriera)',
    ],
    classicMatchupsPool: [
      'Suegra Titular (Zona A) vs. Suegra Visitante (Zona B) — Con público de ambas parcialidades',
      'Cuñada Organizadora vs. Madrina Histórica — Definición por tiempo de discurso',
      'Mesa de Solteros A vs. Mesa de Solteros B — Cruce directo por barra libre',
    ],
    interzonalMatchupsPool: [
      'El DJ de la Pista Central vs. La Abuela Nelly (Mesa 42)',
      'Fotógrafo Oficial de Civil vs. Primo Vegano de Último Momento',
      'Cura / Juez de Paz vs. Maestro Parrillero del Trasnoche',
      'Wedding Planner Auxiliar vs. Tío que pide poner cumbia a las 19:15',
    ],
    phaseNamesPool: [
      'Fase Regular de Recepción Acumulativa',
      'Torneo Reducido de Mesa Dulce',
      'Liguilla Pre-Ramo a Partido Único',
      'Hexagonal de Vals en Cancha Neutral',
    ],
    combiManifesto:
      'Por disposición expresa de seguridad protocolar, todo lo verdaderamente importante del casamiento ocurre adentro de una Combi Oficial blanca con vidrios polarizados estacionada en el playón auxiliar: el intercambio de anillos, la firma de la libreta, la degustación del plato caliente y la revisión VAR del ramo.',
    combiDecisiveMoments: [
      'Firma del acta civil sobre capot interno con luz LED celeste',
      'Primer cruce presencial entre la Novia (Zona A) y el Novio (Zona B) durante 4 minutos reglamentarios',
      'Corte oficial del piso superior de la torta ante escribano y dos vocales suplentes',
    ],
    amigosPrivilege:
      'Bye directo a la barra premium, ubicación frente al aire acondicionado central, inmunidad de traje y plato repetido sin pasar por fase de grupos.',
    ligaChampionMidEventPool: [
      {
        holder: 'La Novia',
        minuteAwarded: '18:30 HS (previo al ingreso al salón)',
        explanation:
          'Declarada "Campeona de Liga Nupcial" de oficio por Tabla Anual Acumulada de organización de presupuestos, creada mediante resolución firmada en la combi 20 minutos antes.',
      },
      {
        holder: 'Mesa 1 — Amigos del Organizador',
        minuteAwarded: '18:45 HS (plena recepción fría)',
        explanation:
          'Adjudicatarios del título "Campeón Anual de Puntualidad Retroactiva" antes de servirse el primer canapé.',
      },
    ],
    externalCupsPool: [
      {
        cupName: 'TROFEO DE CAMPEONES DE BODA',
        cupSubtitle: 'Definición oficial del Campeón/a del Casamiento (14 días después)',
        participants: [
          'Ganador/a del Vals (Cancha Neutral)',
          'Ganador/a de la Tirada del Ramo (Por Penales)',
          'La Novia (Campeona de Liga por Tabla Anual)',
          'Paredes & Di María (Invitados de Honor con Pase Directo)',
        ],
      },
      {
        cupName: 'SUPERCOPA INTERNACIONAL DE ALIANZAS',
        cupSubtitle: 'Partido desempate en horario vespertino a confirmar',
        participants: [
          'Vencedor del Carnaval Carioca',
          'Ganador de la Mesa Dulce Acumulada',
          'Representante de Amigos del Organizador',
          'Dupla Zona Campeones del Mundo ★',
        ],
      },
    ],
    octavosSlotsPool: [
      ['Vals Pareja 1° Zona A', 'Vals Pareja 4° Zona B', 'Cancha neutral (pasillo de baños)'],
      ['Tirada de Ramo — Bloque Primas', 'Tirada de Ramo — Bloque Amigas', 'Definición desde los 12 pasos'],
      ['El DJ Residente', 'Abuela Nelly (Interzonal)', 'Sorteo con bolillero tibio'],
      ['Amigos del Organizador', 'LIBRE (BYE REGLAMENTARIO)', 'Avanza sin despeinarse'],
    ],
    finalContenderAPool: ['Ganador Llave Vals Neutral', 'Ganadora Penales del Ramo'],
    finalContenderBPool: ['Zona Campeones del Mundo (Paredes & Di María)', 'Amigos del Organizador (Invictos)'],
    finalNote:
      'El resultado de esta final NO consagra al campeón de la boda: solo otorga media plaza para el Trofeo de Campeones posterior en Santiago del Estero.',
    standingsGroups: [
      { name: 'La Novia (Tabla Anual Acumulada)', status: 'campeon_liga', badge: 'CAMPEONA DE LIGA 18:30' },
      { name: 'Amigos del Organizador (Mesa VIP)', status: 'inmune_amigos', badge: 'BYE DIRECTO' },
      { name: 'Familia de la Novia — Zona A', status: 'zona_clasificacion' },
      { name: 'Familia del Novio — Zona B', status: 'zona_clasificacion' },
      { name: 'Compañeros de Trabajo (Ampliación 800+)', status: 'zona_clasificacion' },
      { name: 'Primos que confirmaron el jueves', status: 'descenso_anulado' },
      { name: 'Tíos con regalo pendiente de acreditación', status: 'descenso_anulado' },
    ],
    baseTimeline: [
      {
        time: '15:00',
        title: 'ACREDITACIÓN BIOMÉTRICA EN 2 ZONAS',
        description: 'LA NOVIA INGRESA POR ZONA A Y EL NOVIO POR ZONA B SIN CONTACTO VISUAL',
        icon: 'anillos',
      },
      {
        time: '16:00',
        title: 'FECHA DE CLÁSICOS E INTERZONAL',
        description: 'SUEGRA VS. SUEGRA EN RECEPCIÓN Y CRUCE SORTEADO DJ VS. ABUELA',
        icon: 'silbato',
      },
      {
        time: '17:15',
        title: 'ARRIBO ZONA CAMPEONES DEL MUNDO ★',
        description: 'INGRESO EXCLUSIVO DE PAREDES Y DI MARÍA A MESA ESTRELLA SIN NUMERACIÓN',
        icon: 'estrella',
        highlightType: 'vip_campeones',
      },
      {
        time: '18:30',
        title: 'ENTREGA CAMPEONA DE LIGA (EN CURSO)',
        description: 'LA NOVIA RECIBE TÍTULO ANUAL ACUMULADO ANTES DE LA CEREMONIA CENTRAL',
        icon: 'trofeo',
        highlightType: 'titulo_mitad',
      },
      {
        time: '19:40',
        title: 'SÍ QUIERO ADENTRO DE LA COMBI OFICIAL',
        description: 'FIRMA DE LIBRETA, ANILLOS Y CENA CALIENTE EXCLUSIVA EN COMBI POLARIZADA',
        icon: 'combi',
        highlightType: 'combi',
      },
      {
        time: '20:45',
        title: 'OCTAVOS DE FINAL DEL VALS',
        description: 'ELIMINACIÓN DIRECTA A PARTIDO ÚNICO EN CANCHA NEUTRAL ALFOMBRADA',
        icon: 'copas',
      },
      {
        time: '21:30',
        title: 'TIRADA DEL RAMO POR PENALES',
        description: 'SERIE DE 5 EJECUCIONES CON REVISIÓN DEL TRIBUNAL DESDE LA COMBI',
        icon: 'camara',
      },
      {
        time: '22:15',
        title: 'MESA DULCE CLASIFICATORIA',
        description: 'AMIGOS DEL ORGANIZADOR INGRESAN SIN FILA; ANULACIÓN DE DESCENSOS',
        icon: 'torta',
      },
      {
        time: '23:00',
        title: 'SHOW DE DRONES REGLAMENTARIO',
        description: 'CIERRE OBLIGATORIO DE 400 DRONES SOBRE EL MADRE DE CIUDADES',
        icon: 'dron',
        highlightType: 'drones',
      },
    ],
    realChecklistTasks: [
      'Confirmar prueba de vestuario y alianzas',
      'Definir menú para celíacos y vegetarianos',
      'Coordinar lista de temas prohibidos y permitidos',
      'Enviar recordatorio de etiqueta formal',
    ],
    institutionalChecklistTasks: [
      'Ampliar padrón de 120 a más de 800 invitados "para poner gente en vidriera"',
      'Reservar Estadio Único Madre de Ciudades (Santiago del Estero)',
      'Plotear la Combi Oficial donde ocurrirá toda la ceremonia real',
      'Sortear el cruce interzonal entre proveedores y parientes lejanos',
      'Homologar lote mayorista de secanucas para ambas zonas',
      'Redactar acta que consagra a la Novia Campeona de Liga a las 18:30',
      'Anular por decreto los descensos de invitados por bajo promedio',
      'Programar secuencia aérea del Show de Drones obligatorio',
    ],
  },

  cumpleanos: {
    eventType: 'cumpleanos',
    cardTitle: 'Cumpleaños sorpresa',
    cardSubtitle: 'Sorpresa anunciada por boletín oficial con homenajeado en fase de repechaje',
    cardIcon: 'torta',
    institutionalTitle: 'Campeonato Oficial de Natalicio Sorpresa — Copa Boletín Anticipado',
    hostsPool: ['Martín (Cumpleañero)', 'Luciana (Homenajeada)', 'Fede (Categoría Libre)', 'Caro (Cabeza de Serie)'],
    droneInitialsPool: ['FELIZ', 'CUMPLE', 'SORPRESA', '★ 30 ★'],
    baseGuests: 24,
    minInflatedGuests: 280,
    maxInflatedGuests: 560,
    zoneAName: 'ZONA A — ESCONDIDOS DETRÁS DEL SILLÓN',
    zoneASubtitle: 'Parcialidad Oculta Norte (Cantan en tonalidad Fa Mayor)',
    zoneASubgroups: [
      'Amigos de la Infancia Agachados',
      'Primos detrás de la Cortina Blackout',
      'Vecinos del Consorcio Convocados por Vidriera',
      'Grupo del Gimnasio (Sin conexión acústica con Zona B)',
    ],
    zoneBName: 'ZONA B — ESCONDIDOS EN COCINA Y PASILLO',
    zoneBSubtitle: 'Parcialidad Oculta Sur (Cantan con 4 segundos de delay)',
    zoneBSubgroups: [
      'El Homenajeado/a (Debe superar Playoffs para entrar)',
      'Compañeros de Facultad en oscuridad total',
      'Familiares con Bonetes Numerados',
      'Conocidos de Redes Sociales Agregados al Padrón',
    ],
    classicMatchupsPool: [
      'Tía que prende la luz antes de tiempo vs. Amigo que grita "¡Shhh!" hace 40 minutos',
      'Escondidos del Balcón (Zona A) vs. Escondidos bajo la Mesa (Zona B)',
      'Portador de la Torta Helada vs. Encargado de encontrar el encendedor',
    ],
    interzonalMatchupsPool: [
      'Repartidor de Empanadas vs. Hermano Mayor Escondido en el Lavadero',
      'Animador de Magia Close-Up vs. El Perro de la Casa (Neutralizado)',
      'Vecino del 4° B que vino a quejarse (incorporado a Zona A) vs. Prima con bengala',
      'Encargado de la Piñata Adulta vs. Cuñado en videollamada desde el exterior',
    ],
    phaseNamesPool: [
      'Repechaje de Ingreso con Ojos Vendados',
      'Fase Acústica Desincronizada de Feliz Cumpleaños',
      'Octogonal de Piñata Reglamentaria',
      'Reducido Pre-Velitas a Oscuras',
    ],
    combiManifesto:
      'Siguiendo directivas del Comité Ejecutivo, todo lo importante del cumpleaños sorpresa sucede adentro de una Combi Oficial estacionada en doble fila: allí se notifica oficialmente la sorpresa, se soplan las tres velitas homologadas y los Amigos del Organizador degustan la primera porción de chocotorta.',
    combiDecisiveMoments: [
      'Lectura del Comunicado Oficial N° 912 revelando la sorpresa al homenajeado 48 hs antes',
      'Partido desempate del Homenajeado en el asiento trasero de la combi para ganar derecho de admisión a su propio festejo',
      'Soplado de velita reglamentaria con anemómetro oficial libre de corrientes de aire',
    ],
    amigosPrivilege:
      'Comen torta directamente en la Combi Oficial sin esconderse, sin agacharse y sin disputar las eliminatorias previas.',
    ligaChampionMidEventPool: [
      {
        holder: 'Coordinador del Grupo de WhatsApp "NO DIGAN NADA"',
        minuteAwarded: '20:10 HS (antes de que llegue el cumpleañero)',
        explanation:
          'Consagrado "Campeón de Liga de Organización Sorpresiva" por tabla anual acumulada mientras las luces siguen apagadas.',
      },
      {
        holder: 'Mesa Amigos del Organizador',
        minuteAwarded: '20:20 HS (en plena oscuridad)',
        explanation:
          'Adjudicatarios del Trofeo Regularidad Gastronómica habiendo comido torta antes del grito de "¡Sorpresa!".',
      },
    ],
    externalCupsPool: [
      {
        cupName: 'SUPERCOPA DE LA TORTA',
        cupSubtitle: 'Finalísima en fecha neutral entre los dos campeones parciales',
        participants: [
          'Ganador del Soplado de Velitas (Combi Oficial)',
          'Ganador del "Que los cumplas feliz" (Zona A vs Zona B sin escucharse)',
          'Campeón de Liga del Grupo de WhatsApp',
          'Paredes & Di María (Clasificados de Oficio)',
        ],
      },
      {
        cupName: 'TROFEO DE CAMPEONES DE COTILLÓN',
        cupSubtitle: 'Definición post-festejo en el Madre de Ciudades',
        participants: [
          'Ganador de la Piñata Reglamentaria',
          'Homenajeado (si supera el Repechaje)',
          'Amigos del Organizador (Comieron torta sin jugar)',
          'Zona Campeones del Mundo ★',
        ],
      },
    ],
    octavosSlotsPool: [
      ['Homenajeado/a (Pre-Clasificación)', 'Guardia de Acceso del Estacionamiento', 'Repechaje obligatorio para entrar'],
      ['Coro "Feliz Cumpleaños" Zona A', 'Coro "Feliz Cumpleaños" Zona B', 'No se escuchan entre sí'],
      ['Repartidor de Empanadas', 'Tía con Bengala Chispera (Interzonal)', 'Definición por gol de oro'],
      ['Amigos del Organizador', 'LIBRE (COMEN TORTA DIRECTO)', 'Exentos de agacharse'],
    ],
    finalContenderAPool: ['Ganador de las Velitas', 'Ganador del Canto en Dos Zonas'],
    finalContenderBPool: ['Zona Campeones del Mundo (Paredes & Di María)', 'Amigos del Organizador (Con porción doble)'],
    finalNote:
      'El cumpleañero no se consagra en esta jornada: el título real se dirime en la Supercopa de la Torta en Santiago del Estero.',
    standingsGroups: [
      { name: 'Admin del Grupo WhatsApp (Tabla Anual)', status: 'campeon_liga', badge: 'CAMPEÓN ANUAL 20:10' },
      { name: 'Amigos del Organizador (Torta Directa)', status: 'inmune_amigos', badge: 'SIN JUGAR' },
      { name: 'Escondidos Detrás del Sillón — Zona A', status: 'zona_clasificacion' },
      { name: 'Escondidos en Cocina — Zona B', status: 'zona_clasificacion' },
      { name: 'Homenajeado/a (Vía Repechaje)', status: 'zona_clasificacion' },
      { name: 'Invitados que mandaron audio preguntando la hora', status: 'descenso_anulado' },
      { name: 'Primos que spoilearon en historias', status: 'descenso_anulado' },
    ],
    baseTimeline: [
      {
        time: '18:00',
        title: 'COMUNICADO ANUNCIANDO LA SORPRESA',
        description: 'SE PUBLICA EN BOLETÍN OFICIAL POR RAZONES DE ORGANIZACIÓN Y SEGURIDAD',
        icon: 'selloOficial',
      },
      {
        time: '19:15',
        title: 'OCULTAMIENTO EN ZONA A Y ZONA B',
        description: '280+ INVITADOS AGACHADOS EN DOS SECTORES ESTANCOS SIN CONTACTO AUDITIVO',
        icon: 'tribuna',
      },
      {
        time: '19:45',
        title: 'INGRESO ZONA CAMPEONES DEL MUNDO ★',
        description: 'PAREDES Y DI MARÍA ESPERAN SENTADOS EN SILLÓN ESTRELLA CON LUZ PROPIA',
        icon: 'estrella',
        highlightType: 'vip_campeones',
      },
      {
        time: '20:10',
        title: 'CAMPEÓN DE LIGA EN PLENA OSCURIDAD',
        description: 'SE ENTREGA TÍTULO ANUAL AL ADMIN DEL GRUPO ANTES DE QUE LLEGUE EL HOMENAJEADO',
        icon: 'trofeo',
        highlightType: 'titulo_mitad',
      },
      {
        time: '20:30',
        title: 'PLAYOFF DEL CUMPLAÑERO EN LA COMBI',
        description: 'EL HOMENAJEADO DISPUTA SU INGRESO Y SOPLA LAS VELITAS ADENTRO DE LA COMBI',
        icon: 'combi',
        highlightType: 'combi',
      },
      {
        time: '21:15',
        title: 'INTERZONAL Y CLÁSICO DE ESCONDIDOS',
        description: 'DELIVERY VS. HERMANO MAYOR; AMIGOS DEL ORGANIZADOR YA COMEN TORTA',
        icon: 'silbato',
      },
      {
        time: '22:00',
        title: 'CANTO SIMULTÁNEO DESINCRONIZADO',
        description: 'ZONA A Y ZONA B CANTAN EN DISTINTO COMPÁS CLASIFICANDO A LA SUPERCOPA',
        icon: 'torta',
      },
      {
        time: '22:30',
        title: 'APERTURA DE REGALOS CON VAR',
        description: 'HOMOLOGACIÓN DE TICKETS DE CAMBIO Y ANULACIÓN DE DESCENSOS POR PROMEDIO',
        icon: 'regalo',
      },
      {
        time: '23:15',
        title: 'SHOW DE DRONES REGLAMENTARIO',
        description: 'FIGURAS LUMINOSAS SOBRE SANTIAGO DEL ESTERO EN HOMENAJE AL FORMATO',
        icon: 'dron',
        highlightType: 'drones',
      },
    ],
    realChecklistTasks: [
      'Encargar torta principal y velitas',
      'Crear grupo silencioso con coartada creíble',
      'Comprar bebidas, hielo y servilletas',
      'Sincronizar horario de llegada del homenajeado',
    ],
    institutionalChecklistTasks: [
      'Publicar Comunicado Oficial avisando la sorpresa 24 hs antes "por organización"',
      'Ampliar living a Estadio Madre de Ciudades (Santiago del Estero) para 300+ personas',
      'Acondicionar la Combi Oficial para el playoff de acceso del cumpleañero',
      'Adquirir dotación industrial de secanucas para los escondidos agachados',
      'Separar acústicamente las dos zonas para el "Que los cumplas feliz"',
      'Servir torta anticipada a los Amigos del Organizador sin transpirar',
      'Dejar sin efecto los descensos de quienes faltaron los últimos 3 cumpleaños',
      'Autorizar plan de vuelo del Show de Drones de cierre',
    ],
  },

  cena: {
    eventType: 'cena',
    cardTitle: 'Cena',
    cardSubtitle: 'Comida íntima de 8 ampliada a 30+ en dos mesas con postre por penales',
    cardIcon: 'platoCubiertos',
    institutionalTitle: 'Torneo Clausura Gastronómico — Cena Oficial de Dos Zonas',
    hostsPool: ['Mesa de los Jueves', 'Cena Anual de Amigos', 'Asado / Cena Comité', 'Noche Gourmet Federal'],
    droneInitialsPool: ['CENA', 'MESA ★', 'SALUD', 'SOBREMESA'],
    baseGuests: 8,
    minInflatedGuests: 30,
    maxInflatedGuests: 46,
    zoneAName: 'ZONA A — MESA LARGA NORTE',
    zoneASubtitle: '15+ Comensales Titulares (Punto de cocción: Jugoso Reglamentario)',
    zoneASubgroups: [
      'Anfitrión Local (Asignado a punta izquierda Zona A)',
      'Defensores de dividir la cuenta en partes iguales',
      'Comensales incorporados para poner invitados en vidriera',
      'Suplentes con derecho a panera únicamente',
    ],
    zoneBName: 'ZONA B — MESA LARGA SUR',
    zoneBSubtitle: '15+ Comensales Visitantes (Punto de cocción: Bien Cocido Homologado)',
    zoneBSubgroups: [
      'Co-Anfitrión (Sorteado en punta opuesta Zona B)',
      'Auditores del ticket ítem por ítem ("yo solo tomé agua")',
      'Amigos de amigos convocados por decreto de ampliación',
      'Delegación de observadores de sobremesa',
    ],
    classicMatchupsPool: [
      'Partidarios de "Dividimos todo parejo" (Zona A) vs. "Cada uno paga lo que consumió" (Zona B)',
      'Catador de Vino Malbec vs. Defensor de la Soda en Sifón',
      'Punta fría de la mesa vs. Sector pegado a la parrilla / horno',
    ],
    interzonalMatchupsPool: [
      'El Mozo de Turno vs. Invitado que pide cambiar guarnición tres veces',
      'Panera de Masa Madre (Zona A) vs. Tabla de Fiambres Visitante (Zona B)',
      'Sommelier Amateur vs. Primo que le pone hielo al tinto reserva',
      'Encargado del Café Cortado vs. Comensal que se levantó al baño al llegar la cuenta',
    ],
    phaseNamesPool: [
      'Entrada Interzonal Cruzada',
      'Fase de Grupos de Plato Principal',
      'Definición por Penales del Flan Mixto',
      'Sobremesa Extendida en Cancha Neutral',
    ],
    combiManifesto:
      'A fin de resguardar la transparencia culinaria, todo lo importante de la cena transcurre adentro de una Combi Oficial con mesa rebatible en marcha lenta: el descorche estelar, el corte del plato principal, el arqueo de propina y la sobremesa ejecutiva.',
    combiDecisiveMoments: [
      'Degustación vinculante de la salsa y salado oficial dentro de la combi antes de servir a las zonas',
      'Liquidación del prorrateo de cuenta mediante coeficiente de promedios de las últimas 3 cenas',
      'Café y digestivo exclusivo de autoridades mientras el resto aguarda el sorteo del postre',
    ],
    amigosPrivilege:
      'Ubicación central cerca de la fuente caliente, panera ilimitada, exención de lavar platos y cuenta bonificada por tabla histórica.',
    ligaChampionMidEventPool: [
      {
        holder: 'El que reservó originalmente para 8 personas',
        minuteAwarded: '21:40 HS (entre la entrada y el principal)',
        explanation:
          'Proclamado "Campeón de Liga Gastronómica" por Tabla Anual Acumulada mientras todavía no trajeron las guarniciones.',
      },
      {
        holder: 'Sector Amigos del Organizador',
        minuteAwarded: '21:50 HS (pleno primer plato)',
        explanation:
          'Ganadores de oficio del Torneo Anual de Panera y Dip antes del entretiempo.',
      },
    ],
    externalCupsPool: [
      {
        cupName: 'CENA DE CAMPEONES (SUPERCOPA DE SOBREMESA)',
        cupSubtitle: 'Banquete definitorio un miércoles hábil en Santiago del Estero',
        participants: [
          'Ganador del Plato Principal (Fase de Grupos)',
          'Ganador del Postre (Definición por Penales)',
          'Campeón de Liga de las 21:40 HS',
          'Paredes & Di María (Mesa Estrella ★)',
        ],
      },
      {
        cupName: 'TROFEO INTERNACIONAL DEL DESCORCHE',
        cupSubtitle: 'Instancia final neutral post-digestivo',
        participants: [
          'Vencedor de la Entrada Interzonal',
          'Invicto de la Sobremesa Neutral',
          'Amigos del Organizador (Bye Culinario)',
          'Zona Campeones del Mundo ★',
        ],
      },
    ],
    octavosSlotsPool: [
      ['1° Plato Principal Zona A', '4° Guarnición Zona B', 'Cocción neutral reglamentaria'],
      ['Flan con Dulce de Leche', 'Volcán de Chocolate', 'Postre definido por penales'],
      ['El Mozo Titular', 'Comensal "Solo tomé agua" (Interzonal)', 'Revisión de comanda en la combi'],
      ['Amigos del Organizador', 'LIBRE (POSTRE ASEGURADO)', 'Clasifican sin pagar cubierto'],
    ],
    finalContenderAPool: ['Ganador Fase de Grupos Principal', 'Vencedor Penales del Postre'],
    finalContenderBPool: ['Zona Campeones del Mundo (Paredes & Di María)', 'Amigos del Organizador (Invictos)'],
    finalNote:
      'Nadie gana la cena esta noche: el campeón gastronómico se consagra recién en la "Cena de Campeones" posterior.',
    standingsGroups: [
      { name: 'Autor de la Reserva Inicial (Tabla Anual)', status: 'campeon_liga', badge: 'CAMPEÓN DE LIGA 21:40' },
      { name: 'Amigos del Organizador (Cubierto VIP)', status: 'inmune_amigos', badge: 'BYE CULINARIO' },
      { name: 'Mesa Larga Norte — Zona A (15+)', status: 'zona_clasificacion' },
      { name: 'Mesa Larga Sur — Zona B (15+)', status: 'zona_clasificacion' },
      { name: 'Agregados por Ampliación de Padrón', status: 'zona_clasificacion' },
      { name: 'Los que dicen "después te transfiero"', status: 'descenso_anulado' },
      { name: 'Ausentes sin aviso en las últimas 3 cenas', status: 'descenso_anulado' },
    ],
    baseTimeline: [
      {
        time: '20:00',
        title: 'AMPLIACIÓN DE RESERVA DE 8 A 30+',
        description: 'DIVISIÓN EN DOS MESAS LARGAS (ZONA A Y ZONA B) EN EL MADRE DE CIUDADES',
        icon: 'platoCubiertos',
      },
      {
        time: '20:35',
        title: 'ENTRADA INTERZONAL POR SORTEO',
        description: 'CRUCE DE PICADAS ENTRE PUNTAS OPUESTAS Y CLÁSICO POR LA DIVISIÓN DEL TICKET',
        icon: 'silbato',
      },
      {
        time: '21:05',
        title: 'UBICACIÓN ZONA CAMPEONES DEL MUNDO ★',
        description: 'PAREDES Y DI MARÍA CENAN EN MESA ESTRELLA CON CARTA PROPIA Y PASE A LA FINAL',
        icon: 'estrella',
        highlightType: 'vip_campeones',
      },
      {
        time: '21:40',
        title: 'TÍTULO DE CAMPEÓN DE LIGA EN MESA',
        description: 'SE ENTREGA COPA POR TABLA ANUAL ANTES DE QUE SALGA EL PLATO PRINCIPAL',
        icon: 'trofeo',
        highlightType: 'titulo_mitad',
      },
      {
        time: '22:10',
        title: 'DESCORCHE Y CORTE EN COMBI OFICIAL',
        description: 'TODA DECISIÓN GASTRONÓMICA, PUNTO DE CARNE Y CUENTA PASA EN LA COMBI',
        icon: 'combi',
        highlightType: 'combi',
      },
      {
        time: '22:45',
        title: 'PLATO PRINCIPAL EN FASE DE GRUPOS',
        description: 'ACUMULACIÓN DE PUNTOS POR GUARNICIÓN CON VENTAJA DEPORTIVA PARA AMIGOS',
        icon: 'copas',
      },
      {
        time: '23:15',
        title: 'DEFINICIÓN DEL POSTRE POR PENALES',
        description: 'TANDA DE CINCO CUCHARADAS DESDE EL PUNTO REGLAMENTARIO',
        icon: 'torta',
      },
      {
        time: '23:40',
        title: 'SOBREMESA EN CANCHA NEUTRAL',
        description: 'ANULACIÓN DE DESCENSOS DE DEUDORES Y PASE A LA CENA DE CAMPEONES',
        icon: 'globoEspejos',
      },
      {
        time: '00:10',
        title: 'SHOW DE DRONES REGLAMENTARIO',
        description: 'CIERRE NOCTURNO OBLIGATORIO CON 400 DRONES FORMANDO LA COPA Y SDE',
        icon: 'dron',
        highlightType: 'drones',
      },
    ],
    realChecklistTasks: [
      'Confirmar cantidad de comensales y restricciones',
      'Elegir vino, bebidas sin alcohol y entradas',
      'Reservar mesa en horario puntual',
      'Organizar quién lleva el postre o helado',
    ],
    institutionalChecklistTasks: [
      'Ampliar la cena de 8 a 30+ participantes (dos mesas de 15+) para federalizar la mesa',
      'Trasladar la localía al Estadio Único Madre de Ciudades, Santiago del Estero',
      'Estacionar la Combi Oficial donde se definirá el menú, descorche y división de gastos',
      'Comprar partida extraordinaria de secanucas por vapor de fuentes calientes',
      'Sortear la Entrada Interzonal y designar árbitro para los penales del postre',
      'Otorgar título de Campeón de Liga a mitad del primer plato',
      'Anular los descensos de quienes deben transferencias desde 2024',
      'Contratar Show de Drones obligatorio para después del café',
    ],
  },
};
