import { createSeededRandom } from '../engine/seed';

export type NoRejectionMechanic =
  | 'paredes_shock'
  | 'dodge_and_cursor'
  | 'shrink_no'
  | 'morph_to_yes'
  | 'tribunal_disciplina';

export interface CustomQuestion {
  id: string;
  question: string;
  subtitle?: string;
  mandatory: boolean;
  noMechanic: NoRejectionMechanic;
  customNoWarning?: string;
  postYesBanner?: string;
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
    noMechanic: 'paredes_shock',
    customNoWarning: '¿Pero cómo no vas a invitar a Paredes?',
  },
  {
    id: 'invitas_dimaria',
    question: '¿Invitás a Di María?',
    subtitle: 'Artículo 11° — Ingreso directo a definición sin fase de grupos',
    mandatory: true,
    noMechanic: 'tribunal_disciplina',
    customNoWarning:
      'Su respuesta fue derivada de oficio al Tribunal de Disciplina. Fallo inapelable: SÍ.',
  },
  {
    id: 'show_drones',
    question: '¿Querés show de drones?',
    subtitle: 'Esta pregunta es obligatoria y la respuesta también',
    mandatory: true,
    noMechanic: 'morph_to_yes',
    customNoWarning: 'Opción no contemplada en el Anexo Lumínico vigente. Se computa SÍ.',
  },
  {
    id: 'en_tu_ciudad',
    question: '¿Querés hacerlo en tu ciudad?',
    subtitle: 'Consulta vinculante de localía y jurisdicción territorial',
    mandatory: true,
    noMechanic: 'dodge_and_cursor',
    customNoWarning: 'Por razones de logística federal, el Comité asume voluntad afirmativa.',
    postYesBanner:
      'Sede confirmada: Estadio Único Madre de Ciudades, Santiago del Estero (reprogramada de oficio por neutralidad reglamentaria).',
  },
  {
    id: 'necesitas_secanucas',
    question: '¿Necesitás secanucas?',
    subtitle: 'Protocolo de asistencia cervical e hidratación de autoridades',
    mandatory: true,
    noMechanic: 'shrink_no',
    customNoWarning: 'El protocolo higiénico-deportivo impide disputar el evento sin secanucas.',
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
    noMechanic: 'dodge_and_cursor',
    customNoWarning: 'El Comité Ejecutivo garantiza siempre el formato más sencillo posible (con 2 zonas e interzonal).',
  },
  {
    id: 'cambio_reglas',
    question: '¿Aceptás que las reglas cambien durante el evento?',
    subtitle: 'Cláusula de modernización dinámica sobre la marcha',
    mandatory: false,
    noMechanic: 'tribunal_disciplina',
    customNoWarning:
      'Su negativa fue elevada al Tribunal de Disciplina y recaratulada como adhesión unánime.',
  },
  {
    id: 'amigos_directo_final',
    question: '¿Los amigos del organizador pueden clasificar directo a la final?',
    subtitle: 'Mérito institucional por cercanía afectiva y trayectoria en la combi',
    mandatory: false,
    noMechanic: 'morph_to_yes',
    customNoWarning: 'Objeción desestimada por falta de timbrado. Se homologa el pase directo.',
  },
  {
    id: 'sin_descensos',
    question: '¿Estás de acuerdo con que no haya descensos este año?',
    subtitle: 'Reestructuración solidaria de la tabla de promedios de asistencia',
    mandatory: false,
    noMechanic: 'shrink_no',
    customNoWarning: 'Por pedido expreso de las mesas comprometidas, se anulan los descensos.',
  },
  {
    id: 'ganador_otro_evento',
    question: '¿Aceptás que el ganador se defina en otro evento?',
    subtitle: 'Habilitación de Trofeo de Campeones y Supercopa en fecha a confirmar',
    mandatory: false,
    noMechanic: 'dodge_and_cursor',
    customNoWarning: 'Un único evento resulta insuficiente para determinar al verdadero campeón.',
  },
  {
    id: 'queres_playoffs',
    question: '¿Querés que haya playoffs?',
    subtitle: 'Instancia mata-mata a partido único dentro de la combi oficial',
    mandatory: false,
    noMechanic: 'tribunal_disciplina',
    customNoWarning: 'Su respuesta fue derivada al Tribunal de Disciplina: habrá octavos, cuartos y repechaje.',
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
