import { useMemo } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

import Grid from '~/components/ui/Grid';
import Strong from '~/components/ui/Strong';
import { ICONS } from '~/constants/icons';
import { temperature } from '~/constants/temperature';
import type { Forecast } from '~/types/weather';

type WeatherCard = Forecast & { max?: number; min?: number };

function WeatherCard({ code, day, text, low, high, max, min }: WeatherCard) {
  const gradient = useMemo(
    () => `linear-gradient(to right, ${temperature[String(low)]}, ${temperature[String(high)]})`,
    [high, low],
  );
  const WeatherIcon = styled(ICONS[code])({});

  return (
    <Box sx={{ height: 42, lineHeight: '42px' }}>
      <Grid.Container>
        <Grid.Item xs={2}>
          <Strong.Shadow>{day}</Strong.Shadow>
        </Grid.Item>
        <Grid.Item xs={2}>
          <Tooltip enterDelay={1000} enterNextDelay={500} placement="top" sx={{ fontSize: '14px' }} title={text}>
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%', pl: 1 }}>
              <WeatherIcon />
            </Box>
          </Tooltip>
        </Grid.Item>
        <Grid.Item xs={8}>
          <Stack direction="row" alignItems="center">
            <Box sx={{ px: 1 }}>
              <Strong.Shadow>{low}</Strong.Shadow>&deg;
            </Box>
            <Slider
              value={[low, high]}
              min={min}
              max={max}
              // sx={{ background: gradient }}
              slotProps={{
                track: { style: { background: gradient, border: 'none' } },
                thumb: { style: { display: 'none' } },
              }}
            />
            <Box sx={{ px: 1 }}>
              <Strong.Shadow>{high}</Strong.Shadow>&deg;
            </Box>
          </Stack>
        </Grid.Item>
      </Grid.Container>
    </Box>
  );
}

export default WeatherCard;
