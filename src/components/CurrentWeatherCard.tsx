import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Condition, Location } from '~/types/weather';

interface OwnProps {
  condition: Condition;
  location: Location;
}

function CurrentWeatherCard({ condition, location }: OwnProps) {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        p: 1.5,
        // backgroundColor: 'rgba(0,0,0,.3)',
        maxWidth: 'fit-content',
        mx: 'auto',
        mb: 6,
        mt: 2,
        borderRadius: ({ shape }) => shape.borderRadius,
        color: 'white',
        minWidth: 130,
        minHeight: 130,
        filter: 'drop-shadow(0 0 3px rgba(0,0,0, .75))',
      }}
    >
      <Typography variant="h4">{location.city}</Typography>
      <Typography variant="h3" sx={{ position: 'relative', '&::after': { position: 'absolute', content: '"˚"' } }}>
        {condition.temperature}
      </Typography>
      <Box>{condition.text}</Box>
    </Stack>
  );
}

export default CurrentWeatherCard;
