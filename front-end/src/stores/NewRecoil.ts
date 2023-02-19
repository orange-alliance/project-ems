import { clientFetcher } from '@toa-lib/client';
import {
  Day,
  defaultDay,
  defaultEventSchedule,
  Event,
  EventSchedule,
  isEventArray,
  isMatchArray,
  isMatchParticipantArray,
  isScheduleItemArray,
  isTeamArray,
  isTournamentArray,
  Match,
  MatchState,
  reconcileMatchParticipants,
  ScheduleItem,
  Team,
  Tournament
} from '@toa-lib/models';
import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily
} from 'recoil';
import { replaceAllInArray, replaceInArray } from './Util';

/**
 * @section UI STATE
 * Recoil state management for global UI interactions
 */
export const snackbarOpenAtom = atom<boolean>({
  key: 'snackbarOpenAtom',
  default: false
});
export const snackbarMessageAtom = atom<string>({
  key: 'snackbarMessageAtom',
  default: ''
});

/**
 * @section SELECTION STATE
 * Recoil state management for selecting data
 */
export const currentEventKeySelector = selector<string>({
  key: 'currentEventKeySelector',
  get: () => {
    const [, eventKey] = window.location.pathname.split('/');
    return eventKey;
  }
});

export const currentEventSelector = selector<Event | null>({
  key: 'currentEventSelector',
  get: ({ get }) =>
    get(eventsAtom).find((e) => e.eventKey === get(currentEventKeySelector)) ??
    null,
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue || !newValue) return;
    const events = get(eventsAtom);
    const eventKey = get(currentEventKeySelector);
    const newEvents = replaceInArray(events, 'eventKey', eventKey, newValue);
    set(eventsAtom, newEvents ?? events);
  }
});

export const currentTeamKeyAtom = atom<number | null>({
  key: 'currentTeamKeyAtom',
  default: null
});

export const currentTeamSelector = selector<Team | null>({
  key: 'currentTeamSelector',
  get: ({ get }) => {
    const teamKey = get(currentTeamKeyAtom);
    const eventKey = get(currentEventKeySelector);
    const team = get(teamsByEventAtomFam(eventKey));
    return (
      team.find((t) => t.teamKey === teamKey && t.eventKey === eventKey) ?? null
    );
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue || !newValue) return;
    const teams = get(teamsByEventAtomFam(newValue.eventKey));
    const newTeams = replaceInArray(
      teams,
      'teamKey',
      newValue.teamKey,
      newValue
    );
    set(teamsByEventAtomFam(newValue.eventKey), newTeams ?? teams);
  }
});

/**
 * @section EVENT STATE
 * Recoil state management for various events
 */
// Private selector that shouldn't be globally available
const eventsSelector = selector<Event[]>({
  key: 'eventsSelector',
  get: async () => {
    try {
      return await clientFetcher('event', 'GET', undefined, isEventArray);
    } catch (e) {
      console.log(e);
      return [];
    }
  }
});

export const eventsAtom = atom<Event[]>({
  key: 'eventsAtom',
  default: eventsSelector
});

/**
 * @section TEAM STATE
 * Recoil state management for teams
 */
const teamsByEventSelectorFam = selectorFamily<Team[], string>({
  key: 'teamsByEventSelectorFam',
  get: (eventKey: string) => async (): Promise<Team[]> => {
    try {
      return await clientFetcher(
        `teams/${eventKey}`,
        'GET',
        undefined,
        isTeamArray
      );
    } catch (e) {
      return [];
    }
  }
});

export const teamsByEventAtomFam = atomFamily<Team[], string>({
  key: 'teamsByEventAtomFam',
  default: teamsByEventSelectorFam
});

/**
 * @section TOURNAMENT STATE
 * Recoil state management for tournaments
 */
export const tournamentsByEventSelectorFam = selectorFamily<
  Tournament[],
  string
>({
  key: 'tournamentsByEventSelectorFam',
  get: (eventKey: string) => async (): Promise<Tournament[]> => {
    try {
      return await clientFetcher(
        `tournament/${eventKey}`,
        'GET',
        undefined,
        isTournamentArray
      );
    } catch (e) {
      return [];
    }
  }
});

