import { FC } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface Props {
  name: string;
  value: any;
  options: any[];
  onChange: (value: any) => void;
}

const DropdownSetting: FC<Props> = ({ name, value, options, onChange }) => {
  const handleChange = (e: SelectChangeEvent) => onChange(e.target.value);

  return (
    <FormGroup
      sx={{
        '&:hover': {
          backgroundColor: (theme) => theme.palette.action.hover
        }
      }}
    >
      <FormControlLabel
        control={
          <Select
            value={value}
            onChange={handleChange}
            sx={{ m: 1, minWidth: 223 }}
          >
            {options.map((o) => (
              <MenuItem key={`${name}-${o}`} value={o}>
                {o}
              </MenuItem>
            ))}
          </Select>
        }
        label={
          <Typography sx={{ marginRight: 'auto', fontWeight: 'bold' }}>
            {name}
          </Typography>
        }
        labelPlacement='start'
        sx={{ padding: (theme) => theme.spacing(2) }}
      />
    </FormGroup>
  );
};

export default DropdownSetting;
