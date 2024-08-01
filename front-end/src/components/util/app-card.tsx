import { FC } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

import firstLogo from 'src/assets/images/first-logo.png';

export interface AppCardProps {
  title: string;
  to?: string;
  href?: string;
  imgSrc?: string;
}

export const AppCard: FC<AppCardProps> = ({
  title,
  to,
  href,
  imgSrc
}: AppCardProps) => {

  // Calculate any extra props needed
  const extraProps = to ? { component: Link, to } : href ? { href } : {};

  return (
    <Card
      sx={{
        position: 'relative',
        width: '100%',
        flexBasis: '10%',
        '&::before': { content: '""', display: 'block', paddingTop: '100%' }
      }}
    >
      <CardActionArea
        sx={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '100%',
          padding: (theme) => theme.spacing(2),
          flexDirection: 'column'
        }}
        className='center'
        {...extraProps}        
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            background: `url(${imgSrc ? imgSrc : firstLogo}) center`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            marginBottom: (theme) => theme.spacing(2)
          }}
        />
        <Typography
          align='center'
          sx={{
            width: '100%'
          }}
        >
          {title}
        </Typography>
      </CardActionArea>
    </Card>
  );
};
