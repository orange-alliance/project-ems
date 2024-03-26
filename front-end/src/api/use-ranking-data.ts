import { apiFetcher } from '@toa-lib/client';
import { Team, Ranking, rankingZod } from '@toa-lib/models';

export const createRankings = (
  tournamentKey: string,
  teams: Team[]
): Promise<void> =>
  apiFetcher(`ranking/create/${tournamentKey}`, 'POST', teams);

export const postRankings = (
  eventKey: string,
  rankings: Ranking[]
): Promise<void> => apiFetcher(`ranking/${eventKey}`, 'POST', rankings);

export const recalculateRankings = (
  eventKey: string,
  tournamentKey: string
): Promise<Ranking[]> =>
  apiFetcher(
    `ranking/calculate/${eventKey}/${tournamentKey}`,
    'POST',
    rankingZod.array().parse
  );

export const recalculatePlayoffsRankings = (
  eventKey: string,
  tournamentKey: string
): Promise<Ranking[]> =>
  apiFetcher(
    `ranking/calculate/${eventKey}/${tournamentKey}?playoffs=true`,
    'POST',
    rankingZod.array().parse
  );

export const deleteRankings = (eventKey: string, tournamentKey: string) =>
  apiFetcher(`ranking/${eventKey}/${tournamentKey}`, 'DELETE');
