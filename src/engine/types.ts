export type EventType = 'casamiento' | 'cumpleanos' | 'cena';

export type OrganizacionMode = 'simple' | 'personalizada';

export type IconName =
  | 'anillos'
  | 'camara'
  | 'copas'
  | 'torta'
  | 'globoEspejos'
  | 'fuegosArtificiales'
  | 'regalo'
  | 'platoCubiertos'
  | 'pelota'
  | 'silbato'
  | 'trofeo'
  | 'estrella'
  | 'dron'
  | 'tribuna'
  | 'selloOficial'
  | 'combi';

export type MutationType =
  | 'reconfigurar_zonas'
  | 'agregar_supercopa'
  | 'refuerzo_secanucas_combi';

export interface EventInitialDetails {
  hosts: string;
  baseGuests: number;
}

export interface UserAnswers {
  secanucasRequested: number;
  answersById: Record<string, boolean>;
}

export interface TimelineMilestone {
  id: string;
  fechaCode: string;
  time: string;
  title: string;
  description: string;
  icon: IconName;
  highlightType?: 'vip_campeones' | 'combi' | 'titulo_mitad' | 'drones' | 'modificado';
}

export interface ChecklistTask {
  id: string;
  text: string;
  checkedByDefault: boolean;
  isInstitutional: boolean;
}

export interface CountdownMonthBlock {
  periodLabel: string;
  anexoCode: string;
  tasks: ChecklistTask[];
}

export interface ZoneSide {
  code: 'A' | 'B';
  name: string;
  subtitle: string;
  participantsCount: number;
  tablesLabel: string;
  subgroups: string[];
}

export interface ZonesData {
  phaseTitle: string;
  zoneA: ZoneSide;
  zoneB: ZoneSide;
  campeonesDelMundo: {
    title: string;
    guests: [string, string];
    tableName: string;
    privilegeText: string;
  };
  amigosDelOrganizador: {
    title: string;
    guestsCount: number;
    privilegeText: string;
  };
  combiOficial: {
    title: string;
    vehicleSpec: string;
    decisiveEvents: string[];
  };
  fechaClasicos: {
    label: string;
    matchup: string;
  };
  fechaInterzonal: {
    label: string;
    matchup: string;
  };
  isModifiedByResolution: boolean;
  modificationNote?: string;
}

export interface BracketMatch {
  id: string;
  stageCode: string;
  slotA: string;
  slotB: string;
  conditionNote: string;
  isVipOrBye?: boolean;
}

export interface BracketData {
  octavos: BracketMatch[];
  semifinales: BracketMatch[];
  finalDelEvento: {
    title: string;
    contenderA: string;
    contenderB: string;
    resolutionNote: string;
  };
  externalTournament: {
    cupName: string;
    cupSubtitle: string;
    participants: string[];
    venue: string;
    extraInstance?: string;
  };
  isModifiedByResolution: boolean;
}

export interface StandingRow {
  pos: number;
  sectorName: string;
  pj: number;
  pts: number;
  promedio: string;
  badge?: string;
  status: 'campeon_liga' | 'zona_clasificacion' | 'inmune_amigos' | 'descenso_anulado';
}

export interface StandingsData {
  tableTitle: string;
  midEventChampionDeclaration: string;
  rows: StandingRow[];
  relegationFootnote: string;
}

export interface RouteData {
  originLabel: string;
  destinationVenue: string;
  destinationCity: string;
  distanceKm: number;
  estimatedTime: string;
  combiStopover: string;
  decreeNote: string;
}

export interface SecanucasBreakdown {
  requestedByUser: number;
  perZoneFactor: number;
  interzonalReserve: number;
  combiEscort: number;
  committeeQuota: number;
  emergencyAddition: number;
  totalHomologated: number;
}

export interface BudgetItem {
  id: string;
  category: string;
  percentage: number;
  detail: string;
  isPrimaryHighlight: boolean;
}

export interface BudgetData {
  secanucas: SecanucasBreakdown;
  items: BudgetItem[];
  isModifiedByResolution: boolean;
}

export interface CommitteeMemberNode {
  id: string;
  role: string;
  department: string;
  resolutionVote: string;
  tier: 'presidencia' | 'secretaria' | 'subcomision';
}

export interface DroneFormation {
  id: 'sancor' | 'copa' | 'estrella' | 'anfitriones' | 'sde' | 'corazon';
  label: string;
  textValue?: string;
  caption: string;
}

export interface RuleChangeResolution {
  id: string;
  resolutionNumber: number;
  boletinHeader: string;
  title: string;
  body: string;
  impactSummary: string;
  mutation: MutationType;
  affectedSections: Array<'zonas' | 'bracket' | 'presupuesto' | 'timeline'>;
}

export interface ChiquiTapPlan {
  eventType: EventType;
  eventDisplayName: string;
  mode: OrganizacionMode;
  seed: number;
  formatNumber: number;
  expedienteCode: string;
  anexosCount: number;
  hostsScriptTitle: string;
  eventDateCaption: string;
  venueOfficial: string;
  baseGuests: number;
  inflatedGuests: number;
  inflationJustification: string;
  combiManifesto: string;
  ligaChampionMidEvent: {
    holder: string;
    minuteAwarded: string;
    explanation: string;
  };
  externalChampionSummary: {
    tournament: string;
    explanation: string;
  };
  timeline: TimelineMilestone[];
  countdown: CountdownMonthBlock[];
  zones: ZonesData;
  bracket: BracketData;
  standings: StandingsData;
  route: RouteData;
  budget: BudgetData;
  committee: CommitteeMemberNode[];
  droneFormations: DroneFormation[];
  scheduledResolutions: RuleChangeResolution[];
  appliedMutations: MutationType[];
}
