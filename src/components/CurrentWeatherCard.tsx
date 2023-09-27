import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { isNil } from 'lodash';

import { useGeoPositionContext } from '~/providers/useGeoPositionContext';
import { selectApiCurrentWeatherCardParams } from '~/store/api/weatherApi';
import { useAppSelector } from '~/store/hooks';

function CurrentWeatherCard() {
  const pos = useGeoPositionContext();
  const { condition, location } = useAppSelector(
    selectApiCurrentWeatherCardParams({ lat: pos.coords?.latitude, lon: pos.coords?.longitude }),
  );

  console.log({ pos });

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
      {pos?.coords ? (
        <>
          <Typography variant="h4">{location?.city}</Typography>
          <Typography
            variant="h3"
            sx={{
              position: 'relative',
              ...(!isNil(condition?.temperature) && { '&::after': { position: 'absolute', content: '"˚"' } }),
            }}
          >
            {condition?.temperature || '--'}
          </Typography>
          <Box>{condition?.text}</Box>
        </>
      ) : (
        <Skeleton height={130} width={130} variant="rounded" sx={{ borderRadius: ({ shape }) => shape.borderRadius }} />
      )}
    </Stack>
  );
}

export default CurrentWeatherCard;
