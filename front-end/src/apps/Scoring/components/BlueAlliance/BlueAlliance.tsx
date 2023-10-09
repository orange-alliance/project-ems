import { FC } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TeamStatusRow from '../Status/TeamStatusRow';
import { useRecoilValue } from 'recoil';
import {
  currentMatchSelector,
  matchInProgressAtom
} from 'src/stores/NewRecoil';
import { getSeasonKeyFromEventKey } from '@toa-lib/models';
import { useComponents } from 'src/seasons';
import NoShowStatus from '../Status/NoShowStatus';

const BlueAlliance: FC = () => {
  const match = useRecoilValue(currentMatchSelector);
  const matchInProgress = useRecoilValue(matchInProgressAtom);
  const blueAlliance = match?.participants?.filter((p) => p.station >= 20);
  const seasonKey = getSeasonKeyFromEventKey(match ? match.eventKey : '');
  const components = useComponents(seasonKey);
  return (
    <Paper
      className='blue-bg-imp'
      sx={{ paddingBottom: (theme) => theme.spacing(2) }}
    >
      <Grid container spacing={3}>
        <Grid item md={8}>
          {blueAlliance?.map((p) => (
            <TeamStatusRow key={p.teamKey} station={p.station} />
          ))}
        </Grid>
        <Grid item md={1}>
          {blueAlliance?.map((p) => (
            <NoShowStatus key={`no-show-${p.teamKey}`} station={p.station} />
          ))}
        </Grid>
        <Grid item md={3}>
          {components && match && (
            <components.BlueScoreBreakdown
              match={matchInProgress ?? undefined}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BlueAlliance;
