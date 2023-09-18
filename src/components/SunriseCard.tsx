import { useCallback, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Card from '~/components/ui/Card';
import Grid from '~/components/ui/Grid';
import Strong from '~/components/ui/Strong';
import { Astronomy } from '~/types/weather';
import { convertTo24Hour } from '~/utils/timeConverter';

function SunriseCard(phases: Astronomy) {
  const [amPm, setAmPm] = useState(false);
  const [mainElement, setMainElement] = useState<'sunrise' | 'sunset'>('sunrise');

  const { sunrise, sunset } = useMemo(() => {
    if (!amPm)
      return Object.entries(phases).reduce(
        (prev, [key, value]) => {
          return { ...prev, [key]: convertTo24Hour(value) };
        },
        { sunset: '', sunrise: '' },
      );
    return phases;
  }, [amPm, phases]);
  const isSunrise = mainElement === 'sunrise';

  const toggleAmPm = useCallback(() => {
    setAmPm((p) => !p);
  }, []);

  const toggleOrder = useCallback(() => {
    setMainElement((element) => (element === 'sunrise' ? 'sunset' : 'sunrise'));
  }, []);

  return (
    <Card.ContainerSquare sx={{ position: 'relative', pb: 4 }}>
      <Grid.Container sx={{ height: '100%' }}>
        <Grid.Item>
          <Grid.Container>
            <Grid.Item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Card.Header>{mainElement}</Card.Header>
              <Button
                disableElevation
                onClick={toggleAmPm}
                sx={{ p: 0, color: '#fff', minWidth: 'unset' }}
                variant="text"
              >
                {amPm ? 'AM/PM' : '24H'}
              </Button>
            </Grid.Item>
            <Grid.Item xs={12} onClick={toggleOrder} sx={{ cursor: 'pointer' }}>
              <Strong.Shadow sx={{ fontSize: 42 }}>{isSunrise ? sunrise : sunset}</Strong.Shadow>
            </Grid.Item>
          </Grid.Container>
        </Grid.Item>

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
      </Grid.Container>
    </Card.ContainerSquare>
  );
}

export default SunriseCard;
