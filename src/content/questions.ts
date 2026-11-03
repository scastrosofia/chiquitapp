import { COPY } from './copy';
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
  noWarning: string;
  responseAfterForcedYes: string | ((requested: number, inflated: number) => string);
  postApprovalBanner?: string;
  numericFollowup?: {
    prompt: string;
    placeholder: string;
    defaultVal: number;
  };
}

export const ALL_CUSTOM_QUESTIONS: readonly CustomQuestion[] = COPY.questions.pool.map((q, idx) => {
  const mechanics: RejectionMechanic[] = [
    'paredes_shock',
    'tribunal_disciplina',
    'dodge_and_cursor',
    'morph_opposite',
    'shrink_clicked',
    'shrink_clicked',
    'dodge_and_cursor',
    'morph_opposite',
    'tribunal_disciplina',
    'shrink_clicked',
    'dodge_and_cursor',
    'dodge_and_cursor',
    'tribunal_disciplina',
    'morph_opposite',
  ];

  return {
    id: q.id,
    question: q.question,
    subtitle: q.subtitle,
    mandatory: true,
    mechanic: mechanics[idx % mechanics.length],
    noWarning: q.noWarning,
    responseAfterForcedYes: q.responseAfterForcedYes,
    postApprovalBanner: 'postApprovalBanner' in q ? q.postApprovalBanner : undefined,
    numericFollowup: 'numericFollowup' in q ? q.numericFollowup : undefined,
  };
});

/**
 * Builds the question sequence for the personalized mode:
 * Takes the core questions, shuffles the middle ones based on seed,
 * and always places the 3 consecutive "¿Estamos todos de acuerdo?" at the end.
 */
export function buildQuestionSequence(seed: number): CustomQuestion[] {
  const rng = createSeededRandom(seed);
  const pool = [...ALL_CUSTOM_QUESTIONS];

  // The 3 consecutive "¿Estamos todos de acuerdo?"
  const deAcuerdo = pool.filter((q) => q.id.startsWith('de_acuerdo_'));
  const others = pool.filter((q) => !q.id.startsWith('de_acuerdo_'));

  // Mandatory questions always included
  const paredes = others.find((q) => q.id === 'invitas_paredes')!;
  const dimaria = others.find((q) => q.id === 'invitas_dimaria')!;
  const amigoSalon = others.find((q) => q.id === 'amigo_salon')!;
  const drones = others.find((q) => q.id === 'show_drones')!;
  const secanucas = others.find((q) => q.id === 'necesitas_secanucas')!;

  const remaining = others.filter(
    (q) => !['invitas_paredes', 'invitas_dimaria', 'amigo_salon', 'show_drones', 'necesitas_secanucas'].includes(q.id)
  );

  const shuffledRemaining = rng.shuffle(remaining);
  const coreQuestions = rng.shuffle([paredes, dimaria, amigoSalon, drones, secanucas, ...shuffledRemaining]);

  // Combined: core questions followed by the 3 consecutive "¿Estamos todos de acuerdo?"
  return [...coreQuestions, ...deAcuerdo];
}
