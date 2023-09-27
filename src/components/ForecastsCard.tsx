import { useMemo } from 'react';

import { Skeleton } from '@mui/material';
import Stack from '@mui/material/Stack';
import { nanoid } from '@reduxjs/toolkit';
import { QueryStatus } from '@reduxjs/toolkit/query';

import Card from '~/components/ui/Card';
import Divider from '~/components/ui/Divider';
import WeatherCard from '~/components/WeatherCard';
import { useGeoPositionContext } from '~/providers/useGeoPositionContext';
import { selectApiForecastCardParams } from '~/store/api/weatherApi';
import { useAppSelector } from '~/store/hooks';
import { Forecast } from '~/types/weather';

function ForecastsCard() {
  const pos = useGeoPositionContext();
  const { condition, forecasts, status } = useAppSelector(
    selectApiForecastCardParams({ lat: pos.coords?.latitude, lon: pos.coords?.longitude }),
  );
  const pending = status === QueryStatus.pending;

  const currentForecasts = useMemo(() => {
    if (forecasts && condition) {
      return forecasts.map((fc, idx) =>
        idx === 0 ? { ...fc, day: 'Today', currentTemp: condition.temperature } : fc,
      ) as (Forecast & { currentTemp?: number })[];
    }

    return undefined;
  }, [condition, forecasts]);
  const { max, min } = useMemo(() => {
    let min: number | undefined, max: number | undefined;

    if (forecasts) {
      min = Infinity;
      max = -Infinity;

      for (const forecast of forecasts) {
        if (forecast.high > max) max = forecast.high;
        if (forecast.low < min) min = forecast.low;
      }
    }

    return { max, min };
  }, [forecasts]);

  return (
    <Card.Container>
      <Card.Header divider>11-day forecast</Card.Header>

      <Stack
        direction="column"
        sx={{ maxWidth: 600, width: '100%', ...(!pending && !forecasts?.length && { height: 472.5 }) }}
        divider={<Divider />}
      >
        {!pending
          ? currentForecasts?.map((fc) => <WeatherCard key={fc.date} {...fc} max={max} min={min} />)
          : Array(11)
              .fill(nanoid(7))
              .map((_n, idx) => {
                return <Skeleton key={idx} height={42} width="100%" />;
              })}
      </Stack>
    </Card.Container>
  );
}

export default ForecastsCard;