export const tournamentsByEventAtomFam = atomFamily<Tournament[], string>({
  key: 'tournamentsByEventAtomFam',
  default: tournamentsByEventSelectorFam
});

export const currentTournamentKeyAtom = atom<string | null>({
  key: 'currentTournamentKeyAtom',
  default: null
});

export const currentTournamentSelector = selector<Tournament | null>({
  key: 'currentTournamentSelector',
  get: ({ get }) => {
    const tournamentKey = get(currentTournamentKeyAtom);
    const eventKey = get(currentEventKeySelector);
    const tournaments = get(tournamentsByEventAtomFam(eventKey));
    return (
      tournaments.find(
        (t) => t.tournamentKey === tournamentKey && t.eventKey === eventKey
      ) ?? null
    );
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue || !newValue) return;
    const tournaments = get(tournamentsByEventAtomFam(newValue.eventKey));
    const newTeams = replaceInArray(
      tournaments,
      'tournamentKey',
      newValue.tournamentKey,
      newValue
    );
    set(tournamentsByEventAtomFam(newValue.eventKey), newTeams ?? tournaments);
  }
});

/**
 * @section TOURNAMENT SCHEDULE STATE
 * Recoil state management for tournament schedules
 */
export const schedulesByEventSelectorFam = selectorFamily<
  EventSchedule[],
  string
>({
  key: 'schedulesByEventSelectorFam',
  get: (eventKey: string) => async (): Promise<EventSchedule[]> => {
    try {
      // TODO - Need a better way to find all schedules.
      return await clientFetcher(`storage/${eventKey}.json`, 'GET');
    } catch (e) {
      return [];
    }
  }
});

export const schedulesByEventAtomFam = atomFamily<EventSchedule[], string>({
  key: 'schedulesByEventAtomFam',
  default: schedulesByEventSelectorFam
});

export const currentScheduleByTournamentSelector = selector<EventSchedule>({
  key: 'currentScheduleByTournamentSelector',
  get: ({ get }) => {
    const tournament = get(currentTournamentSelector);
    const schedules = get(schedulesByEventAtomFam(tournament?.eventKey ?? ''));
    return (
      schedules.find((s) => s.tournamentKey === tournament?.tournamentKey) ??
      defaultEventSchedule
    );
  },
  set: ({ get, set }, newValue) => {
    const tournament = get(currentTournamentSelector);
    const schedules = get(schedulesByEventAtomFam(tournament?.eventKey ?? ''));
    const currentSchedule = schedules.find(
      (s) => s.tournamentKey === tournament?.tournamentKey
    );
    if (!currentSchedule || newValue instanceof DefaultValue || !newValue) {
      return;
    }
    const newSchedules = replaceInArray(
      schedules,
      'tournamentKey',
      currentSchedule.tournamentKey,
      newValue
    );
    set(
      schedulesByEventAtomFam(currentSchedule.eventKey),
      newSchedules ?? schedules
    );
  }
});

export const currentScheduledTeamsSelector = selector<Team[]>({
  key: 'currentScheduledTeams',
  get: ({ get }) => {
    return get(currentScheduleByTournamentSelector)?.teams ?? [];
  },
  set: ({ get, set }, newValue) => {
    const schedule = get(currentScheduleByTournamentSelector);
    if (!schedule || newValue instanceof DefaultValue) return;
    set(currentScheduleByTournamentSelector, {
      ...schedule,
      teams: newValue,
      teamsParticipating: newValue.length
    });
  }
});

// TODO - Need day/daybreak mutable selector
export const currentScheduleDaySelectorFam = selectorFamily<Day, number>({
  key: 'currentScheduleDaySelectorFam',
  get:
    (id: number) =>
    ({ get }) => {
      return get(currentScheduleByTournamentSelector).days[id];
    },
  set:
    (id: number) =>
    ({ set }, newValue) => {
      const newDay = newValue instanceof DefaultValue ? defaultDay : newValue;
      set(currentScheduleByTournamentSelector, (prev) => ({
        ...prev,
        days: replaceInArray(prev.days, 'id', id, newDay) ?? prev.days
      }));
    }
});

