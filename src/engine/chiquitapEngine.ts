import { EVENT_CONTENT } from '../content/events';
import { createSeededRandom } from './seed';
import type {
  BracketData,
  BudgetData,
  ChiquiTapPlan,
  CommitteeMemberNode,
  CountdownMonthBlock,
  DroneFormation,
  EventType,
  MutationType,
  OrganizacionMode,
  RouteData,
  RuleChangeResolution,
  StandingsData,
  TimelineMilestone,
  UserAnswers,
  ZonesData,
} from './types';

export interface GeneratePlanInput {
  eventType: EventType;
  mode: OrganizacionMode;
  answers: UserAnswers;
  seed: number;
  formatNumber: number;
  appliedMutations?: MutationType[];
}

const OFFICIAL_VENUE = 'Estadio Único Madre de Ciudades, Santiago del Estero';

const DATES_POOL = [
  'SÁBADO 14 DE NOVIEMBRE — JORNADA ÚNICA + REPESCA',
  'VIERNES 27 DE NOVIEMBRE — HORARIO SUJETO A TV Y COMITÉ',
  'DOMINGO 6 DE DICIEMBRE — FECHA INTERZONAL CLAUSURA',
  'MIÉRCOLES 18 DE NOVIEMBRE — REPROGRAMADO 19:15 HS',
] as const;

const COMBI_STOPOVERS = [
  'Peaje Fernández (Ruta Nac. 34) — Control de Secanucas y Sorteo de Mesas en Combi',
  'Parador Pinto (Santiago del Estero) — Revisión VAR y Firma de Actas en Combi Oficial',
  'Acceso Norte Termas — Trasbordo a Combi Polarizada del Comité Ejecutivo',
] as const;

