import { useRecoilCallback } from 'recoil';
import { useMatchControl } from './use-match-control';
import {
  MatchState,
  RESULT_BLUE_WIN,
  RESULT_NOT_PLAYED,
  RESULT_RED_WIN,
  RESULT_TIE
} from '@toa-lib/models';
import { matchOccurringAtom, socketConnectedAtom } from 'src/stores/recoil';
import { patchWholeMatch } from 'src/api/use-match-data';
import { recalculateRankings } from 'src/api/use-ranking-data';
import { sendAllClear, sendCommitScores } from 'src/api/use-socket';
import { useSeasonFieldControl } from 'src/hooks/use-season-components';

export const useCommitScoresCallback = () => {
  const { canCommitScores, setState } = useMatchControl();
  const fieldControl = useSeasonFieldControl();
  return useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const match = await snapshot.getPromise(matchOccurringAtom);
        const socketConnected = await snapshot.getPromise(socketConnectedAtom);
        if (!socketConnected) {
          throw new Error('Not connected to realtime service.');
        }
        if (!canCommitScores) {
          throw new Error('Attempted to commit scores when not allowed.');
        }
        if (!match) {
          throw new Error('Attempted to commit scores when there is no match.');
        }
        const pending = { ...match };
        // Update the result if it hasn't been set yet
        if (pending.result < 0) {
          pending.result =
            pending.redScore > pending.blueScore
              ? RESULT_RED_WIN
              : pending.redScore < pending.blueScore
              ? RESULT_BLUE_WIN
              : pending.redScore === pending.blueScore
              ? RESULT_TIE
              : RESULT_NOT_PLAYED;
        }

        // Extract the important keys
        const { eventKey, tournamentKey, id } = pending;

        // Update the metadata in the match detail request
        if (pending.details && pending.details.id < 0) {
          pending.details.id = id;
          pending.details.eventKey = eventKey;
          pending.details.tournamentKey = tournamentKey;
        }
        
        await patchWholeMatch(pending);
        // TODO - When to calculate rankings vs. playoff rankings?
        await recalculateRankings(eventKey, tournamentKey);
        fieldControl?.commitScoresForField?.();
        sendCommitScores({ eventKey, tournamentKey, id });
        setState(MatchState.RESULTS_COMMITTED);
      },
    [canCommitScores, setState]
  );
};

export const useClearFieldCallback = () => {
  const { canResetField, setState } = useMatchControl();
  const fieldControl = useSeasonFieldControl();
  return useRecoilCallback(() => async () => {
    if (!canResetField) {
      throw new Error('Attempted to clear field when not allowed.');
    }
    fieldControl?.clearField?.();
    sendAllClear();
    setState(MatchState.RESULTS_READY);
  });
};
