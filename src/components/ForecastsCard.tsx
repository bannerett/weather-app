import { useMemo } from 'react';

import Stack from '@mui/material/Stack';

import Card from '~/components/ui/Card';
import Divider from '~/components/ui/Divider';
import WeatherCard from '~/components/WeatherCard';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentCondition, selectForecasts } from '~/store/reducers/weatherSlice';
import { Forecast } from '~/types/weather';

function ForecastsCard() {
  const forecasts = useAppSelector(selectForecasts);
  const currentCondition = useAppSelector(selectCurrentCondition);

  const currentForecasts = useMemo(() => {
    if (forecasts && currentCondition) {
      return forecasts.map((fc, idx) =>
        idx === 0 ? { ...fc, day: 'Today', currentTemp: currentCondition.temperature } : fc,
      ) as (Forecast & { currentTemp?: number })[];
    }

    return undefined;
  }, [currentCondition, forecasts]);
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
        sx={{ maxWidth: 600, width: '100%', ...(!forecasts?.length && { height: 472.5 }) }}
        divider={<Divider />}
      >
        {currentForecasts?.map((fc) => <WeatherCard key={fc.date} {...fc} max={max} min={min} />)}
      </Stack>
    </Card.Container>
  );
}

export default ForecastsCard;
