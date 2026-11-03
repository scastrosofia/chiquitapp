import type { EventType, IconName } from '../engine/types';
import { COPY } from './copy';

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
  octavosSlotsPool: readonly (readonly string[])[];
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
    ...COPY.eventContent.casamiento,
    cardTitle: COPY.eventSelect.cards.casamiento.title,
    cardSubtitle: COPY.eventSelect.cards.casamiento.subtitle,
    cardIcon: 'anillos',
    amigosPrivilege: COPY.eventContent.casamiento.amigosPrivilege,
    standingsGroups: COPY.eventContent.casamiento.standingsGroups as EventContentTemplate['standingsGroups'],
  },
  cumpleanos: {
    ...COPY.eventContent.cumpleanos,
    cardTitle: COPY.eventSelect.cards.cumpleanos.title,
    cardSubtitle: COPY.eventSelect.cards.cumpleanos.subtitle,
    cardIcon: 'torta',
    amigosPrivilege: COPY.eventContent.cumpleanos.amigosPrivilege,
    standingsGroups: COPY.eventContent.cumpleanos.standingsGroups as EventContentTemplate['standingsGroups'],
  },
  cena: {
    ...COPY.eventContent.cena,
    cardTitle: COPY.eventSelect.cards.cena.title,
    cardSubtitle: COPY.eventSelect.cards.cena.subtitle,
    cardIcon: 'platoCubiertos',
    amigosPrivilege: COPY.eventContent.cena.amigosPrivilege,
    standingsGroups: COPY.eventContent.cena.standingsGroups as EventContentTemplate['standingsGroups'],
  },
};
