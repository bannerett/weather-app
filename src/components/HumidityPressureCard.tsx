import { useCallback, useState } from 'react';

import Box from '@mui/material/Box';

import Card from '~/components/ui/Card';
import Grid from '~/components/ui/Grid';
import Strong from '~/components/ui/Strong';
import { useAppSelector } from '~/store/hooks';
import { selectAtmosphere } from '~/store/reducers/weatherSlice';

function HumidityPressureCard() {
  const atmosphere = useAppSelector(selectAtmosphere);
  const [mainElement, setMainElement] = useState<'humidity' | 'pressure'>('humidity');
  const isHumidity = mainElement === 'humidity';

  const toggleOrder = useCallback(() => {
    setMainElement((element) => (element === 'humidity' ? 'pressure' : 'humidity'));
  }, []);

  return (
    <Card.ContainerSquare sx={{ position: 'relative' }}>
      <Grid.Container>
        <Grid.Item xs={12}>
          <Card.Header>{isHumidity ? 'humidity' : 'pressure'}</Card.Header>
        </Grid.Item>
        <Grid.Item xs={12} onClick={toggleOrder} sx={{ cursor: 'pointer' }}>
          <Strong.Shadow sx={{ fontSize: 42, whiteSpace: 'nowrap' }}>
            {isHumidity
              ? atmosphere?.humidity.toLocaleString()
              : Math.round(atmosphere?.pressure || 0).toLocaleString()}
            <span style={{ ...(!isHumidity && { fontSize: 30 }) }}>{isHumidity ? ' %' : ' kPa'}</span>
          </Strong.Shadow>
        </Grid.Item>
      </Grid.Container>

      <Box
        onClick={toggleOrder}
        sx={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          lineHeight: '12px',
          cursor: 'pointer',
          textTransform: 'capitalize',
        }}
      >
        {isHumidity ? 'pressure' : 'humidity'}:{' '}
        {isHumidity
          ? `${Math.round(atmosphere?.pressure || 0).toLocaleString()} kPa`
          : `${atmosphere?.humidity.toLocaleString()} %`}
      </Box>
    </Card.ContainerSquare>
  );
}

export default HumidityPressureCard;
