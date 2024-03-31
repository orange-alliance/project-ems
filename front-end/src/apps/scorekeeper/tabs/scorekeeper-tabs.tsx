import { Divider, Paper, Tab, Tabs } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import TabPanel from 'src/components/util/TabPanel/TabPanel';
import { ScorekeeperMatches } from './scorekeeper-matches';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentTournamentKeyAtom } from 'src/stores/NewRecoil';
import { useTournamentsForEvent } from 'src/api/use-tournament-data';
import { useMatchesForTournament } from 'src/api/use-match-data';
import { useTeamsForEvent } from 'src/api/use-team-data';
import { currentMatchIdAtom, matchOccurringAtom } from 'src/stores/recoil';

interface Props {
  eventKey?: string;
}

export const ScorekeeperTabs: FC<Props> = ({ eventKey }) => {
  const [tournamentKey, setTournamentKey] = useRecoilState(
    currentTournamentKeyAtom
  );
  const [matchId, setMatchId] = useRecoilState(currentMatchIdAtom);
  const [value, setValue] = useState(0);
  const setMatchOccurring = useSetRecoilState(matchOccurringAtom);

  const { data: tournaments } = useTournamentsForEvent(eventKey);
  const { data: matches } = useMatchesForTournament(eventKey, tournamentKey);
  const { data: teams } = useTeamsForEvent(eventKey);

  useEffect(() => {
    setValue(0);
  }, [tournamentKey]);
  const handleChange = (_: React.SyntheticEvent, newValue: number) =>
    setValue(newValue);
  const handleTournamentChange = (key: string) => {
    setTournamentKey(key);
    setMatchId(null);
    setMatchOccurring(null);
  };
  const handleMatchChange = (id: number) => {
    if (!matches) return null;
    setMatchId(id);
    setMatchOccurring(matches.find((m) => m.id === id) ?? null);
  };
  return (
    <Paper sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label='Schedule' />
        <Tab label='Score Details' />
      </Tabs>
      <Divider />
      <TabPanel value={value} index={0}>
        <ScorekeeperMatches
          matches={matches}
          teams={teams}
          tournaments={tournaments}
          tournamentKey={tournamentKey}
          selected={(match) => match.id === matchId}
          onTournamentChange={handleTournamentChange}
          onMatchSelect={handleMatchChange}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Score Details
      </TabPanel>
    </Paper>
  );
};
