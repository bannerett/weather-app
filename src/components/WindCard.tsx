import { useCallback, useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import {
  WiDirectionDown,
  WiDirectionDownLeft,
  WiDirectionDownRight,
  WiDirectionLeft,
  WiDirectionRight,
  WiDirectionUp,
  WiDirectionUpLeft,
  WiDirectionUpRight,
} from 'react-icons/wi';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import Card from '~/components/ui/Card';
import CardinalTag from '~/components/ui/CardinalTag';
import Grid from '~/components/ui/Grid';
import { Wind } from '~/types/weather';

const windDirection = {
  E: WiDirectionRight,
  N: WiDirectionUp,
  NE: WiDirectionDownRight,
  NW: WiDirectionDownLeft,
  S: WiDirectionDown,
  SE: WiDirectionUpRight,
  SW: WiDirectionUpLeft,
  W: WiDirectionLeft,
} as { [key: string]: IconType };

const GridItem = styled(Grid.Item)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: '24px',
});

function WindCard({ chill, direction, speed }: Wind) {
  const [measure, setMeasure] = useState<'m/s' | 'km/h'>('m/s');
  const windSpeed = useMemo(() => (measure === 'km/h' ? speed * 3.6 : speed), [measure, speed]);

  const DirectionIcon = windDirection[direction];

  const toggleMeasure = useCallback(() => {
    setMeasure((m) => (m === 'm/s' ? 'km/h' : 'm/s'));
  }, []);

  return (
    <Card.Container sx={{ aspectRatio: '1/1', overflow: 'hidden' }}>
      <Grid.Container>
        <GridItem xs={12} sx={{ justifyContent: 'space-between' }}>
          <Card.Header>wind</Card.Header>
          {/* todo: move button to general component */}
          <Button
            disableElevation
            onClick={toggleMeasure}
            sx={{ p: 0, color: '#fff', minWidth: 'unset' }}
            variant="text"
          >
            {windSpeed} {measure}
          </Button>
        </GridItem>
        {/* <GridItem xs={6} sx={{ justifyContent: 'end' }}> */}

        {/* </GridItem> */}

        {/* compass */}
        <Grid.Item xs={12}>
          <Grid.Container rowSpacing={1}>
            <GridItem xs={12}>
              <CardinalTag>N</CardinalTag>
            </GridItem>
            <GridItem xs={4}>
              <CardinalTag>W</CardinalTag>
            </GridItem>
            <GridItem xs={4} sx={{ position: 'relative' }}>
              <DirectionIcon size={42} />
              {/* <Box sx={{ position: 'absolute', left: '56%', bottom: -12, transform: 'translate(-50%, 0)' }}> */}
              {/*   {chill}˚ */}
              {/* </Box> */}
            </GridItem>
            <GridItem xs={4}>
              <CardinalTag>E</CardinalTag>
            </GridItem>
            <GridItem xs={12}>
              <CardinalTag>S</CardinalTag>
            </GridItem>
          </Grid.Container>
        </Grid.Item>
      </Grid.Container>
    </Card.Container>
  );
}

export default WindCard;
