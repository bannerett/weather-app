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

type WeatherCard = Forecast & { currentTemp?: number; max?: number; min?: number };

function WeatherCard({ code, currentTemp, day, text, low, high, max, min }: WeatherCard) {
  const gradient = useMemo(
    () => `linear-gradient(to right, ${temperature[String(low)]}, ${temperature[String(high)]})`,
    [high, low],
  );
  const value = useMemo(() => (currentTemp ? [low, currentTemp, high] : [low, high]), [currentTemp, high, low]);

  const WeatherIcon = styled(ICONS[code])({});

  return (
    <Box>
      <Grid.Container>
        <Grid.Item xs={2.5}>
          <Strong.Shadow>{day}</Strong.Shadow>
        </Grid.Item>
        <Grid.Item xs={2.5}>
          <Tooltip enterDelay={1000} enterNextDelay={500} placement="top" sx={{ fontSize: '14px' }} title={text}>
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%', pl: 1 }}>
              <WeatherIcon />
            </Box>
          </Tooltip>
        </Grid.Item>
        <Grid.Item xs={7} sx={{ position: 'relative' }}>
          <Stack direction="row" alignItems="center">
            <Box sx={{ px: 1 }}>
              <Strong.Shadow>{low}</Strong.Shadow>&deg;
            </Box>

            <Slider
              value={value}
              // value={currentTemp}
              min={min}
              max={max}
              // sx={{ background: gradient }}
              slotProps={{
                track: { style: { background: gradient, border: 'none' } },
                thumb: { style: { display: 'none', height: 8, width: 8, color: '#fafafa', outline: '1px solid #333' } },
              }}
              sx={{
                pointerEvents: 'none',
                ...(currentTemp && { 'span[data-index="1"]': { display: 'block !important' } }),
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
