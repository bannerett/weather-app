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
import { useAppSelector } from '~/store/hooks';
import { selectWind } from '~/store/reducers/weatherSlice';

const windDirectionC = {
  E: WiDirectionLeft,
  East: WiDirectionLeft,
  N: WiDirectionDown,
  North: WiDirectionDown,
  NE: WiDirectionDownLeft,
  NW: WiDirectionDownRight,
  S: WiDirectionUp,
  South: WiDirectionUp,
  SSE: WiDirectionUpRight,
  SE: WiDirectionUpLeft,
  ESE: WiDirectionUpLeft,
  SW: WiDirectionUpRight,
  W: WiDirectionRight,
  West: WiDirectionRight,
} as { [key: string]: IconType };

const resolveIconRotation = (windDirection: string) => {
  let deg = 0;

  if (windDirection === 'E' || windDirection === 'East') deg = 90;
  if (windDirection === 'NE') deg = 45;
  if (windDirection === 'NNE') deg = -157.5;
  if (windDirection === 'NW') deg = 315;
  if (windDirection === 'SE') deg = 135;
  if (windDirection === 'SSE') deg = 157.5;
  if (windDirection === 'SW') deg = 225;
  if (windDirection === 'W' || windDirection === 'West') deg = 270;

  return deg;
};

const GridItem = styled(Grid.Item)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: '24px',
});

function WindCard() {
  const wind = useAppSelector(selectWind);
  const [measure, setMeasure] = useState<'m/s' | 'km/h'>('m/s');
  const windSpeed = useMemo(
    () => (wind ? (measure === 'km/h' ? wind?.speed * 3.6 : wind?.speed) : undefined),
    [measure, wind],
  );

  const DirectionIcon = styled(WiDirectionUp)({});

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
              <DirectionIcon
                size={42}
                sx={{
                  ...(wind?.direction
                    ? { rotate: `${resolveIconRotation(wind.direction)}deg` }
                    : {
                        animation: 'r 3000ms infinite',
                        '@keyframes r': {
                          '0%': { rotate: '0deg' },
                          '50%': { rotate: '360deg' },
                          '100%': { rotate: '0deg' },
                        },
                      }),
                }}
              />
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
