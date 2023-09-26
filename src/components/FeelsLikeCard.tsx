import { useCallback, useMemo, useState } from 'react';

import Button from '@mui/material/Button';

import Card from '~/components/ui/Card';
import Grid from '~/components/ui/Grid';
import Strong from '~/components/ui/Strong';
import { useAppSelector } from '~/store/hooks';
import { selectChill } from '~/store/reducers/weatherSlice';

function FeelsLikeCard() {
  const chill = useAppSelector(selectChill);
  const [measure, setMeasure] = useState<'c' | 'f'>('c');

  const temperature = useMemo(() => {
    return measure === 'c' ? chill : (chill * 9) / 5 + 32;
  }, [chill, measure]);

  const toggleMeasure = useCallback(() => {
    setMeasure((m) => (m === 'c' ? 'f' : 'c'));
  }, []);

  return (
    <Card.ContainerSquare>
      <Grid.Container>
        <Grid.Item sx={{ width: '100%' }}>
          <Grid.Container>
            <Grid.Item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Card.Header>feels like</Card.Header>
              <Button
                disableElevation
                onClick={toggleMeasure}
                sx={{ p: 0, color: '#fff', minWidth: 'unset' }}
                variant="text"
              >
                {measure === 'c' ? 'C' : 'F'}
              </Button>
            </Grid.Item>
            <Grid.Item xs={12} onClick={toggleMeasure} sx={{ cursor: 'pointer' }}>
              <Strong.Shadow sx={{ fontSize: 42 }}>{temperature}º</Strong.Shadow>
            </Grid.Item>
          </Grid.Container>
        </Grid.Item>
      </Grid.Container>
    </Card.ContainerSquare>
  );
}

export default FeelsLikeCard;
