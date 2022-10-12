import { FC, ChangeEvent } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useRecoilState } from 'recoil';
import { matchByMatchKey } from 'src/stores/Recoil';

interface Props {
  matchKey: string;
}

const MatchInfo: FC<Props> = ({ matchKey }) => {
  const [match, setMatch] = useRecoilState(matchByMatchKey(matchKey));

  const handleUpdates = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name, type } = e.target;
    const typedValue = type === 'number' ? parseInt(value) : value;
    if (match) {
      setMatch({ ...match, [name]: typedValue });
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          label='Match Key'
          value={match?.matchKey}
          disabled
          fullWidth
          name='matchKey'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          label='Match Detail Key'
          value={match?.matchDetailKey}
          disabled
          fullWidth
          name='matchDetailKey'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          label='Match Name'
          value={match?.matchName}
          fullWidth
          name='matchKey'
          onChange={handleUpdates}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          label='Tourney Lvl'
          value={match?.tournamentLevel}
          type='number'
          fullWidth
          name='tournamentLevel'
          onChange={handleUpdates}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          label='Field Number'
          value={match?.fieldNumber}
          type='number'
          fullWidth
          name='fieldNumber'
          onChange={handleUpdates}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          label='Red Score'
          value={match?.redScore}
          type='number'
          fullWidth
          name='redScore'
          onChange={handleUpdates}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          label='Blue Score'
          value={match?.blueScore}
          type='number'
          fullWidth
          name='blueScore'
          onChange={handleUpdates}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          label='Red Penalties'
          value={match?.redMinPen}
          type='number'
          fullWidth
          name='redMinPen'
          onChange={handleUpdates}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          label='Blue Penalties'
          value={match?.blueMinPen}
          type='number'
          fullWidth
          name='blueMinPen'
          onChange={handleUpdates}
        />
      </Grid>
    </Grid>
  );
};

export default MatchInfo;