/**
 * @section SCHEDULE ITEM STATE
 * Recoil state management for schedule items
 */
export const scheduleItemsByEventSelectorFam = selectorFamily<
  ScheduleItem[],
  string
>({
  key: 'scheduleItemsByEventSelectorFam',
  get: (eventKey: string) => async (): Promise<ScheduleItem[]> => {
    try {
      return await clientFetcher(
        `schedule/${eventKey}`,
        'GET',
        undefined,
        isScheduleItemArray
      );
    } catch (e) {
      return [];
    }
  }
});

export const scheduleItemsByEventAtomFam = atomFamily<ScheduleItem[], string>({
  key: 'scheduleItemsByEventAtomFam',
  default: scheduleItemsByEventSelectorFam
});

export const currentScheduleItemsByTournamentSelector = selector<
  ScheduleItem[]
>({
  key: 'currentScheduleItemsByTournamentSelector',
  get: ({ get }) => {
    const eventKey = get(currentEventKeySelector);
    const tournamentKey = get(currentTournamentKeyAtom);
    return get(scheduleItemsByEventAtomFam(eventKey)).filter(
      (i) => i.tournamentKey === tournamentKey
    );
  },
  set: ({ set, get }, newValue) => {
    const eventKey = get(currentEventKeySelector);
    const tournamentKey = get(currentTournamentKeyAtom);
    if (!eventKey || !tournamentKey || newValue instanceof DefaultValue) {
      return [];
    }
    const scheduleItems = get(scheduleItemsByEventAtomFam(eventKey));
    set(
      scheduleItemsByEventAtomFam(eventKey),
      replaceAllInArray(scheduleItems, 'tournamentKey', tournamentKey, newValue)
    );
  }
});

/**
 * @section MATCH STATE
 * Recoil state management for matches
 */
export const matchStateAtom = atom<MatchState>({
  key: 'matchStateAtom',
  default: MatchState.MATCH_NOT_SELECTED
});

export const matchStatusAtom = atom<string>({
  key: 'matchStatusAtom',
  default: 'NO MATCH SELECTED'
});

export const currentMatchKeyAtom = atom<string | null>({
  key: 'currentMatchKeyAtom',
  default: null
});

export const matchesByEventSelectorFam = selectorFamily<Match<any>[], string>({
  key: 'matchesByEventSelectorFam',
  get: (eventKey: string) => async (): Promise<Match<any>[]> => {
    try {
      const matches = await clientFetcher(
        `match/${eventKey}`,
        'GET',
        undefined,
        isMatchArray
      );
      const participants = await clientFetcher(
        `match/participants/${eventKey}`,
        'GET',
        undefined,
        isMatchParticipantArray
      );
      return reconcileMatchParticipants(matches, participants);
    } catch (e) {
      return [];
    }
  }
});

export const matchesByEventAtomFam = atomFamily<Match<any>[], string>({
  key: 'matchesByEventSelectorFam',
  default: matchesByEventSelectorFam
});

export const matchesByTournamentSelector = selector<Match<any>[]>({
  key: 'matchesByTournamentSelector',
  get: ({ get }) => {
    const tournament = get(currentTournamentSelector);
    if (!tournament) return [];
    return get(matchesByEventAtomFam(tournament.eventKey)).filter(
      (m) => m.tournamentKey === tournament.tournamentKey
    );
  },
  set: ({ get, set }, newValue) => {
    const tournament = get(currentTournamentSelector);
    if (!tournament || newValue instanceof DefaultValue) return;
    const matches = get(matchesByEventAtomFam(tournament.eventKey));
    set(
      matchesByEventAtomFam(tournament.eventKey),
      replaceAllInArray(
        matches,
        'tournamentKey',
        tournament.tournamentKey,
        newValue
      )
    );
  }
});
