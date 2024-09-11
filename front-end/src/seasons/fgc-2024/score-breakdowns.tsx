import { FeedingTheFuture } from '@toa-lib/models';
import { FC } from 'react';
import { ScoreBreakdownProps } from '..';
import { Grid, TextField } from '@mui/material';
import { useTeamIdentifiers } from 'src/hooks/use-team-identifier';

export const RedScoreBreakdown: FC<
  ScoreBreakdownProps<FeedingTheFuture.MatchDetails>
> = ({ match }) => {
  const identifiers = useTeamIdentifiers();
  const redAlliance = match?.participants?.filter((p) => p.station < 20) ?? [];
  return (
    <Grid container spacing={3}>
      {/* RED ALLIANCE */}
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          label='Red Resevoir Conserved'
          value={match?.details?.redResevoirConserved ?? 0}
          type='number'
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          label='Red Nexus Conserved'
          value={match?.details?.redNexusConserved ?? 0}
          type='number'
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          label='Red Food Produced'
          value={match?.details?.redFoodProduced ?? 0}
          type='number'
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          label='Red Food Secured'
          value={match?.details?.redFoodSecured ?? 0}
          type='number'
          fullWidth
          disabled
        />
      </Grid>
      {/* RED ALLIANCE BALANCE STATUS */}
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label={`${identifiers[redAlliance[0].teamKey]} Balance Status`}
          value={match?.details?.redRobotOneBalanced ?? 0}
          type='number'
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label={`${identifiers[redAlliance[1].teamKey]} Balance Status`}
          value={match?.details?.redRobotTwoBalanced ?? 0}
          type='number'
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label={`${identifiers[redAlliance[2].teamKey]} Balance Status`}
          value={match?.details?.redRobotThreeBalanced ?? 0}
          type='number'
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          label='Red Score'
          value={match?.redScore ?? 0}
          type='number'
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          label='Red Penalties'
          value={match?.redMinPen ?? 0}
          type='number'
          fullWidth
          disabled
        />
      </Grid>
    </Grid>
  );
};

export const BlueScoreBreakdown: FC<
  ScoreBreakdownProps<FeedingTheFuture.MatchDetails>
> = ({ match }) => {
  const identifiers = useTeamIdentifiers();
  const blueAlliance =
    match?.participants?.filter((p) => p.station >= 20) ?? [];
  return (
    <Grid container spacing={3}>
      {/* BLUE ALLIANCE */}
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          label='Blue Resevoir Conserved'
          value={match?.details?.blueResevoirConserved ?? 0}
          type='number'
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          label='Blue Nexus Conserved'
          value={match?.details?.blueNexusConserved ?? 0}
          type='number'
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          label='Blue Food Produced'
          value={match?.details?.blueFoodProduced ?? 0}
          type='number'
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          label='Blue Food Secured'
          value={match?.details?.blueFoodSecured ?? 0}
          type='number'
          fullWidth
          disabled
        />
      </Grid>
      {/* BLUE ALLIANCE BALANCE STATUS */}
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label={`${identifiers[blueAlliance[0].teamKey]} Balance Status`}
          value={match?.details?.blueRobotOneBalanced ?? 0}
          type='number'
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label={`${identifiers[blueAlliance[1].teamKey]} Balance Status`}
          value={match?.details?.blueRobotTwoBalanced ?? 0}
          type='number'
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label={`${identifiers[blueAlliance[2].teamKey]} Balance Status`}
          value={match?.details?.blueRobotThreeBalanced ?? 0}
          type='number'
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          label='Blue Score'
          value={match?.blueScore ?? 0}
          type='number'
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          label='Blue Penalties'
          value={match?.blueMinPen ?? 0}
          type='number'
          fullWidth
          disabled
        />
      </Grid>
    </Grid>
  );
};