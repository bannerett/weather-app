import { useCallback, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Card from '~/components/ui/Card';
import Grid from '~/components/ui/Grid';
import Strong from '~/components/ui/Strong';
import { useAppSelector } from '~/store/hooks';
import { selectAstronomy, selectWeatherPending } from '~/store/reducers/weatherSlice';
import { convertTo24Hour } from '~/utils/timeConverter';

function SunriseCard() {
  const astronomy = useAppSelector(selectAstronomy);
  const pending = useAppSelector(selectWeatherPending);

  const [amPm, setAmPm] = useState(false);
  const [mainElement, setMainElement] = useState<'sunrise' | 'sunset'>('sunrise');

  const { sunrise, sunset } = useMemo(() => {
    if (!amPm && astronomy)
      return Object.entries(astronomy).reduce(
        (prev, [key, value]) => {
          return { ...prev, [key]: convertTo24Hour(value) };
        },
        { sunset: '', sunrise: '' },
      );
    return astronomy || { sunset: '', sunrise: '' };
  }, [amPm, astronomy]);
  const isSunrise = mainElement === 'sunrise';

  const toggleAmPm = useCallback(() => {
    setAmPm((p) => !p);
  }, []);

  const toggleOrder = useCallback(() => {
    setMainElement((element) => (element === 'sunrise' ? 'sunset' : 'sunrise'));
  }, []);

  return (
    <Card.ContainerSquare sx={{ position: 'relative' }}>
      <Grid.Container sx={{ height: '100%' }}>
        <Grid.Item sx={{ width: '100%' }}>
          <Grid.Container>
            <Grid.Item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Card.Header>{mainElement}</Card.Header>
              {(sunrise || sunset) && (
                <Button
                  disableElevation
                  onClick={toggleAmPm}
                  sx={{ p: 0, color: '#fff', minWidth: 'unset' }}
                  variant="text"
                >
                  {amPm ? 'AM/PM' : '24H'}
                </Button>
              )}
            </Grid.Item>
            <Grid.Item xs={12} onClick={toggleOrder} sx={{ cursor: 'pointer' }}>
              <Strong.Shadow sx={{ fontSize: 42 }}>{isSunrise ? sunrise : sunset}</Strong.Shadow>
            </Grid.Item>
          </Grid.Container>
        </Grid.Item>

        {sunrise && sunset && (
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
            {isSunrise ? 'sunset' : 'sunrise'}: {isSunrise ? sunset : sunrise}
          </Box>
        )}
      </Grid.Container>
    </Card.ContainerSquare>
  );
}

export default SunriseCard;
