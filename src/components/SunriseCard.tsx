import { useCallback, useMemo, useState } from 'react';

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
    <Card.Container sx={{ aspectRatio: '1/1', overflow: 'hidden' }}>
      <Grid.Container>
        <Grid.FlexGridItem xs={12} sx={{ justifyContent: 'space-between' }}>
          <Card.Header>sunrise</Card.Header>
          <Button disableElevation onClick={toggleAmPm} sx={{ p: 0, color: '#fff', minWidth: 'unset' }} variant="text">
            {amPm ? 'AM/PM' : '24H'}
          </Button>
        </Grid.FlexGridItem>
        <Grid.Item xs={12}>
          <Strong.Shadow sx={{ fontSize: 42 }}>{sunrise}</Strong.Shadow>
        </Grid.Item>
        <Grid.FlexGridItem xs={12} sx={{ height: 80, alignItems: 'flex-end', lineHeight: '12px' }}>
          Sunset: {sunset}
        </Grid.FlexGridItem>
      </Grid.Container>
    </Card.Container>
  );
}

export default SunriseCard;
