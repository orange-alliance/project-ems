import { apiFetcher, clientFetcher } from '@toa-lib/client';
import { Tournament, tournamentZod } from '@toa-lib/models';
import useSWR from 'swr';

export const postTournaments = async (
  tournaments: Tournament[]
): Promise<void> => clientFetcher('tournament', 'POST', tournaments);

export const patchTournament = async (tournament: Tournament): Promise<void> =>
  clientFetcher(
    `tournament/${tournament.eventKey}/${tournament.tournamentKey}`,
    'POST',
    tournament
  );

export const useTournamentsForEvent = (eventKey: string | null | undefined) =>
  useSWR<Tournament[]>(eventKey ? `tournament/${eventKey}` : undefined, (url) =>
    apiFetcher(url, 'GET', undefined, tournamentZod.array().parse)
  );
