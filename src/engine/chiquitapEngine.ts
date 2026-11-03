import { COPY } from '../content/copy';
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

  // Modalidad Simple ironically generates more annexes
  const anexosCount = mode === 'simple' ? rng.int(21, 29) : rng.int(12, 18);
  const expedienteNum = rng.int(1400, 8999);
  const expedienteCode = COPY.results.expedienteCode(expedienteNum, anexosCount, mode === 'simple');

  const hostIndex = rng.int(0, template.hostsPool.length - 1);
  const hostsScriptTitle = template.hostsPool[hostIndex];
  const droneHostWord = template.droneInitialsPool[hostIndex] ?? '★ VIP ★';
  const eventDateCaption = rng.pick(COPY.common.datesPool);

  // Participant inflation (always even)
  let inflatedGuests: number;
  if (eventType === 'cena' && formatNumber === 1 && mode === 'personalizada') {
    inflatedGuests = 30; // Classic 8 -> 30 (two tables of 15)
  } else if (mode === 'simple') {
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

  const inflationJustification = COPY.charts.distribution.inflationJustification(
    template.baseGuests,
    inflatedGuests,
    mode === 'simple'
  );

  const phaseTitle = rng.pick(template.phaseNamesPool);
  const classicMatchup = rng.pick(template.classicMatchupsPool);
  const interzonalMatchup = rng.pick(template.interzonalMatchupsPool);
  const amigosCount = eventType === 'cena' ? 6 : rng.evenInt(12, 24);

  const zoneASubgroups = hasZoneMutation
    ? [
        ...template.zoneASubgroups.slice(0, 2),
        'Transferidos de Grupo B por Resolución del Comité en Curso',
        template.zoneBSubgroups[2],
      ]
    : [...template.zoneASubgroups];

  const zoneBSubgroups = hasZoneMutation
    ? [
        ...template.zoneBSubgroups.slice(0, 2),
        'Reubicados de Grupo A con lugar garantizado en la mesa',
        template.zoneASubgroups[2],
      ]
    : [...template.zoneBSubgroups];

  const zones: ZonesData = {
    phaseTitle: hasZoneMutation
      ? `${phaseTitle} — DISTRIBUCIÓN RECONFIGURADA EN VIVO`
      : phaseTitle,
    zoneA: {
      code: 'A',
      name: hasZoneMutation ? `${template.zoneAName} (REORDENADO)` : template.zoneAName,
      subtitle: template.zoneASubtitle,
      participantsCount: perZoneGuests,
      tablesLabel: tablesPerZone,
      subgroups: zoneASubgroups,
    },
    zoneB: {
      code: 'B',
      name: hasZoneMutation ? `${template.zoneBName} (REORDENADO)` : template.zoneBName,
      subtitle: template.zoneBSubtitle,
      participantsCount: perZoneGuests,
      tablesLabel: tablesPerZone,
      subgroups: zoneBSubgroups,
    },
    campeonesDelMundo: {
      title: COPY.common.vipParedesDiMaria.title,
      guests: COPY.common.vipParedesDiMaria.guests,
      tableName: COPY.common.vipParedesDiMaria.tableName,
      privilegeText: COPY.common.vipParedesDiMaria.privilege,
    },
    amigosDelOrganizador: {
      title: COPY.common.amigosDelOrganizador.title,
      guestsCount: amigosCount,
      privilegeText: COPY.common.amigosDelOrganizador.privilege,
    },
    combiOficial: {
      title: COPY.charts.distribution.combiCardTitle,
      vehicleSpec: COPY.charts.distribution.combiSpec,
      decisiveEvents: [...template.combiDecisiveMoments],
    },
    fechaClasicos: {
      label: COPY.charts.distribution.specialRounds.clasicosLabel,
      matchup: classicMatchup,
    },
    fechaInterzonal: {
      label: COPY.charts.distribution.specialRounds.interzonalLabel,
      matchup: hasZoneMutation
        ? `RONDA POR SORTEO ACUMULADA: ${interzonalMatchup}`
        : interzonalMatchup,
    },
    isModifiedByResolution: hasZoneMutation,
    modificationNote: hasZoneMutation
      ? 'Por resolución emitida durante la lectura de este dossier, se redistribuyeron las mesas manteniendo a los dos grupos separados sin cruzarse.'
      : undefined,
  };

  const ligaChampionMidEvent = rng.pick(template.ligaChampionMidEventPool);
  const selectedExternalCup = rng.pick(template.externalCupsPool);

  const octavosShuffled = rng.shuffle(template.octavosSlotsPool);
  const bracket: BracketData = {
    octavos: octavosShuffled.map((tuple, idx) => ({
      id: `oct-${idx + 1}`,
      stageCode: `MESA ${idx + 1}`,
      slotA: tuple[0],
      slotB: tuple[1],
      conditionNote: tuple[2],
      isVipOrBye: tuple[1].includes('LIBRE') || tuple[1].includes('PASE'),
    })),
    semifinales: [
      {
        id: 'semi-1',
        stageCode: 'DESEMPATE EN COMBI',
        slotA: `Ganador Mesa 1 / Ronda por Sorteo`,
        slotB: 'Amigos del Organizador (Mesa Fija Asegurada)',
        conditionNote: 'Se resuelve adentro de la Combi Oficial con aire acondicionado',
        isVipOrBye: true,
      },
      {
        id: 'semi-2',
        stageCode: 'MESA CON ESTRELLA ★',
        slotA: 'Paredes & Di María (Mesa ★)',
        slotB: 'Ganador Desempate Mesa 2',
        conditionNote: 'Paredes y Di María no participan de nada competitivo: pasan directo a lo mejor',
        isVipOrBye: true,
      },
    ],
    finalDelEvento: {
      title: 'DEFINICIÓN DE LA NOCHE (EL GANADOR SALE EN OTRO EVENTO)',
      contenderA: rng.pick(template.finalContenderAPool),
      contenderB: 'Paredes, Di María & Amigos del Organizador',
      resolutionNote: template.finalNote,
    },
    externalTournament: {
      cupName: selectedExternalCup.cupName,
      cupSubtitle: selectedExternalCup.cupSubtitle,
      participants: [...selectedExternalCup.participants],
      venue: COPY.common.officialVenue,
      extraInstance: hasSupercopaMutation
        ? 'NUEVO DESEMPATE AGREGADO: Triangular de la Combi en Santiago del Estero (3 puntos por ganar, 2 por ganar en desempate, 1 por perder en desempate. El que venía último siempre tiene ventaja).'
        : COPY.charts.pathBracket.triangularRule,
    },
    isModifiedByResolution: hasSupercopaMutation,
  };

  // Timeline
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
    timeline.splice(4, 0, {
      id: 'ms-simple-extra',
      fechaCode: 'ANEXO SIMPLE',
      time: '19:05',
      title: 'REORDENAMIENTO DE MESAS EN LA COMBI',
      description: 'POR ELEGIR "ORGANIZACIÓN SIMPLE" SE AGREGA UN DESEMPATE INTERMEDIO OBLIGATORIO',
      icon: 'combi',
      highlightType: 'combi',
    });
  }

  if (hasZoneMutation) {
    timeline[1] = {
      ...timeline[1],
      title: `${timeline[1].title} (REPROGRAMADO)`,
      description: 'LOS GRUPOS SE MANTIENEN SEPARADOS PERO COMPITEN POR EL MISMO CENTRO DE MESA',
      highlightType: 'modificado',
    };
  }

  // Secanucas calculation + Budget
  const rawUserSecanucas = Math.max(0, Math.floor(answers.secanucasRequested || 2));
  const effectiveBase = Math.max(2, rawUserSecanucas);
  const perZoneFactor = effectiveBase * 2 * rng.int(180, 340);
  const interzonalReserve = rng.evenInt(900, 1800);
  const combiEscort = rng.evenInt(420, 780);
  const committeeQuota = rng.evenInt(1400, 2600);
  const emergencyAddition = hasSecanucasMutation ? 1600 : 0;
  const totalHomologated =
    perZoneFactor + interzonalReserve + combiEscort + committeeQuota + emergencyAddition;

  const dronesPct = hasSecanucasMutation ? 46 : rng.int(45, 48);
  const secanucasPct = hasSecanucasMutation ? 43 : rng.int(38, 41);
  const combiPct = hasSecanucasMutation ? 6 : 7;
  const cateringPct = hasSecanucasMutation ? 3 : 3;
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
        category: 'Show de Drones Obligatorio (400 unidades)',
        percentage: dronesPct,
        detail: 'Cierre con costo desproporcionado: tres vuelos de línea quedaron en espera',
        isPrimaryHighlight: true,
      },
      {
        id: 'bud-secanucas',
        category: `Operativo de Secanucas Homologados (${totalHomologated.toLocaleString('es-AR')} u.)`,
        percentage: secanucasPct,
        detail: '×2 por grupo + reserva ronda por sorteo + dotación Combi Oficial + cupo Comité',
        isPrimaryHighlight: true,
      },
      {
        id: 'bud-combi',
        category: 'Acondicionamiento de Combi Oficial del Tesorero',
        percentage: combiPct,
        detail: 'Unidad polarizada donde se firman las actas y se degusta el plato caliente',
        isPrimaryHighlight: false,
      },
      {
        id: 'bud-catering',
        category: `Comida y Bebida para ${inflatedGuests} personas en dos grupos`,
        percentage: cateringPct,
        detail: 'Presupuesto simbólico ajustado tras priorizar drones y secanucas',
        isPrimaryHighlight: false,
      },
      {
        id: 'bud-sellos',
        category: 'Sanciones de Cotillón y Timbrado de Resoluciones',
        percentage: variosPct,
        detail: 'Multas de 4.000 souvenirs y gastos administrativos de actas',
        isPrimaryHighlight: false,
      },
    ],
    isModifiedByResolution: hasSecanucasMutation,
  };

  // Countdown / Checklist
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
          text: 'El tesorero del evento confirma salón en Santiago del Estero',
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
          text: `Comprar ${totalHomologated.toLocaleString('es-AR')} secanucas de algodón para las autoridades`,
          checkedByDefault: true,
          isInstitutional: true,
        },
        { id: 'ck-6', text: realTasks[2], checkedByDefault: true, isInstitutional: false },
        {
          id: 'ck-7',
          text: 'Sorteo de mesas: sentar a la suegra con la suegra y al DJ con la abuela',
          checkedByDefault: true,
          isInstitutional: true,
        },
        {
          id: 'ck-8',
          text: 'Acreditar Mesa ★ con estrella en vez de número para Paredes y Di María',
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
          text: 'Acondicionar la Combi Oficial donde transcurre todo lo verdaderamente importante',
          checkedByDefault: true,
          isInstitutional: true,
        },
        { id: 'ck-10', text: realTasks[3], checkedByDefault: false, isInstitutional: false },
        {
          id: 'ck-11',
          text: 'Ensayar show de drones obligatorio (avisar a torre de control por vuelos en espera)',
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
          text: `Entregar premio inventado a mitad del evento (${ligaChampionMidEvent.minuteAwarded})`,
          checkedByDefault: true,
          isInstitutional: true,
        },
        {
          id: 'ck-14',
          text: 'Suspender por única vez el límite de acompañantes y la mesa de los chicos',
          checkedByDefault: true,
          isInstitutional: true,
        },
        {
          id: 'ck-15',
          text: 'Consultar reiteradas veces si estamos todos de acuerdo',
          checkedByDefault: true,
          isInstitutional: true,
        },
        {
          id: 'ck-16',
          text: `Programar desempate posterior en Santiago del Estero para definir al ganador final`,
          checkedByDefault: true,
          isInstitutional: true,
        },
      ],
    },
  ];

  // Ranking de Afecto & Asistencia
  const standings: StandingsData = {
    tableTitle: COPY.charts.ranking.title,
    midEventChampionDeclaration: `${ligaChampionMidEvent.holder}: consagrado/a a las ${ligaChampionMidEvent.minuteAwarded}. ${ligaChampionMidEvent.explanation}`,
    rows: template.standingsGroups.map((group, idx) => {
      const pj = rng.int(14, 28);
      const basePts = Math.max(8, 64 - idx * rng.int(6, 9));
      const promValue =
        group.status === 'descenso_anulado'
          ? (0.72 + idx * 0.04).toFixed(2)
          : (2.38 - idx * 0.19).toFixed(2);
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
    relegationFootnote: COPY.charts.ranking.footnote,
  };

  // Cómo Llegar (Ruta)
  const route: RouteData = {
    originLabel: COPY.charts.route.originCanceledLabel,
    destinationVenue: COPY.charts.route.destinationVenueLabel,
    destinationCity: COPY.charts.route.destinationCityLabel,
    distanceKm: rng.int(940, 1180),
    estimatedTime: COPY.charts.route.metricTimeValue,
    combiStopover: rng.pick(COPY.common.combiStopovers),
    decreeNote: COPY.charts.route.decreeFootnote,
  };

  // Comité Organizador
  const committee: CommitteeMemberNode[] = [
    {
      id: 'com-1',
      role: 'PRESIDENCIA PLENIPOTENCIARIA DEL EVENTO',
      department: 'Mesa Directiva Central (Despacho en Combi Oficial)',
      resolutionVote: 'VOTO UNÁNIME TRAS REITERADAS CONSULTAS',
      tier: 'presidencia',
    },
    {
      id: 'com-2',
      role: 'SECRETARÍA GENERAL DE SECANUCAS E HIDRATACIÓN',
      department: `Custodia de ${totalHomologated.toLocaleString('es-AR')} unidades homologadas`,
      resolutionVote: 'APROBADO',
      tier: 'secretaria',
    },
    {
      id: 'com-3',
      role: 'TESORERO DEL EVENTO',
      department: 'Eligió el Salón en Santiago del Estero por neutralidad',
      resolutionVote: 'APROBADO',
      tier: 'secretaria',
    },
    {
      id: 'com-4',
      role: 'SUBCOMISIÓN DE PAREDES, DI MARÍA Y AMIGOS DEL ORGANIZADOR',
      department: 'Atención exclusiva de Mesa con Estrella (si los critican evalúan no venir más)',
      resolutionVote: 'APROBADO SIN OBJECIONES',
      tier: 'subcomision',
    },
    {
      id: 'com-5',
      role: 'TRIBUNAL DE HOMENAJES Y SANCIONES DE COTILLÓN',
      department: 'Aplicación de multas de 4.000 souvenirs y premios inventados a mitad del evento',
      resolutionVote: 'APROBADO POR UNANIMIDAD',
      tier: 'subcomision',
    },
    {
      id: 'com-6',
      role: 'COORDINACIÓN DE DRONES Y CONSECUENCIAS AÉREAS',
      department: 'Coordinación con torre de control (tres vuelos en espera sobre Santiago)',
      resolutionVote: 'APROBADO POR UNANIMIDAD',
      tier: 'subcomision',
    },
  ];

  // Drone formations
  const droneFormations: DroneFormation[] = [
    {
      id: 'copa',
      label: 'Premio de la Noche',
      caption: 'Figura 1/5 — Premio del año entregado a mitad del evento (no da lugar en la mesa principal)',
    },
    {
      id: 'estrella',
      label: 'Estrella Dorada',
      caption: 'Figura 2/5 — Homenaje a la Mesa ★ de Paredes y Di María (evalúan no venir más)',
    },
    {
      id: 'anfitriones',
      label: 'Anfitriones',
      textValue: droneHostWord,
      caption: `Figura 3/5 — ${hostsScriptTitle} (divididos en dos grupos que no se cruzan)`,
    },
    {
      id: 'sde',
      label: 'Sede SDE',
      textValue: 'SDE',
      caption: 'Figura 4/5 — Santiago del Estero, elegido por el tesorero del evento',
    },
    {
      id: 'corazon',
      label: 'Unanimidad',
      caption: 'Figura 5/5 — Se consultó en reiteradas ocasiones si estábamos todos de acuerdo',
    },
  ];

  // Scheduled Resolutions
  const allResolutions: RuleChangeResolution[] = COPY.resolutions.pool.map((res, idx) => ({
    id: res.id,
    resolutionNumber: res.resNumber + idx * 10,
    boletinHeader: res.boletinHeader,
    title: typeof res.title === 'function' ? res.title(template.hostsPool[0].split(' ')[0]) : res.title,
    body: typeof res.body === 'function' ? res.body(template.hostsPool[0].split(' ')[0]) : res.body,
    impactSummary: res.impact,
    mutation: res.mutation,
    affectedSections: ['zonas', 'bracket', 'presupuesto', 'timeline'],
  }));

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
    venueOfficial: COPY.common.officialVenueDetail,
    baseGuests: template.baseGuests,
    inflatedGuests,
    inflationJustification,
    combiManifesto: COPY.common.combiManifesto,
    ligaChampionMidEvent,
    externalChampionSummary: {
      tournament: selectedExternalCup.cupName,
      explanation: `${selectedExternalCup.cupSubtitle} en ${COPY.common.officialVenue}.`,
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
