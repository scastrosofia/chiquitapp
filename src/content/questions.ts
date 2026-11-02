import { createSeededRandom } from '../engine/seed';

export type RejectionMechanic =
  | 'paredes_shock'
  | 'dodge_and_cursor'
  | 'shrink_clicked'
  | 'morph_opposite'
  | 'tribunal_disciplina';

export interface CustomQuestion {
  id: string;
  question: string;
  subtitle?: string;
  mandatory: boolean;
  mechanic: RejectionMechanic;
  warningWhenNo: string;
  warningWhenYes: string;
  postApprovalBanner?: string;
  requiresNumericFollowup?: {
    prompt: string;
    placeholder: string;
    defaultVal: number;
  };
}

export const ALL_CUSTOM_QUESTIONS: readonly CustomQuestion[] = [
  {
    id: 'invitas_paredes',
    question: '¿Invitás a Paredes?',
    subtitle: 'Artículo 5° — Cupo obligatorio Zona Campeones del Mundo',
    mandatory: true,
    mechanic: 'paredes_shock',
    warningWhenNo: '¿Pero cómo no vas a invitar a Paredes? Se computa SÍ.',
    warningWhenYes:
      'Su invitación particular fue rechazada: a Paredes lo acredita exclusivamente el Comité por Zona Campeones. Se computa NO.',
  },
  {
    id: 'invitas_dimaria',
    question: '¿Invitás a Di María?',
    subtitle: 'Artículo 11° — Ingreso directo a definición sin fase de grupos',
    mandatory: true,
    mechanic: 'tribunal_disciplina',
    warningWhenNo:
      'Su respuesta fue derivada de oficio al Tribunal de Disciplina. Fallo inapelable: SÍ.',
    warningWhenYes:
      'Su respuesta fue derivada al Tribunal de Disciplina: Di María ingresa de oficio sin usar su lista. Se computa NO.',
  },
  {
    id: 'show_drones',
    question: '¿Querés show de drones?',
    subtitle: 'Esta pregunta es obligatoria y la respuesta contraria también',
    mandatory: true,
    mechanic: 'morph_opposite',
    warningWhenNo:
      'Opción no contemplada en el Anexo Lumínico vigente. Se computa SÍ.',
    warningWhenYes:
      'Pedido particular denegado: el Show de Drones se ejecuta por decreto aéreo del Comité, no a solicitud suya. Se computa NO.',
  },
  {
    id: 'en_tu_ciudad',
    question: '¿Querés hacerlo en tu ciudad?',
    subtitle: 'Consulta vinculante de localía y jurisdicción territorial',
    mandatory: true,
    mechanic: 'dodge_and_cursor',
    warningWhenNo:
      'El Comité rechaza su negativa para darse el gusto de reprogramar personalmente la sede. Se computa SÍ.',
    warningWhenYes:
      'Solicitud de localía denegada por falta de neutralidad interprovincial. Se computa NO.',
    postApprovalBanner:
      'Sede confirmada: Estadio Único Madre de Ciudades, Santiago del Estero (reprogramada de oficio por neutralidad reglamentaria).',
  },
  {
    id: 'necesitas_secanucas',
    question: '¿Necesitás secanucas?',
    subtitle: 'Protocolo de asistencia cervical e hidratación de autoridades',
    mandatory: true,
    mechanic: 'shrink_clicked',
    warningWhenNo:
      'El protocolo higiénico-deportivo impide disputar el evento sin secanucas. Se computa SÍ.',
    warningWhenYes:
      'Rechazado el pedido individual: la provisión pasa a órbita mayorista del Comité Ejecutivo. Se computa NO.',
    requiresNumericFollowup: {
      prompt: '¿Cuántos vas a necesitar?',
      placeholder: 'Ej: 2',
      defaultVal: 2,
    },
  },
  {
    id: 'formato_sencillo',
    question: '¿Querés un formato sencillo?',
    subtitle: 'Homologación de estructura competitiva de comprensión inmediata',
    mandatory: false,
    mechanic: 'dodge_and_cursor',
    warningWhenNo:
      'El Comité garantiza el formato más sencillo posible (2 zonas, interzonal y repechaje). Se computa SÍ.',
    warningWhenYes:
      'Propuesta desestimada por falta de mística reglamentaria. Se computa NO.',
  },
  {
    id: 'cambio_reglas',
    question: '¿Aceptás que las reglas cambien durante el evento?',
    subtitle: 'Cláusula de modernización dinámica sobre la marcha',
    mandatory: false,
    mechanic: 'tribunal_disciplina',
    warningWhenNo:
      'Su negativa fue elevada al Tribunal de Disciplina y recaratulada como adhesión unánime: SÍ.',
    warningWhenYes:
      'El Comité no requiere su consentimiento previo para cambiar el reglamento en curso. Se computa NO.',
  },
  {
    id: 'amigos_directo_final',
    question: '¿Los amigos del organizador pueden clasificar directo a la final?',
    subtitle: 'Mérito institucional por cercanía afectiva y trayectoria en la combi',
    mandatory: false,
    mechanic: 'morph_opposite',
    warningWhenNo:
      'Objeción desestimada por falta de timbrado. Se homologa SÍ.',
    warningWhenYes:
      'Se registra NO en actas públicas y se les otorga el bye directo por anexo reservado en la combi.',
  },
  {
    id: 'sin_descensos',
    question: '¿Estás de acuerdo con que no haya descensos este año?',
    subtitle: 'Reestructuración solidaria de la tabla de promedios de asistencia',
    mandatory: false,
    mechanic: 'shrink_clicked',
    warningWhenNo:
      'Por pedido expreso de las mesas comprometidas, se anulan los descensos. Se computa SÍ.',
    warningWhenYes:
      'Se vota NO ahora para poder anularlos sorpresivamente durante el postre. Se computa NO.',
  },
  {
    id: 'ganador_otro_evento',
    question: '¿Aceptás que el ganador se defina en otro evento?',
    subtitle: 'Habilitación de Trofeo de Campeones y Supercopa en fecha a confirmar',
    mandatory: false,
    mechanic: 'dodge_and_cursor',
    warningWhenNo:
      'Un único evento resulta insuficiente para determinar al verdadero campeón. Se computa SÍ.',
    warningWhenYes:
      'Se computa NO en fase regular y se habilita igual el Trofeo de Campeones por boletín complementario.',
  },
  {
    id: 'queres_playoffs',
    question: '¿Querés que haya playoffs?',
    subtitle: 'Instancia mata-mata a partido único dentro de la combi oficial',
    mandatory: false,
    mechanic: 'tribunal_disciplina',
    warningWhenNo:
      'Su respuesta fue derivada al Tribunal de Disciplina: habrá octavos, cuartos y repechaje. Se computa SÍ.',
    warningWhenYes:
      'Se rechazan los playoffs tradicionales para disputar Reducido Cruzado en Combi. Se computa NO.',
  },
];

/**
 * Selects between 9 and 11 questions in shuffled order, always guaranteeing all 5 mandatory (*) questions.
 */
export function buildQuestionSequence(seed: number): CustomQuestion[] {
  const rng = createSeededRandom(seed);
  const mandatory = ALL_CUSTOM_QUESTIONS.filter((q) => q.mandatory);
  const optional = rng.shuffle(ALL_CUSTOM_QUESTIONS.filter((q) => !q.mandatory));
  const totalCount = rng.int(9, 11); // always 9, 10, or 11
  const neededOptional = Math.min(optional.length, totalCount - mandatory.length);
  const combined = [...mandatory, ...optional.slice(0, neededOptional)];
  return rng.shuffle(combined);
}