export function generateChiquiTapPlan(input: GeneratePlanInput): ChiquiTapPlan {
  const {
    eventType,
    mode,
    answers,
    seed,
    formatNumber,
    appliedMutations = [],
  } = input;

  const rng = createSeededRandom(seed);
  const template = EVENT_CONTENT[eventType];

  const hasZoneMutation = appliedMutations.includes('reconfigurar_zonas');
  const hasSupercopaMutation = appliedMutations.includes('agregar_supercopa');
  const hasSecanucasMutation = appliedMutations.includes('refuerzo_secanucas_combi');

  // Irony: "Simple" mode generates MORE bureaucratic annexes and higher upper-tier inflation
  const anexosCount = mode === 'simple' ? rng.int(21, 29) : rng.int(12, 18);
  const expedienteNum = rng.int(1400, 8999);
  const expedienteCode =
    mode === 'simple'
      ? `EXP. ${expedienteNum}/26 — MODALIDAD "SIMPLE" (${anexosCount} ANEXOS Y DOBLE REPECHAJE)`
      : `EXP. ${expedienteNum}/26 — RÉGIMEN PERSONALIZADO (${anexosCount} ANEXOS HOMOLOGADOS)`;

  const hostIndex = rng.int(0, template.hostsPool.length - 1);
  const hostsScriptTitle = template.hostsPool[hostIndex];
  const droneHostWord = template.droneInitialsPool[hostIndex] ?? '★ VIP ★';
  const eventDateCaption = rng.pick(DATES_POOL);

  // Rule 4: Inflación de participantes (always EVEN)
  let inflatedGuests: number;
  if (eventType === 'cena' && formatNumber === 1 && mode === 'personalizada') {
    inflatedGuests = 30; // Classic 8 -> 30 (two tables of 15)
  } else if (mode === 'simple') {
    // Simple mode ironically inflates toward the top end
    const mid = Math.floor((template.minInflatedGuests + template.maxInflatedGuests) / 2);
    inflatedGuests = rng.evenInt(mid, template.maxInflatedGuests);
  } else {
    inflatedGuests = rng.evenInt(template.minInflatedGuests, template.maxInflatedGuests);
  }

  const perZoneGuests = inflatedGuests / 2;
  const tablesPerZone =
    eventType === 'cena'
      ? `1 Mesa Larga de ${perZoneGuests} cubiertos`
      : `${Math.max(2, Math.round(perZoneGuests / 10))} Mesas Numeradas`;

  const inflationJustification =
    mode === 'simple'
      ? `Ampliado de ${template.baseGuests} a ${inflatedGuests} participantes bajo "Formato Simple Unificado" para poner en vidriera a más invitados y garantizar cupos del interior.`
      : `Ampliado de ${template.baseGuests} a ${inflatedGuests} participantes por decisión unánime del Comité Ejecutivo "para poner en vidriera a más invitados".`;

  // Rule 2, 3, 7, 8, Combi: Zonas + Campeones del Mundo + Amigos + Combi
  const phaseTitle = rng.pick(template.phaseNamesPool);
  const classicMatchup = rng.pick(template.classicMatchupsPool);
  const interzonalMatchup = rng.pick(template.interzonalMatchupsPool);
  const amigosCount = eventType === 'cena' ? 6 : rng.evenInt(12, 24);

  const zoneASubgroups = hasZoneMutation
    ? [
        ...template.zoneASubgroups.slice(0, 2),
        'Transferidos de Zona B por Resolución en Curso',
        template.zoneBSubgroups[2],
      ]
    : [...template.zoneASubgroups];

  const zoneBSubgroups = hasZoneMutation
    ? [
        ...template.zoneBSubgroups.slice(0, 2),
        'Reubicados de Zona A con Promedio Protegido',
        template.zoneASubgroups[2],
      ]
    : [...template.zoneBSubgroups];

  const zones: ZonesData = {
    phaseTitle: hasZoneMutation
      ? `${phaseTitle} — ZONAS CRUZADAS UNIFICADAS (MODIFICADO)`
      : phaseTitle,
    zoneA: {
      code: 'A',
      name: hasZoneMutation ? `${template.zoneAName} (RECONFIGURADA)` : template.zoneAName,
      subtitle: template.zoneASubtitle,
      participantsCount: perZoneGuests,
      tablesLabel: tablesPerZone,
      subgroups: zoneASubgroups,
    },
    zoneB: {
      code: 'B',
      name: hasZoneMutation ? `${template.zoneBName} (RECONFIGURADA)` : template.zoneBName,
      subtitle: template.zoneBSubtitle,
      participantsCount: perZoneGuests,
      tablesLabel: tablesPerZone,
      subgroups: zoneBSubgroups,
    },
    campeonesDelMundo: {
      title: 'ZONA CAMPEONES DEL MUNDO ★',
      guests: ['Leandro Paredes', 'Ángel Di María'],
      tableName: 'MESA ★ (SIN NÚMERO — UBICACIÓN PREFERENCIAL)',
      privilegeText:
        'Exentos de Fase de Grupos, exentos de Interzonal, ingreso directo a la Finalísima y menú servido sin espera.',
    },
    amigosDelOrganizador: {
      title: 'SECTOR AMIGOS DEL ORGANIZADOR',
      guestsCount: amigosCount,
      privilegeText: template.amigosPrivilege,
    },
    combiOficial: {
      title: 'COMBI OFICIAL POLARIZADA (DONDE PASA TODO LO IMPORTANTE)',
      vehicleSpec: 'Unidad Blanca Homologada — Estacionada en acceso túnel Madre de Ciudades',
      decisiveEvents: [...template.combiDecisiveMoments],
    },
    fechaClasicos: {
      label: `FECHA ${rng.int(4, 6)} — CLÁSICOS INTER-MESAS`,
      matchup: classicMatchup,
    },
    fechaInterzonal: {
      label: `FECHA ${rng.int(7, 9)} — INTERZONAL POR SORTEO`,
      matchup: hasZoneMutation
        ? `DOBLE INTERZONAL ACUMULADO: ${interzonalMatchup}`
        : interzonalMatchup,
    },
    isModifiedByResolution: hasZoneMutation,
    modificationNote: hasZoneMutation
      ? 'Por resolución emitida durante la lectura del presente dossier, se fusionaron parcialmente ambas zonas manteniendo la división en dos tablas.'
      : undefined,
  };

  // Rule 5: Campeón de Liga a mitad + Campeón real en otro torneo
  const ligaChampionMidEvent = rng.pick(template.ligaChampionMidEventPool);
  const selectedExternalCup = rng.pick(template.externalCupsPool);

  const octavosShuffled = rng.shuffle(template.octavosSlotsPool);
  const bracket: BracketData = {
    octavos: octavosShuffled.map((tuple, idx) => ({
      id: `oct-${idx + 1}`,
      stageCode: `LLAVE ${idx + 1}`,
      slotA: tuple[0],
      slotB: tuple[1],
      conditionNote: tuple[2],
      isVipOrBye: tuple[1].includes('LIBRE'),
    })),
    semifinales: [
      {
        id: 'semi-1',
        stageCode: 'SEMIFINAL 1 (EN COMBI)',
        slotA: `Ganador Llave 1 / Interzonal`,
        slotB: 'Amigos del Organizador (Bye Directo)',
        conditionNote: 'Se disputa adentro de la Combi Oficial sin público visitante',
        isVipOrBye: true,
      },
      {
        id: 'semi-2',
        stageCode: 'PASE DIRECTO ★',
        slotA: 'Paredes & Di María (Zona ★)',
        slotB: 'Ganador Penales Llave 2',
        conditionNote: 'Ventaja deportiva reglamentaria para Campeones del Mundo',
        isVipOrBye: true,
      },
    ],
    finalDelEvento: {
      title: 'FINAL DEL EVENTO (NO OTORGA TÍTULO DEFINITIVO)',
      contenderA: rng.pick(template.finalContenderAPool),
      contenderB: 'Paredes, Di María & Amigos del Organizador',
      resolutionNote: template.finalNote,
    },
    externalTournament: {
      cupName: selectedExternalCup.cupName,
      cupSubtitle: selectedExternalCup.cupSubtitle,
      participants: [...selectedExternalCup.participants],
      venue: OFFICIAL_VENUE,
      extraInstance: hasSupercopaMutation
        ? 'NUEVA INSTANCIA AGREGADA: Supercopa Internacional de la Combi (entre el perdedor de la Final y un invitado designado a dedo en Santiago del Estero).'
        : undefined,
    },
    isModifiedByResolution: hasSupercopaMutation,
  };

  // Rule 1, 8, 10, Combi: Timeline
  const timeline: TimelineMilestone[] = template.baseTimeline.map((item, idx) => ({
    id: `ms-${idx + 1}`,
    fechaCode: `HITO ${idx + 1}`,
    time: item.time,
    title: item.title,
    description: item.description,
    icon: item.icon,
    highlightType: item.highlightType,
  }));

  if (mode === 'simple') {
    // Simple mode ironically inserts a 10th bureaucratic milestone
    timeline.splice(4, 0, {
      id: 'ms-simple-extra',
      fechaCode: 'ANEXO SIMPLE',
      time: '19:05',
      title: 'SORTEO DE SUB-ZONAS EN LA COMBI',
      description: 'POR ELEGIR "ORGANIZACIÓN SIMPLE" SE AGREGA UN REPECHAJE INTERMEDIO OBLIGATORIO',
      icon: 'combi',
      highlightType: 'combi',
    });
  }

  if (hasZoneMutation) {
    timeline[1] = {
      ...timeline[1],
      title: `${timeline[1].title} (REPROGRAMADO)`,
      description: 'LAS ZONAS SE UNIFICAN Y DIVIDEN SIMULTÁNEAMENTE POR RESOLUCIÓN EN CURSO',
      highlightType: 'modificado',
    };
  }

  // Rule 11: Secanucas calculation + Budget
  const rawUserSecanucas = Math.max(0, Math.floor(answers.secanucasRequested || 2));
  const effectiveBase = Math.max(2, rawUserSecanucas);
  const perZoneFactor = effectiveBase * 2 * rng.int(180, 340); // ×2 por zona con coeficiente de humedad santiagueña
  const interzonalReserve = rng.evenInt(900, 1800);
  const combiEscort = rng.evenInt(420, 780);
  const committeeQuota = rng.evenInt(1400, 2600);
  const emergencyAddition = hasSecanucasMutation ? 1600 : 0;
  const totalHomologated =
    perZoneFactor + interzonalReserve + combiEscort + committeeQuota + emergencyAddition;

  const dronesPct = hasSecanucasMutation ? 44 : rng.int(44, 48);
  const secanucasPct = hasSecanucasMutation ? 45 : rng.int(37, 41);
  const combiPct = hasSecanucasMutation ? 6 : 9;
  const cateringPct = hasSecanucasMutation ? 3 : 4;
  const variosPct = Math.max(1, 100 - (dronesPct + secanucasPct + combiPct + cateringPct));

  const budget: BudgetData = {
    secanucas: {
      requestedByUser: rawUserSecanucas,
      perZoneFactor,
      interzonalReserve,
      combiEscort,
      committeeQuota,
      emergencyAddition,
      totalHomologated,
    },
    items: [
      {
        id: 'bud-drones',
        category: 'Show de Drones Nocturno Obligatorio (400 unidades)',
        percentage: dronesPct,
        detail: 'Coreografía aérea homologada sobre el Madre de Ciudades',
        isPrimaryHighlight: true,
      },
      {
        id: 'bud-secanucas',
        category: `Operativo Integral de Secanucas (${totalHomologated.toLocaleString('es-AR')} u.)`,
        percentage: secanucasPct,
        detail: '×2 por zona + reserva interzonal + dotación Combi + cupo Comité Ejecutivo',
        isPrimaryHighlight: true,
      },
      {
        id: 'bud-combi',
        category: 'Blindaje Acústico y Catering Interno de Combi Oficial',
        percentage: combiPct,
        detail: 'Unidad donde transcurren todas las decisiones e instancias reales',
        isPrimaryHighlight: false,
      },
      {
        id: 'bud-catering',
        category: `Comida y Bebida General (${inflatedGuests} invitados en 2 zonas)`,
        percentage: cateringPct,
        detail: 'Presupuesto simbólico ajustado tras priorizar drones y secanucas',
        isPrimaryHighlight: false,
      },
      {
        id: 'bud-sellos',
        category: 'Sellos de Goma, Bolillero y Timbrado de Resoluciones',
        percentage: variosPct,
        detail: 'Gastos administrativos de impresión de anexos',
        isPrimaryHighlight: false,
      },
    ],
    isModifiedByResolution: hasSecanucasMutation,
  };

  // Section 2: Countdown / Checklist (4 periods)
  const instTasks = rng.shuffle(template.institutionalChecklistTasks);
  const realTasks = rng.shuffle(template.realChecklistTasks);

  const countdown: CountdownMonthBlock[] = [
    {
      periodLabel: '12 A 6 MESES ANTES',
      anexoCode: 'FASE PRELIMINAR',
      tasks: [
        { id: 'ck-1', text: realTasks[0], checkedByDefault: true, isInstitutional: false },
        {
          id: 'ck-2',
          text: 'Reservar Estadio Único Madre de Ciudades (Santiago del Estero)',
          checkedByDefault: true,
          isInstitutional: true,
        },
        { id: 'ck-3', text: instTasks[0], checkedByDefault: true, isInstitutional: true },
        { id: 'ck-4', text: realTasks[1], checkedByDefault: false, isInstitutional: false },
      ],
    },
    {
      periodLabel: '3 A 2 MESES ANTES',
      anexoCode: 'CLAUSURA DE PADRÓN',
      tasks: [
        {
          id: 'ck-5',
          text: `Comprar ${totalHomologated.toLocaleString('es-AR')} secanucas de algodón peinado`,
          checkedByDefault: true,
          isInstitutional: true,
        },
        { id: 'ck-6', text: realTasks[2], checkedByDefault: true, isInstitutional: false },
        {
          id: 'ck-7',
          text: 'Sortear cruces del Interzonal con bolillero auditado',
          checkedByDefault: true,
          isInstitutional: true,
        },
        {
          id: 'ck-8',
          text: 'Acreditar Mesa ★ sin número para Paredes y Di María',
          checkedByDefault: true,
          isInstitutional: true,
        },
      ],
    },
    {
      periodLabel: 'LA SEMANA PREVIA',
      anexoCode: 'BOLETÍN OFICIAL',
      tasks: [
        {
          id: 'ck-9',
          text: 'Acondicionar la Combi Oficial donde pasará todo lo importante',
          checkedByDefault: true,
          isInstitutional: true,
        },
        { id: 'ck-10', text: realTasks[3], checkedByDefault: false, isInstitutional: false },
        {
          id: 'ck-11',
          text: 'Ensayar Show de Drones obligatorio (Copa, Estrella y SDE)',
          checkedByDefault: true,
          isInstitutional: true,
        },
        { id: 'ck-12', text: instTasks[1], checkedByDefault: false, isInstitutional: true },
      ],
    },
    {
      periodLabel: 'DURANTE EL EVENTO',
      anexoCode: 'SOBRE LA MARCHA',
      tasks: [
        {
          id: 'ck-13',
          text: `Entregar título de Campeón de Liga (${ligaChampionMidEvent.minuteAwarded})`,
          checkedByDefault: true,
          isInstitutional: true,
        },
        {
          id: 'ck-14',
          text: 'Anular descensos de invitados por esta única vez',
          checkedByDefault: true,
          isInstitutional: true,
        },
        {
          id: 'ck-15',
          text: 'Modificar el reglamento al menos dos veces antes del postre',
          checkedByDefault: true,
          isInstitutional: true,
        },
        {
          id: 'ck-16',
          text: `Programar ${selectedExternalCup.cupName} para definir al campeón real`,
          checkedByDefault: true,
          isInstitutional: true,
        },
      ],
    },
  ];

  // Rule 12: Tabla anual y promedios
  const standings: StandingsData = {
    tableTitle: 'TABLA ANUAL ACUMULADA Y PROMEDIOS DE ASISTENCIA (ÚLTIMAS 3 TEMPORADAS)',
    midEventChampionDeclaration: `${ligaChampionMidEvent.holder}: consagrado/a a las ${ligaChampionMidEvent.minuteAwarded}. ${ligaChampionMidEvent.explanation}`,
    rows: template.standingsGroups.map((group, idx) => {
      const pj = rng.int(14, 28);
      const basePts = Math.max(8, 64 - idx * rng.int(6, 9));
      const promValue =
        group.status === 'descenso_anulado'
          ? (0.72 + idx * 0.04).toFixed(3)
          : (2.38 - idx * 0.19).toFixed(3);
      return {
        pos: idx + 1,
        sectorName: group.name,
        pj,
        pts: basePts,
        promedio: promValue,
        badge: group.badge,
        status: group.status,
      };
    }),
    relegationFootnote:
      '(*) Por Resolución Extraordinaria aprobada en el entretiempo dentro de la Combi Oficial, quedan sin efecto los 2 descensos por promedio "por esta única vez", ampliándose el padrón para la próxima edición.',
  };

  // Rule 9: Sede siempre Santiago del Estero + Ruta
  const route: RouteData = {
    originLabel: 'Tu Ciudad (Localía Original Reprogramada)',
    destinationVenue: 'Estadio Único Madre de Ciudades',
    destinationCity: 'Santiago del Estero',
    distanceKm: rng.int(940, 1180),
    estimatedTime: 'No importa',
    combiStopover: rng.pick(COMBI_STOPOVERS),
    decreeNote:
      'Toda solicitud de realizar el evento a menos de 900 km fue rechazada por unanimidad para preservar el carácter federal y neutral del espectáculo.',
  };

  // Section 8: Organigrama del Comité Ejecutivo
  const committee: CommitteeMemberNode[] = [
    {
      id: 'com-1',
      role: 'PRESIDENCIA EJECUTIVA PLENIPOTENCIARIA',
      department: 'Mesa Directiva Central (Despacho Móvil en Combi Oficial)',
      resolutionVote: 'VOTO DOBLE UNÁNIME',
      tier: 'presidencia',
    },
    {
      id: 'com-2',
      role: 'SECRETARÍA GENERAL DE SECANUCAS E HIDRATACIÓN',
      department: ` Custodia de ${totalHomologated.toLocaleString('es-AR')} unidades homologadas`,
      resolutionVote: 'APROBADO',
      tier: 'secretaria',
    },
    {
      id: 'com-3',
      role: 'DIRECCIÓN DE ZONAS, INTERZONALES Y SORTEOS',
      department: 'Subdivisión de Parejas, Mesas y Clásicos',
      resolutionVote: 'APROBADO',
      tier: 'secretaria',
    },
    {
      id: 'com-4',
      role: 'SUBCOMISIÓN DE CAMPEONES DEL MUNDO ★',
      department: 'Atención Exclusiva Paredes, Di María y Amigos del Organizador',
      resolutionVote: 'APROBADO SIN OBJECIONES',
      tier: 'subcomision',
    },
    {
      id: 'com-5',
      role: 'TRIBUNAL DE DISCIPLINA Y ANULACIÓN DE DESCENSOS',
      department: 'Redacción de Copas Nuevas a Mitad del Evento',
      resolutionVote: 'APROBADO POR UNANIMIDAD',
      tier: 'subcomision',
    },
    {
      id: 'com-6',
      role: 'INTENDENCIA PERMANENTE SANTIAGO DEL ESTERO & DRONES',
      department: 'Coordinación Aeroespacial Madre de Ciudades',
      resolutionVote: 'APROBADO POR UNANIMIDAD',
      tier: 'subcomision',
    },
  ];

  // Section 9: Drone formations
  const droneFormations: DroneFormation[] = [
    {
      id: 'copa',
      label: 'Trofeo Oficial',
      caption: 'Figura 1/5 — Copa que se definirá en otro torneo',
    },
    {
      id: 'estrella',
      label: 'Estrella Dorada',
      caption: 'Figura 2/5 — Homenaje a Zona Campeones del Mundo (Mesa ★)',
    },
    {
      id: 'anfitriones',
      label: 'Anfitriones',
      textValue: droneHostWord,
      caption: `Figura 3/5 — ${hostsScriptTitle} (divididos en Zona A y Zona B)`,
    },
    {
      id: 'sde',
      label: 'Sede SDE',
      textValue: 'SDE',
      caption: 'Figura 4/5 — Sede Perpetua Santiago del Estero',
    },
    {
      id: 'corazon',
      label: 'Unanimidad',
      caption: 'Figura 5/5 — Aprobado por el Comité Ejecutivo desde la Combi',
    },
  ];

  // Rule 6: Scheduled mid-scroll Resolutions (2 to 3 official popups)
  const resBaseNum = rng.int(2400, 3900);
  const allResolutions: RuleChangeResolution[] = [
    {
      id: 'res-zonas',
      resolutionNumber: resBaseNum,
      boletinHeader: `BOLETÍN OFICIAL DE EMERGENCIA — EMITIDO DESDE LA COMBI`,
      title: `RESOLUCIÓN N° ${resBaseNum} — REESTRUCTURACIÓN EN VIVO DE ZONAS`,
      body: `Por decisión unánime del Comité Ejecutivo reunido en el asiento trasero de la Combi Oficial, se dispone unificar las Zonas A y B en una "Fase Cruzada de Dos Zonas Simultáneas" y duplicar el Interzonal por sorteo, sin alterar las mesas ya asignadas a los Amigos del Organizador.`,
      impactSummary: 'Se reordenan los grupos del Diagrama de Zonas y se actualiza el Timeline con sello FORMATO MODIFICADO.',
      mutation: 'reconfigurar_zonas',
      affectedSections: ['zonas', 'timeline'],
    },
    {
      id: 'res-supercopa',
      resolutionNumber: resBaseNum + 41,
      boletinHeader: `ANEXO REGLAMENTARIO SOBRE LA MARCHA`,
      title: `RESOLUCIÓN N° ${resBaseNum + 41} — CREACIÓN DE NUEVA SUPERCOPA`,
      body: `Por decisión unánime del Comité Ejecutivo, y en el marco del nuevo formato dinámico, se crea la "Supercopa Internacional de la Combi", a disputarse en Santiago del Estero entre el subcampeón del interzonal y un representante elegido por mérito institucional.`,
      impactSummary: 'Se incorpora una nueva llave externa al Fixture / Bracket con sello FORMATO MODIFICADO.',
      mutation: 'agregar_supercopa',
      affectedSections: ['bracket'],
    },
    {
      id: 'res-secanucas',
      resolutionNumber: resBaseNum + 89,
      boletinHeader: `ACTA EXTRAORDINARIA DE PRESUPUESTO Y LOCALÍA`,
      title: `RESOLUCIÓN N° ${resBaseNum + 89} — REFUERZO DE SECANUCAS Y RATIFICACIÓN SDE`,
      body: `Por decisión unánime del Comité Ejecutivo, ante la elevada exigencia térmica prevista en el Estadio Único Madre de Ciudades, se homologa una partida adicional de 1.600 secanucas de reserva para la Combi Oficial, reasignando fondos de comida y bebida general.`,
      impactSummary: 'Se incrementa el cupo de secanucas y se reajusta el Presupuesto con sello FORMATO MODIFICADO.',
      mutation: 'refuerzo_secanucas_combi',
      affectedSections: ['presupuesto'],
    },
  ];

  const scheduledResolutions = rng.shuffle(allResolutions);

  return {
    eventType,
    eventDisplayName: template.cardTitle,
    mode,
    seed,
    formatNumber,
    expedienteCode,
    anexosCount,
    hostsScriptTitle,
    eventDateCaption,
    venueOfficial: OFFICIAL_VENUE,
    baseGuests: template.baseGuests,
    inflatedGuests,
    inflationJustification,
    combiManifesto: template.combiManifesto,
    ligaChampionMidEvent,
    externalChampionSummary: {
      tournament: selectedExternalCup.cupName,
      explanation: `${selectedExternalCup.cupSubtitle} en ${OFFICIAL_VENUE}.`,
    },
    timeline,
    countdown,
    zones,
    bracket,
    standings,
    route,
    budget,
    committee,
    droneFormations,
    scheduledResolutions,
    appliedMutations,
  };
}
