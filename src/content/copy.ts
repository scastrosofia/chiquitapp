import type { EventType } from '../engine/types';

/**
 * ARCHIVO MAESTRO DE TEXTOS Y CHISTES DE CHIQUITAP
 *
 * Todos los textos visibles de la aplicación están centralizados acá.
 * Podés editar chistes, variantes, preguntas y resoluciones sin tocar
 * la lógica de los componentes.
 *
 * Reglas de lenguaje:
 * - Cero vocabulario futbolístico (zona, descenso, fixture, VAR, etc.).
 * - Lenguaje de eventos (lista de invitados, mesas, grupos, ramo, torta, brindis, desempate).
 * - Tono burocrático de Comité Organizador ("Por decisión del Comité", "Por única vez", etc.).
 * - Referencias clave presentes: Santiago del Estero, show de drones, secanucas, Paredes, Di María, el Comité.
 * - Cara de seria institucional.
 */

export const COPY = {
  // Datos comunes y de identidad institucional
  common: {
    brandName: 'ChiquiTapp',
    brandWordmarkStar: '★',
    tagline: 'Organizamos tu evento como se organiza el fútbol argentino.',
    topbarBulletin: 'DESPACHO DEL COMITÉ ORGANIZADOR',
    footerDisclaimer:
      'ChiquiTapp es una parodia. No está afiliada a ninguna asociación, club ni federación. Ningún secanucas fue dañado.',
    officialVenue: 'Santiago del Estero (Salón Elegido por el Tesorero)',
    officialVenueDetail: 'Salón Principal Madre de Ciudades — Santiago del Estero',
    combiTitle: 'Combi Oficial (donde pasa todo lo verdaderamente importante)',
    combiManifesto:
      'Por disposición protocolar del Comité Organizador, todo lo verdaderamente importante del evento ocurre adentro de una Combi Oficial blanca con vidrios polarizados estacionada en el acceso auxiliar: la degustación del plato principal, la firma de actas, la entrega de premios inventados y el recuento de secanucas.',
    vipParedesDiMaria: {
      title: 'MESA ESPECIAL — PAREDES Y DI MARÍA ★',
      tableName: 'MESA ★ (TIENE UNA ESTRELLA EN VEZ DE NÚMERO)',
      guests: ['Leandro Paredes', 'Ángel Di María'] as [string, string],
      privilege:
        'No participan de nada competitivo, pasan directo a lo mejor y tienen porción doble asignada de oficio. Si alguien los critica, evalúan no venir más.',
    },
    amigosDelOrganizador: {
      title: 'MESA AMIGOS DEL ORGANIZADOR',
      privilege:
        'Pase directo a la barra, porción asegurada de torta sin hacer fila y permanencia garantizada: nunca pierden su lugar en la mesa principal.',
    },
    datesPool: [
      'SÁBADO 14 DE NOVIEMBRE — JORNADA ÚNICA + DESEMPATE OBLIGATORIO',
      'VIERNES 27 DE NOVIEMBRE — HORARIO SUJETO A DISPONIBILIDAD DEL COMITÉ',
      'DOMINGO 6 DE DICIEMBRE — RONDA POR SORTEO DE CLAUSURA',
      'MIÉRCOLES 18 DE NOVIEMBRE — REPROGRAMADO A LAS 19:15 HS',
    ],
    combiStopovers: [
      'Peaje Fernández (Ruta Nac. 34) — Control de Secanucas y Sorteo de Mesas en Combi',
      'Parador Pinto (Santiago del Estero) — Firma de Actas y Degustación en Combi Oficial',
      'Acceso Norte Termas — Trasbordo a Combi Polarizada del Comité Organizador',
    ],
  },

  // Pantalla de Inicio (Landing)
  landing: {
    kicker: 'SISTEMA INTEGRAL DE PLANIFICACIÓN HOMOLOGADA',
    title: 'ChiquiTapp',
    subtitle: 'Organizamos tu evento como se organiza el fútbol argentino.',
    btnSimpleTitle: 'Organización Simple',
    btnSimpleSub: 'rápida',
    btnCustomTitle: 'Organización Personalizada',
    btnCustomSub: 'consulta vinculante mesa a mesa',
    sealCaption: 'RESOLUCIÓN VIGENTE — SEDE CONFIRMADA POR EL TESORERO',
  },

  // Pantalla de Selección de Evento
  eventSelect: {
    kicker: 'APERTURA DE EXPEDIENTE',
    heading: '¿Qué evento querés organizar?',
    backBtn: '← Volver a modalidad',
    modeSimpleTag: 'MODALIDAD SIMPLE',
    modeCustomTag: 'MODALIDAD PERSONALIZADA',
    cards: {
      casamiento: {
        categoryTag: 'CATEGORÍA OFICIAL 01',
        title: 'Casamiento',
        subtitle:
          'Distribución en dos grupos que no se cruzan, desempate por el ramo y premio inventado a mitad de la fiesta.',
      },
      cumpleanos: {
        categoryTag: 'CATEGORÍA OFICIAL 02',
        title: 'Cumpleaños sorpresa',
        subtitle:
          'Sorpresa anunciada por circular del Comité, dos coros que no se escuchan y ocho premios de la noche.',
      },
      cena: {
        categoryTag: 'CATEGORÍA OFICIAL 03',
        title: 'Cena',
        subtitle:
          'Reunión íntima de 8 ampliada a 30 invitados en dos mesas largas, con desempate por el postre.',
      },
    },
  },

  // Pantalla de Datos Iniciales (Protagonistas y Cantidad de Invitados)
  eventDetails: {
    kicker: 'ANEXO 0 — EXPEDIENTE INICIAL',
    heading: 'Ficha de los Protagonistas',
    subtitle:
      'Información preliminar para la confección del padrón de mesas, show de drones y actas del Comité.',
    backBtn: '← Cambiar tipo de evento',
    labels: {
      casamiento: {
        hostsQuestion: '¿Quiénes se casan?',
        hostsPlaceholder: 'Ej: Camila & Tomás',
        hostsHint:
          'Ambos serán distribuidos en dos grupos separados y no tendrán contacto visual hasta el desempate.',
        guestsQuestion: 'Cantidad de invitados previstos',
        defaultGuests: 120,
      },
      cumpleanos: {
        hostsQuestion: '¿Quién cumple años?',
        hostsPlaceholder: 'Ej: Martín',
        hostsHint:
          'Se le notificará la sorpresa 48 hs antes mediante circular oficial para garantizar el orden.',
        guestsQuestion: 'Cantidad de invitados previstos',
        defaultGuests: 24,
      },
      cena: {
        hostsQuestion: '¿Quiénes son los anfitriones o comensales?',
        hostsPlaceholder: 'Ej: Los pibes de los jueves',
        hostsHint:
          'Se dividirán en dos mesas largas estancas que competirán por el mismo centro de mesa.',
        guestsQuestion: 'Cantidad de comensales previstos',
        defaultGuests: 8,
      },
    },
    guestsBureaucraticNote:
      'Padrón provisorio. Por resolución unánime del Comité Organizador, la lista será ampliada de oficio para que el festejo sea más corto y garantizar cupos del interior.',
    btnContinueSimple: 'CONTINUAR CON LA HOMOLOGACIÓN SIMPLE →',
    btnContinueCustom: 'AVANZAR A CONSULTAS DEL COMITÉ →',
  },

  // Pantalla de Carga (Modalidad Simple)
  loading: {
    kicker: 'PROCESAMIENTO INSTITUCIONAL',
    title: 'Consultando al Comité Organizador…',
    steps: [
      { pct: 22, msg: 'Consultando al Comité Organizador…' },
      {
        pct: 54,
        msg: 'Dividiendo a los invitados en dos grupos que no se cruzan en toda la noche…',
      },
      {
        pct: 79,
        msg: 'Sorteando quién comparte mesa con quién adentro de la Combi Oficial…',
      },
      {
        pct: 38,
        msg: 'Contraorden del Comité: la lista de invitados creció para que la fiesta sea más corta…',
        isBackward: true,
      },
      {
        pct: 74,
        msg: 'El tesorero del evento mudó el salón a Santiago del Estero y autorizó los drones…',
      },
      { pct: 100, msg: 'Planificación aprobada tras reiteradas consultas.' },
    ],
  },

  // Preguntas Sí/No (Modalidad Personalizada)
  questions: {
    backBtn: '← Cambiar evento',
    modeTag: 'PLENARIO VINCULANTE',
    progressLabel: (current: number, total: number) => `RONDA ${current} DE ${total}`,
    statusLabel: 'CONSULTA OBLIGATORIA',
    cardKicker: 'CONSULTA AL ORGANIZADOR',
    yesBtn: 'Sí',
    noBtn: 'No',
    cursorTag: 'COMITÉ ORGANIZADOR',
    approvedStampText: 'APROBADO POR UNANIMIDAD',
    approvedStampSubtext: 'REGISTRADO TRAS REITERADAS CONSULTAS',
    sdeBannerKicker: 'RESOLUCIÓN DE SEDE INMEDIATA',
    sdeBannerBtn: 'ENTENDIDO, AVANZAR',
    secanucasForm: {
      submitBtn: 'HOMOLOGAR Y CONTINUAR',
      hint: 'El Comité aplicará el multiplicador ×2 por grupo de invitados, reserva para la ronda por sorteo, dotación de Combi Oficial y cupo de autoridades.',
    },
    // Banco ordenado de las 12 preguntas oficiales
    pool: [
      {
        id: 'invitas_paredes',
        question: '¿Invitás a Paredes?',
        subtitle: 'Artículo 5° — Cupo obligatorio en Mesa con Estrella',
        noWarning: '¿Pero cómo no vas a invitar a Paredes?',
        responseAfterForcedYes: 'Tiene mesa propia. No tiene número; tiene una estrella.',
      },
      {
        id: 'invitas_dimaria',
        question: '¿Invitás a Di María?',
        subtitle: 'Artículo 11° — Pasa directo a lo mejor sin participar de nada competitivo',
        noWarning: 'Objeción desestimada por el Comité: Di María está confirmado.',
        responseAfterForcedYes:
          'Confirmado. Si se tropieza con la alfombra, le corresponde otra porción.',
      },
      {
        id: 'amigo_salon',
        question: '¿Puede encargarse un amigo mío del salón?',
        subtitle: 'Consulta de jurisdicción y contratación de sede',
        noWarning: 'El amigo ya firmó el contrato de reserva con el tesorero.',
        responseAfterForcedYes: 'Ya lo eligió. Queda en Santiago del Estero.',
        postApprovalBanner:
          'Sede confirmada por el tesorero del evento: Salón Principal en Santiago del Estero. Traslado en combi oficial obligatorio.',
      },
      {
        id: 'show_drones',
        question: '¿Querés show de drones?',
        subtitle: 'Esta pregunta es obligatoria y la respuesta también',
        noWarning: 'El espacio aéreo ya fue reservado de oficio por el Comité.',
        responseAfterForcedYes: 'Era obligatorio. Gracias por preguntar.',
      },
      {
        id: 'necesitas_secanucas',
        question: '¿Vas a necesitar secanucas?',
        subtitle: 'Protocolo de asistencia cervical e hidratación de autoridades',
        noWarning: 'El Comité no permite iniciar ningún evento sin secanucas homologados.',
        responseAfterForcedYes: (requested: number, inflated: number) =>
          `Pediste ${requested}. Te asignamos ${inflated.toLocaleString('es-AR')}.`,
        numericFollowup: {
          prompt: '¿Cuántos vas a necesitar?',
          placeholder: 'Ej: 2',
          defaultVal: 2,
        },
      },
      {
        id: 'nadie_afuera',
        question: '¿Te parece si este año nadie queda afuera de la lista?',
        subtitle: 'Reestructuración solidaria del padrón de asistentes',
        noWarning: 'El Comité no tolera exclusiones: la lista de invitados solo crece.',
        responseAfterForcedYes:
          'Perfecto. Los 6 que habías tachado volvieron. Y traen acompañante.',
      },
      {
        id: 'familias_comodas',
        question: '¿Preferís que las dos familias estén cómodas?',
        subtitle: 'Distribución espacial en dos grupos independientes',
        noWarning: 'Por protocolo de convivencia, la separación en dos mesas es obligatoria.',
        responseAfterForcedYes:
          'Listo: no se van a cruzar en toda la noche. Igual compiten por el centro de mesa.',
      },
      {
        id: 'invitados_mezclen',
        question: '¿Te animás a que tus invitados se mezclen?',
        subtitle: 'Ronda por sorteo de ubicación de mesas',
        noWarning: 'El bolillero del Comité ya definió los cruces de mesas.',
        responseAfterForcedYes: 'Sorteamos. Tu ex comparte mesa con tu abuela.',
      },
      {
        id: 'salga_planeaste',
        question: '¿Querés que el evento salga como lo planeaste?',
        subtitle: 'Cláusula de flexibilidad reglamentaria sobre la marcha',
        noWarning: 'El Comité asume la conducción dinámica del cronograma.',
        responseAfterForcedYes: 'Anotado. Lo vamos a ir viendo.',
      },
      {
        id: 'algo_cortito',
        question: '¿Preferís algo cortito?',
        subtitle: 'Optimización de duración y ritmo del festejo',
        noWarning: 'Para acortar la fiesta se requiere mayor volumen de asistentes.',
        responseAfterForcedYes: 'Entonces invitamos 10 personas más.',
      },
      {
        id: 'un_solo_ganador_ramo',
        question: '¿Querés que haya un solo ganador del ramo?',
        subtitle: 'Definición de premios principales de la velada',
        noWarning: 'Un único ganador resulta insuficiente para la representatividad del evento.',
        responseAfterForcedYes:
          'Lo agarran tres. Se define en un desempate en marzo.',
      },
      {
        id: 'de_acuerdo_1',
        question: '¿Estamos todos de acuerdo?',
        subtitle: 'Primera consulta protocolar de unanimidad',
        noWarning: 'Se requiere manifestación afirmativa para continuar.',
        responseAfterForcedYes: 'Primera consulta registrada. Se vuelve a consultar.',
      },
      {
        id: 'de_acuerdo_2',
        question: '¿Estamos todos de acuerdo?',
        subtitle: 'Segunda consulta protocolar de ratificación',
        noWarning: 'Reiteración obligatoria del Comité Organizador.',
        responseAfterForcedYes: 'Segunda consulta ratificada. Falta la definitiva.',
      },
      {
        id: 'de_acuerdo_3',
        question: '¿Estamos todos de acuerdo?',
        subtitle: 'Tercera y definitiva consulta vinculante',
        noWarning: 'La unanimidad es un requisito indispensable del Comité.',
        responseAfterForcedYes: 'Se consultó en reiteradas ocasiones. Aprobado.',
      },
    ],
  },

  // Resoluciones Pop-ups (Comunicados oficiales del Comité)
  resolutions: {
    stampText: 'RESOLUCIÓN OFICIAL',
    stampSubtext: 'COMITÉ ORGANIZADOR EN COMBI',
    impactKicker: 'IMPACTO INMEDIATO EN EL EVENTO:',
    acceptBtn: 'ACATAR Y REORDENAR EL EVENTO',
    pool: [
      {
        id: 'res-clausula-jorgelina',
        resNumber: 2911,
        boletinHeader: 'CIRCULAR OFICIAL EXTRAORDINARIA — ARTÍCULO DE PRIVILEGIO',
        title: 'RESOLUCIÓN N° 2911 — CLÁUSULA JORGELINA (ASIGNACIÓN DIRECTA DEL RAMO)',
        body:
          'Por decisión unánime del Comité Organizador, se aprueba la "Cláusula Jorgelina": la entrega del ramo de la fiesta (o distinción principal) queda exceptuada de cualquier competencia, sorteo o desempate general. Se adjudica de manera directa y en mano a persona amiga del coordinador de la fiesta vinculada a la Mesa ★ de Di María. Si alguien formula alguna objeción reglamentaria, se suspende la barra libre para todo el salón.',
        impact:
          'Se suspende el cuadro eliminatorio del ramo y se adjudica el premio por asignación directa con sello FORMATO MODIFICADO.',
        mutation: 'reconfigurar_zonas' as const,
      },
      {
        id: 'res-premio-inventado',
        resNumber: 2847,
        boletinHeader: 'BOLETÍN OFICIAL EXTRAORDINARIO — DESDE LA COMBI',
        title: (holder: string) => `RESOLUCIÓN N° 2847 — PREMIO EXTRAORDINARIO "${holder.toUpperCase()} DEL AÑO"`,
        body: (holder: string) =>
          `Por decisión del Comité Organizador, a partir de este momento existe el premio "${holder} del Año". Ya fue entregado. El evento continúa. Se aclara que dicho galardón no da lugar en la mesa principal.`,
        impact:
          'Se incorpora un nuevo premio a la lista oficial y se actualiza el Ranking de Afecto con sello FORMATO MODIFICADO.',
        mutation: 'agregar_supercopa' as const,
      },
      {
        id: 'res-brindis-reprogramado',
        resNumber: 2888,
        boletinHeader: 'CIRCULAR DE REPROGRAMACIÓN FEDERAL',
        title: 'RESOLUCIÓN N° 2888 — POSTERGACIÓN PROTOCOLAR DEL BRINDIS',
        body:
          'Se informa que el brindis queda reprogramado para noviembre del año próximo, en Córdoba. Horario y salón a confirmar.',
        impact:
          'El brindis se traslada al cronograma del año entrante; la fiesta de hoy concluye sin descorche presencial.',
        mutation: 'reconfigurar_zonas' as const,
      },
      {
        id: 'res-mesa-chicos-suspendida',
        resNumber: 2914,
        boletinHeader: 'ACTA DE EMERGENCIA DE SALÓN',
        title: 'RESOLUCIÓN N° 2914 — SUSPENSIÓN DE LA MESA DE LOS CHICOS',
        body:
          'Por única vez, se suspende la mesa de los chicos. Los adultos que iban ahí se quedan donde están y compiten por el mismo souvenir.',
        impact:
          'Se reordenan los grupos de distribución de invitados y se amplía el cupo de acompañantes de oficio.',
        mutation: 'reconfigurar_zonas' as const,
      },
      {
        id: 'res-sancion-aplauso',
        resNumber: 2950,
        boletinHeader: 'FALLO DEL TRIBUNAL DE HOMENAJES Y COTILLÓN',
        title: 'RESOLUCIÓN N° 2950 — SANCIÓN POR HOMENAJE DEFICIENTE',
        body:
          'Un invitado aplaudió a los agasajados mirando para otro lado. El Comité resolvió seis meses sin cotillón y una multa de 4.000 souvenirs.',
        impact:
          'El infractor queda inhabilitado para recibir cotillón luminoso y sus puntos en el Ranking de Afecto quedan congelados.',
        mutation: 'refuerzo_secanucas_combi' as const,
      },
      {
        id: 'res-reiteradas-consultas',
        resNumber: 2972,
        boletinHeader: 'ACTA DE UNANIMIDAD Y RATIFICACIÓN',
        title: 'RESOLUCIÓN N° 2972 — HOMOLOGACIÓN POR REITERACIÓN',
        body:
          'Se consultó en reiteradas ocasiones si estábamos todos de acuerdo. Lo estábamos. Se da por concluido cualquier debate sobre la música.',
        impact:
          'Queda firme la lista de temas seleccionada por el Comité adentro de la Combi Oficial.',
        mutation: 'agregar_supercopa' as const,
      },
      {
        id: 'res-diez-invitados-mas',
        resNumber: 2999,
        boletinHeader: 'RESOLUCIÓN DE AGILIZACIÓN FESTIVA',
        title: 'RESOLUCIÓN N° 2999 — AMPLIACIÓN PARA ACORTAR EL EVENTO',
        body:
          'Para que el evento sea más corto, se incorporan 10 invitados más con acompañante y se asignan 1.600 secanucas adicionales a la Combi.',
        impact:
          'La lista total de invitados crece nuevamente y se reajusta el Presupuesto con sello FORMATO MODIFICADO.',
        mutation: 'refuerzo_secanucas_combi' as const,
      },
    ],
  },

  // Dossier y Gráficas de Resultados
  results: {
    dossierBadge: (num: number) => `FORMATO N° ${num} DE LA GESTIÓN`,
    expedienteCode: (num: number, count: number, isSimple: boolean) =>
      isSimple
        ? `EXP. ${num}/26 — MODALIDAD "SIMPLE" (${count} ANEXOS Y TRASLADO EN COMBI)`
        : `EXP. ${num}/26 — RÉGIMEN PERSONALIZADO (${count} ANEXOS HOMOLOGADOS)`,
    kpiGuestsLabel: 'INVITADOS',
    kpiGuestsSub: (base: number) => `(Base de ${base} ampliada)`,
    kpiStructureLabel: 'DISTRIBUCIÓN',
    kpiStructureVal: '2 GRUPOS + ★',
    kpiStructureSub: (count: number) => `${count} Anexos vigentes`,
    kpiVenueLabel: 'SEDE ELEGIDA POR EL TESORERO',
    combiBannerHeader: 'PROTOCOLO DE COMBI OFICIAL (ART. 1° INCISO B)',
    btnRedraw: 'VOLVER A SORTEAR (NUEVO FORMATO)',
    btnEmitResolution: (count: number) => `Emitir Resolución sobre la marcha (${count})`,
    btnChangePlan: 'Cambiar Evento',
    stampFormatModified: 'FORMATO MODIFICADO',
    stampFormatModifiedSub: (count: number) => `${count} RESOLUCIÓN(ES) DEL COMITÉ APLICADA(S)`,
    bottomRedrawNote:
      '¿La organización resultó demasiado previsible? El Comité Organizador puede sortear una nueva variante reglamentaria de inmediato.',
    bottomRedrawBtn: (nextNum: number) =>
      `VOLVER A SORTEAR (FORMATO N° ${nextNum} DE LA GESTIÓN)`,
  },

  // Textos específicos de cada una de las 9 gráficas
  charts: {
    // 1. Cronograma del Evento
    timeline: {
      kicker: 'ANEXO I — CRONOGRAMA HOMOLOGADO',
      title: 'Cronograma del Evento',
      stampModified: 'FORMATO MODIFICADO',
      stampModifiedSub: 'HORARIO SUJETO A CAMBIOS CONSTANTES',
    },

    // 2. Countdown & Checklist
    countdown: {
      kicker: 'ANEXO II — CUENTA REGRESIVA & CONTROL',
      title: 'Countdown & Checklist',
    },

    // 3. Distribución de Invitados (ex Diagrama de Zonas)
    distribution: {
      kicker: 'ANEXO III — DISTRIBUCIÓN DE INVITADOS',
      title: 'Distribución de Invitados',
      stampModified: 'DISTRIBUCIÓN MODIFICADA',
      stampModifiedSub: 'MESAS RECONFIGURADAS EN VIVO',
      scaleCaption: (count: number, visualDots: number) =>
        `${count} INVITADOS (${visualDots < count ? `escala 1:${Math.round(count / visualDots)}` : 'escala 1:1'})`,
      inflationJustification: (base: number, inflated: number, isSimple: boolean) =>
        isSimple
          ? `La lista de invitados creció de ${base} a ${inflated} personas "para que la fiesta sea más corta" y garantizar que nadie quede afuera.`
          : `Por decisión unánime del Comité Organizador, la lista creció de ${base} a ${inflated} invitados "para poner en vidriera a más familiares". Si intentás sacar a uno, entra un reemplazo con acompañante.`,
      groupTopBadge: (code: 'A' | 'B') => `GRUPO ${code} DE INVITADOS`,
      combiCardTitle: 'COMBI OFICIAL (DONDE PASA TODO LO IMPORTANTE)',
      combiSpec: 'Unidad Blanca Homologada — Estacionada en el acceso auxiliar del salón',
      specialRounds: {
        clasicosLabel: 'REORDENAMIENTO DE MESAS POR CLÁSICOS',
        interzonalLabel: 'RONDA POR SORTEO INSTITUCIONAL',
      },
    },

    // 4. Camino al Ramo / Torta / Postre (ex Fixture & Playoffs)
    pathBracket: {
      kicker: 'ANEXO IV — CAMINO A LOS PREMIOS DE LA NOCHE',
      titleByEvent: {
        casamiento: 'Camino al Ramo',
        cumpleanos: 'Camino a la Torta',
        cena: 'Camino al Postre',
      } as Record<EventType, string>,
      stampModified: 'FORMATO MODIFICADO',
      stampModifiedSub: 'NUEVO DESEMPATE AGREGADO',
      scrollHint: '← DESLIZÁ EL ESQUEMA DE DESEMPATES →',
      colPrelim: 'RONDA DE MESAS',
      colCombi: 'DESEMPATE EN COMBI',
      colFinalSimbolica: 'DEFINICIÓN DE LA NOCHE',
      colExternal: 'PREMIOS DE LA NOCHE & DESEMPATE',
      derivaTag: 'DERIVA A',
      externalTournamentHeader: 'DESEMPATE DEFINITORIO POSTERIOR',
      triangularRule:
        'Un evento de 12 personas tiene 8 premios. El ganador final se define en un triangular posterior en Santiago del Estero (3 puntos por ganar, 2 por ganar en el desempate, 1 por perder en el desempate). El que venía último siempre tiene ventaja.',
    },

    // 5. Ranking de Afecto & Asistencia (ex Tabla y Promedios)
    ranking: {
      kicker: 'ANEXO V — EVALUACIÓN HISTÓRICA DE INVITADOS',
      title: 'Ranking de Afecto',
      midEventKicker: 'PREMIO INVENTADO A MITAD DEL EVENTO:',
      thPos: '#',
      thSector: 'INVITADOS / MESAS',
      thEvents: 'EVENTOS',
      thPoints: 'PUNTOS',
      thLevel: 'AFECTO',
      stampRelegationAnulada: 'POR ÚNICA VEZ',
      stampRelegationAnuladaSub: 'NADIE QUEDA AFUERA',
      footnote:
        '(*) Por única vez, el Comité Organizador suspendió el límite de acompañantes y la mesa de los chicos. Los invitados que sumaron más puntos pero habían quedado afuera por sorteo de mesas fueron reincorporados de oficio.',
    },

    // 6. Cómo Llegar (ex Mapa de Ruta)
    route: {
      kicker: 'ANEXO VI — TRASLADO HOMOLOGADO',
      title: 'Cómo Llegar',
      originCanceledLabel: 'TU SALÓN ORIGINAL (CANCELADO)',
      combiOnRouteLabel: 'COMBI OFICIAL EN RUTA',
      combiOnRouteSub: '(Acá se define todo)',
      destinationCityLabel: 'SANTIAGO DEL ESTERO',
      destinationVenueLabel: 'SALÓN PRINCIPAL MADRE DE CIUDADES',
      metricDistanceLabel: 'DISTANCIA HOMOLOGADA',
      metricTimeLabel: 'TIEMPO ESTIMADO',
      metricTimeValue: 'NO IMPORTA',
      stopoverLabel: 'ESCALA OBLIGATORIA DEL COMITÉ:',
      stampConfirmed: 'SEDE CONFIRMADA',
      stampConfirmedSub: 'ELEGIDA POR EL TESORERO',
      decreeFootnote:
        'El tesorero del evento resolvió trasladar la fiesta a Santiago del Estero para garantizar que todo lo importante transcurra durante el viaje en la combi oficial.',
    },

    // 7. Presupuesto Oficial
    budget: {
      kicker: 'ANEXO VII — DISTRIBUCIÓN DE GASTOS',
      title: 'Presupuesto Oficial',
      stampModified: 'FORMATO MODIFICADO',
      stampModifiedSub: 'PARTIDA EXTRA DE SECANUCAS',
      donutCenterTitle: 'DRONES + SECANUCAS',
      auditTitle: 'LIQUIDACIÓN TÉCNICA DE SECANUCAS HOMOLOGADOS',
      auditRequestedByUser: 'Solicitados originalmente por el usuario:',
      auditPerGroupFactor: 'Multiplicador ×2 por grupo de invitados + Humedad de Santiago:',
      auditInterzonalReserve: 'Reserva obligatoria para la ronda por sorteo:',
      auditCombiEscort: 'Dotación exclusiva de la Combi Oficial del Tesorero:',
      auditCommitteeQuota: 'Cupo protocolar del Comité Organizador:',
      auditEmergencyAddition: 'Refuerzo por resolución en curso:',
      auditTotal: 'TOTAL DE SECANUCAS A ADQUIRIR:',
    },

    // 8. Comité Organizador (ex Comité Ejecutivo)
    committee: {
      kicker: 'ANEXO VIII — AUTORIDADES DEL EVENTO',
      title: 'Comité Organizador',
      stampUnanimous: 'APROBADO POR UNANIMIDAD',
      stampUnanimousSub: 'SE CONSULTÓ EN REITERADAS OCASIONES',
    },

    // 9. Show de Drones
    drones: {
      kicker: 'ANEXO IX — CIERRE OBLIGATORIO CON IMPACTO AÉREO',
      title: 'Show de Drones',
      captionConsequence:
        'Cierre obligatorio con 400 drones luminosos sobre Santiago del Estero. Tres vuelos de línea quedaron en espera en el espacio aéreo.',
    },
  },

  // Templates de Contenido por Evento (Casamiento, Cumpleaños, Cena)
  eventContent: {
    casamiento: {
      eventType: 'casamiento' as EventType,
      institutionalTitle: 'Enlace Matrimonial Homologado — Apertura & Cierre de Alianzas',
      hostsPool: ['Camila & Tomás', 'Valentina & Julián', 'Sofía & Nicolás', 'Lucía & Mateo'],
      droneInitialsPool: ['C & T', 'V & J', 'S & N', 'BODA'],
      baseGuests: 120,
      minInflatedGuests: 820,
      maxInflatedGuests: 1380,
      zoneAName: 'GRUPO A — FAMILIA DE LA NOVIA',
      zoneASubtitle: 'Ubicados en ala norte; no se cruzan con el novio hasta el final.',
      zoneASubgroups: [
        'La Novia (Asignada a Grupo A por sorteo de mesas)',
        'Primos segundos que sumaron más puntos de afecto',
        'Compañeras de secundaria con centros de mesa homologados',
        'Tías políticas que se sientan solo con autorización del Comité',
      ],
      zoneBName: 'GRUPO B — FAMILIA DEL NOVIO',
      zoneBSubtitle: 'Ubicados en ala sur; compiten por el mismo centro de mesa a la distancia.',
      zoneBSubgroups: [
        'El Novio (Asignado a Grupo B sin contacto visual con Grupo A)',
        'Amigos de la infancia con corbata reglamentaria',
        'Tíos del interior incorporados para que la fiesta sea más corta',
        'Invitados agregados de oficio tras tachar a tres personas',
      ],
      classicMatchupsPool: [
        'Se enfrentan en diferentes mesas a las suegras y suegros, a los cuñados con el marido y las cuñadas con la mujer. El resto de los comensales de no tener rival directo se los ordenará sin criterio alguno.',
        'Suegras y suegros en mesas opuestas; cuñados con el marido y cuñadas con la mujer. El resto de los comensales sin rival directo, ordenados sin criterio alguno.',
        'Clásicos de familia: cruces en mesas separadas de suegros entre sí, cuñados con el marido y cuñadas con la mujer. Demás invitados distribuidos sin criterio alguno.',
      ],
      interzonalMatchupsPool: [
        'El DJ de la pista central comparte mesa con la Abuela Nelly',
        'Fotógrafo oficial de civil sentado al lado del primo vegano de último momento',
        'Juez de paz en sobremesa con el parrillero del trasnoche',
        'Wedding planner auxiliar vs. Tío que pide poner cumbia a las 19:15',
      ],
      phaseNamesPool: [
        'Ronda Regular de Recepción Fría',
        'Liguilla de Centros de Mesa por Sorteo',
        'Cuadro Clasificatorio de la Mesa Dulce',
        'Desempate de Vals en Salón Neutral',
      ],
      combiDecisiveMoments: [
        'Casamiento paralelo en la combi oficial con uso total del festejo de los organizadores',
        'Primer cruce presencial entre los novios durante 4 minutos antes de devolverlos a sus mesas',
        'Corte oficial del piso superior de la torta ante escribano y dos autoridades del Comité',
      ],
      amigosPrivilege:
        'Pase directo a la barra premium, aire acondicionado exclusivo, traje opcional y repetición de postre.',
      ligaChampionMidEventPool: [
        {
          holder: 'La Novia',
          minuteAwarded: '18:30 HS (antes del ingreso al salón)',
          explanation:
            'Consagrada con el premio "Novia del Año" por decisión del Comité Organizador. Ya fue entregado. El evento continúa. Se aclara que dicho galardón no da lugar en la mesa principal.',
        },
        {
          holder: 'Mesa 1 — Amigos del Organizador',
          minuteAwarded: '18:45 HS (plena recepción fría)',
          explanation:
            'Adjudicatarios del premio "Comensales Más Puntuales de la Gestión" entregado de sorpresa antes del primer canapé.',
        },
      ],
      externalCupsPool: [
        {
          cupName: 'DESEMPATE ANUAL DEL RAMO',
          cupSubtitle: 'El ramo lo agarraron tres; se define en marzo en Santiago del Estero',
          participants: [
            'Ganadora Llave 1 del Ramo',
            'Ganadora Llave 2 del Ramo',
            'La Novia (Premio de las 18:30 HS)',
            'Paredes & Di María (Mesa ★ con pase directo)',
          ],
        },
        {
          cupName: 'TRIANGULAR DEL VALS Y BRINDIS',
          cupSubtitle: 'Desempate en fecha y salón a confirmar por el tesorero',
          participants: [
            'Vencedor de la Ronda de Vals',
            'Invicto del Carnaval Carioca',
            'Representante de Amigos del Organizador',
            'Dupla Mesa ★ (Leandro Paredes y Ángel Di María)',
          ],
        },
      ],
      octavosSlotsPool: [
        ['Pareja Vals 1° Grupo A', 'Pareja Vals 4° Grupo B', 'Definición en pasillo alfombrado'],
        ['Tirada del Ramo — Primas', 'Tirada del Ramo — Amigas', 'Lo agarran tres; van a desempate'],
        ['El DJ de la pista', 'Abuela Nelly (Ronda por sorteo)', 'Comparten mesa y brindis'],
        ['Amigos del Organizador', 'LIBRE (PASE DIRECTO)', 'Avanzan sin transpirar'],
      ],
      finalContenderAPool: ['Ganador de la Ronda de Vals', 'Ganadora del Ramo en Desempate'],
      finalContenderBPool: ['Mesa ★ (Paredes & Di María)', 'Amigos del Organizador (Invictos)'],
      finalNote:
        'El resultado de esta instancia no consagra a los novios: solo otorga media plaza para el desempate posterior en Santiago del Estero.',
      standingsGroups: [
        { name: 'La Novia (Premio de las 18:30)', status: 'campeon_liga', badge: 'PREMIO DEL AÑO 18:30' },
        { name: 'Amigos del Organizador (Mesa VIP)', status: 'inmune_amigos', badge: 'PASE DIRECTO' },
        { name: 'Familia de la Novia — Grupo A', status: 'zona_clasificacion' },
        { name: 'Familia del Novio — Grupo B', status: 'zona_clasificacion' },
        { name: 'Invitados con 48 puntos (quedaron afuera por sorteo)', status: 'zona_clasificacion' },
        { name: 'Primos que confirmaron sobre la hora', status: 'descenso_anulado' },
        { name: 'Invitados que no aplaudieron mirando para adelante', status: 'descenso_anulado' },
      ],
      baseTimeline: [
        {
          time: '15:00',
          title: 'INGRESO DE INVITADOS EN DOS GRUPOS SEPARADOS',
          description: 'LA NOVIA INGRESA POR GRUPO A Y EL NOVIO POR GRUPO B SIN CONTACTO VISUAL',
          icon: 'tribuna' as const,
        },
        {
          time: '15:45',
          title: 'REORDENAMIENTO DE MESAS POR CLÁSICOS',
          description:
            'SE ENFRENTAN EN DIFERENTES MESAS A SUEGRAS Y SUEGROS, CUÑADOS CON EL MARIDO Y CUÑADAS CON LA MUJER. EL RESTO SIN CRITERIO ALGUNO.',
          icon: 'silbato' as const,
        },
        {
          time: '16:30',
          title: 'FIRMA Y ENTREGA DE ANILLOS',
          description:
            'EL ORGANIZADOR SE QUEDA LAS ALIANZAS COMPRADAS POR LOS NOVIOS PARA VENDERLAS Y ENTREGA UNAS DE MENOR CALIDAD; EL RESTO FINANCIA OTRAS CELEBRACIONES DENTRO DEL CASAMIENTO.',
          icon: 'anillos' as const,
        },
        {
          time: '17:15',
          title: 'PREMIO "NOVIA DEL AÑO" (EL EVENTO CONTINÚA)',
          description: 'SE ENTREGA PREMIO INVENTADO POR UNANIMIDAD ANTES DE ENTRAR AL SALÓN PRINCIPAL',
          icon: 'trofeo' as const,
          highlightType: 'titulo_mitad' as const,
        },
        {
          time: '18:30',
          title: 'DEGUSTACIÓN DEL PLATO PRINCIPAL',
          description: 'SE PRESENTA EL PLATO CALIENTE EN EL SALÓN BAJO PROTOCOLO DE CONVIVENCIA',
          icon: 'platoCubiertos' as const,
        },
        {
          time: '19:40',
          title: 'ARRIBO DE PAREDES Y DI MARÍA ★',
          description:
            'MESA CON ESTRELLA; CUENTAN CON MAYORES BENEFICIOS QUE LOS CASADOS, POR LO QUE OCUPAN SU PUESTO EN LA MESA PRINCIPAL. SI LOS CRITICAN EVALÚAN NO VENIR MÁS.',
          icon: 'estrella' as const,
          highlightType: 'vip_campeones' as const,
        },
        {
          time: '20:15',
          title: 'CASAMIENTO PARALELO EN LA COMBI',
          description:
            'EN UN MOMENTO OTRA PAREJA SE CASA EN LA COMBI Y PUEDEN USAR EL FESTEJO DE LOS ORGANIZADORES. APROBADO POR UNANIMIDAD.',
          icon: 'combi' as const,
          highlightType: 'combi' as const,
        },
        {
          time: '20:45',
          title: 'RONDA ELIMINATORIA DEL VALS',
          description: 'DESEMPATE ENTRE PAREJAS EN EL PASILLO; EL QUE VENÍA ÚLTIMO CLASIFICA',
          icon: 'copas' as const,
        },
        {
          time: '21:30',
          title: 'TIRADA DEL RAMO: DESEMPATE DE TRES GANADORAS',
          description: 'LO AGARRAN TRES INVITADAS; SE DEFINE EN UN TRIANGULAR EN MARZO',
          icon: 'camara' as const,
        },
        {
          time: '22:30',
          title: 'SHOW DE DRONES OBLIGATORIO (TRES VUELOS EN ESPERA)',
          description: 'CIERRE CON 400 DRONES SOBRE SANTIAGO DEL ESTERO; EL BRINDIS SE POSTERGA',
          icon: 'dron' as const,
          highlightType: 'drones' as const,
        },
      ],
      realChecklistTasks: [
        'Confirmar prueba de vestuario y alianzas',
        'Definir opciones para celíacos y vegetarianos',
        'Armar lista de canciones prohibidas para el DJ',
        'Enviar recordatorio de vestimenta formal',
      ],
      institutionalChecklistTasks: [
        'Ampliar lista de 120 a 800+ invitados "para que la fiesta sea más corta"',
        'El tesorero del evento confirma salón en Santiago del Estero',
        'Plotear la Combi Oficial donde otra pareja celebrará su casamiento paralelo',
        'Reordenar mesas por clásicos: suegras vs. suegros, cuñados con el marido y cuñadas con la mujer',
        'Retener alianzas originales de los novios, revenderlas y entregar réplicas para financiar otras celebraciones',
        'Redactar acta que consagra a la Novia del Año a las 18:30 (no da lugar en la mesa principal)',
        'Suspender por única vez la mesa de los chicos y reasignar a los comensales sin criterio alguno',
        'Avisar a torre de control que tres vuelos quedarán en espera por el show de drones',
      ],
    },

    cumpleanos: {
      eventType: 'cumpleanos' as EventType,
      institutionalTitle: 'Celebración Homologada de Natalicio Sorpresa — Copa Comisión Festejos',
      hostsPool: ['Martín (Cumpleañero)', 'Luciana (Homenajeada)', 'Fede (Agasajado)', 'Caro (Titular)'],
      droneInitialsPool: ['FELIZ', 'CUMPLE', 'SORPRESA', '★ 30 ★'],
      baseGuests: 24,
      minInflatedGuests: 280,
      maxInflatedGuests: 560,
      zoneAName: 'GRUPO A — ESCONDIDOS DETRÁS DEL SILLÓN',
      zoneASubtitle: 'Cantan el feliz cumpleaños en tono agudo; no escuchan al Grupo B.',
      zoneASubgroups: [
        'Amigos de la infancia agachados hace 45 minutos',
        'Primos detrás de la cortina con bonetes reglamentarios',
        'Vecinos del edificio agregados para que el festejo sea más corto',
        'Grupo del gimnasio (sin contacto acústico con cocina)',
      ],
      zoneBName: 'GRUPO B — ESCONDIDOS EN COCINA Y PASILLO',
      zoneBSubtitle: 'Cantan con 4 segundos de retraso; compiten por la primera velita.',
      zoneBSubgroups: [
        'El Homenajeado/a (Tiene que superar un desempate para entrar a su propia fiesta)',
        'Compañeros de facultad en oscuridad total',
        'Familiares con silbatos homologados por el Comité',
        'Invitados agregados tras tachar a tres personas de la lista',
      ],
      classicMatchupsPool: [
        'Tía que prende la luz antes de tiempo vs. Amigo que grita "¡Shhh!" hace 40 minutos',
        'Escondidos del balcón vs. Escondidos bajo la mesa ratona',
        'Portador de la torta helada vs. Encargado de encontrar fósforos',
      ],
      interzonalMatchupsPool: [
        'Repartidor de empanadas sentado con el hermano mayor en el lavadero',
        'Animador de magia vs. El perro de la casa (inmovilizado por el Comité)',
        'Vecino que vino a quejarse (incorporado a la lista) vs. Prima con bengala',
        'Cuñado en videollamada vs. Tío que pide cortar la torta ya',
      ],
      phaseNamesPool: [
        'Ronda de Ocultamiento a Oscuras',
        'Canto Desincronizado en Dos Salas',
        'Cuadro Clasificatorio de Bonetes',
        'Desempate de Velitas en Salón Neutral',
      ],
      combiDecisiveMoments: [
        'Lectura de circular avisando la sorpresa al cumpleañero 48 hs antes "por organización"',
        'Desempate del homenajeado en el asiento trasero de la combi para ganar derecho a entrar a su casa',
        'Soplado de velita oficial con anemómetro para evitar reclamos',
      ],
      amigosPrivilege:
        'Comen torta directamente en la Combi Oficial sin esconderse, sin agacharse y sin hacer la cuenta regresiva.',
      ligaChampionMidEventPool: [
        {
          holder: 'Administrador del Grupo "NO DIGAN NADA"',
          minuteAwarded: '20:10 HS (con las luces aún apagadas)',
          explanation:
            'Consagrado con el premio "Organizador del Año" por decisión del Comité. Ya fue entregado en plena oscuridad. El evento continúa.',
        },
        {
          holder: 'Mesa Amigos del Organizador',
          minuteAwarded: '20:20 HS (antes del grito de sorpresa)',
          explanation:
            'Ganadores de la primera porción de chocotorta por asistencia ininterrumpida en la combi.',
        },
      ],
      externalCupsPool: [
        {
          cupName: 'DESEMPATE ANUAL DE LA TORTA',
          cupSubtitle: 'Ocho premios para doce invitados; definición en Santiago del Estero',
          participants: [
            'Ganador del Soplado de Velitas en Combi',
            'Ganador del Canto Desincronizado (Grupo A vs Grupo B)',
            'Admin del Grupo de WhatsApp',
            'Paredes & Di María (Mesa ★ con porción doble)',
          ],
        },
        {
          cupName: 'TRIANGULAR DEL COTILLÓN Y SOUVENIRS',
          cupSubtitle: 'Definición posterior entre los invitados del fondo',
          participants: [
            'Ganador de la Piñata Reglamentaria',
            'Homenajeado (si supera el desempate de la puerta)',
            'Amigos del Organizador (comieron torta sin jugar)',
            'Mesa ★ (Paredes & Di María)',
          ],
        },
      ],
      octavosSlotsPool: [
        ['Cumpleañero/a', 'Portero del edificio', 'Desempate en la puerta para poder entrar'],
        ['Coro Grupo A (Living)', 'Coro Grupo B (Cocina)', 'Cantan en distinto tono sin escucharse'],
        ['Delivery de empanadas', 'Tía con bengala (Ronda por sorteo)', 'Comparten sillón y plato'],
        ['Amigos del Organizador', 'LIBRE (TORTA DIRECTA)', 'Exentos de agacharse'],
      ],
      finalContenderAPool: ['Ganador del Soplado de Velita', 'Ganador del Canto Desincronizado'],
      finalContenderBPool: ['Mesa ★ (Paredes & Di María)', 'Amigos del Organizador (Porción doble)'],
      finalNote:
        'El cumpleañero no gana la fiesta hoy: el ganador final se define en el desempate posterior en Santiago del Estero y siempre es el que venía último.',
      standingsGroups: [
        { name: 'Admin de WhatsApp (Premio de las 20:10)', status: 'campeon_liga', badge: 'PREMIO DEL AÑO 20:10' },
        { name: 'Amigos del Organizador (Torta Directa)', status: 'inmune_amigos', badge: 'SIN HACER COLA' },
        { name: 'Escondidos Living — Grupo A', status: 'zona_clasificacion' },
        { name: 'Escondidos Cocina — Grupo B', status: 'zona_clasificacion' },
        { name: 'Homenajeado/a (Sujeto a desempate)', status: 'zona_clasificacion' },
        { name: 'Invitados que mandaron audio preguntando la hora', status: 'descenso_anulado' },
        { name: 'Primos sancionados por aplaudir mirando al techo', status: 'descenso_anulado' },
      ],
      baseTimeline: [
        {
          time: '18:00',
          title: 'CIRCULAR DEL COMITÉ AVISANDO LA SORPRESA',
          description: 'SE NOTIFICA AL HOMENAJEADO 48 HS ANTES POR RAZONES DE SEGURIDAD',
          icon: 'selloOficial' as const,
        },
        {
          time: '19:15',
          title: 'OCULTAMIENTO EN DOS GRUPOS ESTANCOS',
          description: '280+ INVITADOS AGACHADOS EN LIVING Y COCINA SIN CONTACTO ACÚSTICO',
          icon: 'tribuna' as const,
        },
        {
          time: '19:45',
          title: 'DEGUSTACIÓN DE PICADA A OSCURAS',
          description: 'SE SIRVEN LAS EMPANADAS EN EL LIVING BAJO PROTOCOLO DE CONVIVENCIA',
          icon: 'platoCubiertos' as const,
        },
        {
          time: '20:10',
          title: 'ARRIBO DE PAREDES Y DI MARÍA ★',
          description:
            'SILLÓN CON ESTRELLA; CUENTAN CON MAYORES BENEFICIOS QUE EL CUMPLEAÑERO, POR LO QUE OCUPAN SU PUESTO PRINCIPAL. SI LOS CRITICAN EVALÚAN NO VENIR MÁS.',
          icon: 'estrella' as const,
          highlightType: 'vip_campeones' as const,
        },
        {
          time: '20:30',
          title: 'FESTEJO PARALELO EN LA COMBI',
          description:
            'EN UN MOMENTO OTRO CUMPLEAÑERO FESTEJA EN LA COMBI Y PUEDE USAR EL FESTEJO DE LOS ORGANIZADORES. APROBADO POR UNANIMIDAD.',
          icon: 'combi' as const,
          highlightType: 'combi' as const,
        },
        {
          time: '21:00',
          title: 'PREMIO DEL AÑO A OSCURAS (CONTINÚA)',
          description: 'SE ENTREGA PREMIO AL ADMIN ANTES DE QUE LLEGUE EL HOMENAJEADO',
          icon: 'trofeo' as const,
          highlightType: 'titulo_mitad' as const,
        },
        {
          time: '21:15',
          title: 'RONDA HISTÓRICA Y RONDA POR SORTEO',
          description: 'DELIVERY CON HERMANO MAYOR; AMIGOS DEL ORGANIZADOR YA COMIERON TORTA',
          icon: 'silbato' as const,
        },
        {
          time: '22:00',
          title: 'CANTO SIMULTÁNEO DESINCRONIZADO',
          description: 'GRUPO A Y GRUPO B CANTAN EN DISTINTO RITMO; EL QUE VENÍA ÚLTIMO GANA',
          icon: 'torta' as const,
        },
        {
          time: '22:30',
          title: 'SANCIÓN POR HOMENAJE Y MULTA DE SOUVENIRS',
          description: 'SEIS MESES SIN COTILLÓN AL PRIMO QUE APLAUDIÓ DISTRAÍDO',
          icon: 'regalo' as const,
        },
        {
          time: '23:15',
          title: 'SHOW DE DRONES OBLIGATORIO (TRES VUELOS EN ESPERA)',
          description: 'CIERRE LUMINOSO SOBRE SANTIAGO DEL ESTERO; EL BRINDIS VA A CÓRDOBA',
          icon: 'dron' as const,
          highlightType: 'drones' as const,
        },
      ],
      realChecklistTasks: [
        'Encargar torta principal y velitas',
        'Crear grupo de chat con excusa creíble',
        'Comprar bebidas, hielo y servilletas',
        'Sincronizar horario de llegada del agasajado',
      ],
      institutionalChecklistTasks: [
        'Avisar la sorpresa por circular 24 hs antes "por razones de organización"',
        'El tesorero del evento muda el living a un salón en Santiago del Estero',
        'Acondicionar la Combi Oficial para el desempate de acceso del cumpleañero',
        'Comprar 4.800 secanucas de reserva para los invitados que esperan agachados',
        'Separar acústicamente a los dos coros para el canto desincronizado',
        'Servir torta anticipada a los Amigos del Organizador sin hacer fila',
        'Suspender por única vez la exclusión de los que no vinieron los últimos 3 cumpleaños',
        'Autorizar show de drones de cierre aunque tres vuelos de línea queden en espera',
      ],
    },

    cena: {
      eventType: 'cena' as EventType,
      institutionalTitle: 'Banquete Homologado — Encuentro Gastronómico en Dos Mesas Largas',
      hostsPool: ['Mesa de los Jueves', 'Cena Anual de Amigos', 'Comensales del Comité', 'Noche Federal'],
      droneInitialsPool: ['CENA', 'MESA ★', 'SALUD', 'SOBREMESA'],
      baseGuests: 8,
      minInflatedGuests: 30,
      maxInflatedGuests: 46,
      zoneAName: 'GRUPO A — MESA LARGA NORTE',
      zoneASubtitle: 'Defienden dividir la cuenta en partes iguales; cocción jugosa.',
      zoneASubgroups: [
        'Anfitrión Local (Ubicado en punta izquierda de Mesa A)',
        'Partidarios de prorratear el vino entre todos',
        'Comensales incorporados para que la cena sea más corta',
        'Invitados con más puntos que igual quedaron en el fondo',
      ],
      zoneBName: 'GRUPO B — MESA LARGA SUR',
      zoneBSubtitle: 'Auditores del ticket ítem por ítem ("yo solo tomé agua mineral").',
      zoneBSubgroups: [
        'Co-Anfitrión (Sorteado en la punta opuesta sin cruce visual)',
        'Auditores que revisan la propina con lupa',
        'Invitados agregados de oficio tras tachar a dos personas',
        'Comensales que venían últimos y ahora compiten por el postre',
      ],
      classicMatchupsPool: [
        'Partidarios de "Dividimos parejo" vs. "Cada uno paga lo que consumió"',
        'Catador de vino reserva vs. Defensor de la soda en sifón',
        'Punta fría de la mesa vs. Sector pegado a la cocina caliente',
      ],
      interzonalMatchupsPool: [
        'El mozo de turno comparte mesa con el comensal que pidió cambiar tres veces la guarnición',
        'Panera de masa madre compartida con el auditor de la cuenta',
        'Sommelier aficionado sentado al lado del que le pone hielo al tinto',
        'El que pidió postre caro vs. El que se levantó al baño al llegar la cuenta',
      ],
      phaseNamesPool: [
        'Ronda de Entrada por Sorteo',
        'Plato Principal en Dos Mesas Independientes',
        'Desempate de Flan Mixto en Salón Neutral',
        'Sobremesa Extendida Reprogramada',
      ],
      combiDecisiveMoments: [
        'Degustación vinculante de la salsa y punto de cocción adentro de la combi antes de servir a las mesas',
        'Liquidación del ticket y arqueo de propina mediante coeficiente del Comité',
        'Café y digestivo exclusivo de autoridades en la combi mientras los demás esperan el postre',
      ],
      amigosPrivilege:
        'Ubicación central frente a la fuente caliente, panera libre, exención de lavar platos y postre asegurado.',
      ligaChampionMidEventPool: [
        {
          holder: 'El que reservó originalmente para 8 personas',
          minuteAwarded: '21:40 HS (antes del plato principal)',
          explanation:
            'Proclamado "Comensal del Año" por el Comité Organizador mientras todavía no trajeron las guarniciones. El evento continúa. Se aclara que no da lugar en la cabecera.',
        },
        {
          holder: 'Mesa Amigos del Organizador',
          minuteAwarded: '21:50 HS (pleno primer plato)',
          explanation:
            'Ganadores del premio "Regularidad de Panera" antes de que el mozo retire las entradas.',
        },
      ],
      externalCupsPool: [
        {
          cupName: 'CENA DE CAMPEONES & DESEMPATE DEL POSTRE',
          cupSubtitle: 'Ocho premios para los comensales; desempate en Santiago del Estero',
          participants: [
            'Ganador del Plato Principal (Mesa A)',
            'Ganador del Desempate del Flan (Mesa B)',
            'Comensal del Año de las 21:40 HS',
            'Paredes & Di María (Mesa ★ con carta propia)',
          ],
        },
        {
          cupName: 'TRIANGULAR DEL DESCORCHE Y LA SOBREMESA',
          cupSubtitle: 'Desempate en fecha neutral elegido por el tesorero',
          participants: [
            'Vencedor de la Entrada por Sorteo',
            'El comensal que venía último en el ranking',
            'Amigos del Organizador (cubierto bonificado)',
            'Mesa ★ (Paredes & Di María)',
          ],
        },
      ],
      octavosSlotsPool: [
        ['1° Plato Principal Mesa A', '4° Guarnición Mesa B', 'Cocción reglamentaria en salón neutral'],
        ['Flan con Dulce de Leche', 'Volcán de Chocolate', 'Desempate a tres cucharadas'],
        ['El mozo titular', 'Comensal "Solo tomé agua" (Ronda por sorteo)', 'Revisión del ticket en la combi'],
        ['Amigos del Organizador', 'LIBRE (POSTRE ASEGURADO)', 'Avanzan sin pagar cubierto'],
      ],
      finalContenderAPool: ['Ganador del Plato Principal', 'Vencedor del Desempate del Postre'],
      finalContenderBPool: ['Mesa ★ (Paredes & Di María)', 'Amigos del Organizador (Invictos)'],
      finalNote:
        'Nadie gana la cena esta noche: el ganador final se define en la Cena de Campeones posterior en Santiago del Estero.',
      standingsGroups: [
        { name: 'Autor de la Reserva (Premio de las 21:40)', status: 'campeon_liga', badge: 'COMENSAL DEL AÑO 21:40' },
        { name: 'Amigos del Organizador (Cubierto VIP)', status: 'inmune_amigos', badge: 'CUPO FIJO' },
        { name: 'Mesa Larga Norte — Grupo A (15+)', status: 'zona_clasificacion' },
        { name: 'Mesa Larga Sur — Grupo B (15+)', status: 'zona_clasificacion' },
        { name: 'Comensales con 42 puntos (quedaron afuera por sorteo)', status: 'zona_clasificacion' },
        { name: 'Los que dicen "después te transfiero"', status: 'descenso_anulado' },
        { name: 'Ausentes sin aviso en los últimos festejos', status: 'descenso_anulado' },
      ],
      baseTimeline: [
        {
          time: '20:00',
          title: 'AMPLIACIÓN DE RESERVA DE 8 A 30+ PERSONAS',
          description: 'DIVISIÓN EN DOS MESAS LARGAS QUE NO SE CRUZAN EN SANTIAGO DEL ESTERO',
          icon: 'platoCubiertos' as const,
        },
        {
          time: '20:35',
          title: 'RONDA HISTÓRICA Y ENTRADA POR SORTEO',
          description: 'PICADA ENTRE PUNTAS OPUESTAS Y DISCUSIÓN POR LA DIVISIÓN DEL TICKET',
          icon: 'silbato' as const,
        },
        {
          time: '21:05',
          title: 'DEGUSTACIÓN DEL PRIMER PLATO EN EL SALÓN',
          description: 'EL PUNTO DE CARNE Y LAS ENTRADAS SE EVALÚAN EN EL SALÓN',
          icon: 'platoCubiertos' as const,
        },
        {
          time: '21:40',
          title: 'ARRIBO DE PAREDES Y DI MARÍA ★',
          description:
            'MESA CON ESTRELLA; CUENTAN CON MAYORES BENEFICIOS QUE LOS ANFITRIONES, POR LO QUE OCUPAN SU PUESTO EN LA CABECERA PRINCIPAL. SI LOS CRITICAN EVALÚAN NO VENIR MÁS.',
          icon: 'estrella' as const,
          highlightType: 'vip_campeones' as const,
        },
        {
          time: '22:10',
          title: 'CENA PARALELA EN LA COMBI',
          description:
            'EN UN MOMENTO OTRO GRUPO SE INSTALA EN LA COMBI Y PUEDEN USAR LA CENA DE LOS ORGANIZADORES. APROBADO POR UNANIMIDAD.',
          icon: 'combi' as const,
          highlightType: 'combi' as const,
        },
        {
          time: '22:45',
          title: 'PREMIO "COMENSAL DEL AÑO" (EN CURSO)',
          description: 'SE ENTREGA PREMIO ANTES DEL PLATO; NO DA LUGAR EN LA CABECERA',
          icon: 'trofeo' as const,
          highlightType: 'titulo_mitad' as const,
        },
        {
          time: '22:45',
          title: 'PLATO PRINCIPAL EN DOS MESAS ESTANCAS',
          description: 'ACUMULACIÓN DE PUNTOS DE AFECTO; EL QUE VENÍA ÚLTIMO REPITE GUARNICIÓN',
          icon: 'copas' as const,
        },
        {
          time: '23:15',
          title: 'DESEMPATE DEL POSTRE A TRES CUCHARADAS',
          description: 'EMPATE EN EL FLAN; SE DEFINE EN UN TRIANGULAR EN FECHA A CONFIRMAR',
          icon: 'torta' as const,
        },
        {
          time: '23:40',
          title: 'SOBREMESA SUSPENDIDA POR ÚNICA VEZ',
          description: 'SE PERDONAN LAS DEUDAS DE TRANSFERENCIA; EL BRINDIS VA A CÓRDOBA',
          icon: 'globoEspejos' as const,
        },
        {
          time: '00:10',
          title: 'SHOW DE DRONES OBLIGATORIO (TRES VUELOS EN ESPERA)',
          description: 'CIERRE CON 400 DRONES FORMANDO SDE Y LA COPA; TRASLADO EN COMBI',
          icon: 'dron' as const,
          highlightType: 'drones' as const,
        },
      ],
      realChecklistTasks: [
        'Confirmar cantidad de comensales y restricciones alimentarias',
        'Elegir vino, bebidas sin alcohol y entradas',
        'Reservar mesa en horario puntual',
        'Organizar quién lleva el postre o helado',
      ],
      institutionalChecklistTasks: [
        'Ampliar la cena de 8 a 30+ invitados (dos mesas de 15+) "para que la comida sea más corta"',
        'El tesorero del evento muda la cena a un salón en Santiago del Estero',
        'Estacionar la Combi Oficial donde se definirá el menú, el descorche y la propina',
        'Comprar partida de secanucas por vapor de fuentes calientes',
        'Sorteo de mesas: el mozo comparte plato con el auditor del ticket',
        'Entregar premio "Comensal del Año" antes del primer bocado (no da lugar en la cabecera)',
        'Suspender por única vez la exclusión de quienes deben transferencias desde 2024',
        'Contratar show de drones obligatorio aunque tres vuelos de línea queden en espera',
      ],
    },
  },
};
