import { FC, Suspense } from 'react';
import DefaultLayout from 'src/layouts/DefaultLayout';
import Grid from '@mui/material/Grid';
import MatchControl from './components/MatchControl/MatchControl';
import MatchSelection from './components/MatchSelection/MatchSelection';
import RedAlliance from './components/RedAlliance/RedAlliance';
import BlueAlliance from './components/BlueAlliance/BlueAlliance';
import MatchStatus from './components/MatchStatus/MatchStatus';
import UnloadListener from 'src/components/UnloadListener/UnloadListener';
import PrestartListener from 'src/components/PrestartListener/PrestartListener';
import MatchStateListener from 'src/components/MatchStateListener/MatchStateListener';

const ScoringApp: FC = () => {
  return (
    <DefaultLayout containerWidth='xl'>
      <PrestartListener />
      <MatchStateListener />
      <UnloadListener />
      <MatchControl />
      <Suspense fallback={null}>
        <Grid
          sx={{ marginTop: (theme) => theme.spacing(2) }}
          container
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={5}>
            <RedAlliance />
          </Grid>
          <Grid item xs={12} sm={6} md={2} sx={{ paddingTop: '0 !important' }}>
            <MatchStatus />
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <BlueAlliance />
          </Grid>
          <Grid item xs={12}>
            <MatchSelection />
          </Grid>
        </Grid>
      </Suspense>
    </DefaultLayout>
  );
};

export default ScoringApp;
