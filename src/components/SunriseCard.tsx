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

  const toggleAmPm = useCallback(() => {
    setAmPm((p) => !p);
  }, []);

  return (
    <Card.ContainerSquare sx={{ position: 'relative', pb: 4 }}>
      <Grid.Container>
        <Grid.Item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Card.Header>sunrise</Card.Header>
          <Button disableElevation onClick={toggleAmPm} sx={{ p: 0, color: '#fff', minWidth: 'unset' }} variant="text">
            {amPm ? 'AM/PM' : '24H'}
          </Button>
        </Grid.Item>
        <Grid.Item xs={12}>
          <Strong.Shadow sx={{ fontSize: 42 }}>{sunrise}</Strong.Shadow>
        </Grid.Item>
        <Box sx={{ position: 'absolute', bottom: 12, lineHeight: '12px' }}>Sunset: {sunset}</Box>
      </Grid.Container>
    </Card.ContainerSquare>
  );
}

export default SunriseCard;
