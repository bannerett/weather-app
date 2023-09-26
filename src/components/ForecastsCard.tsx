import { useMemo } from 'react';

import { Skeleton } from '@mui/material';
import Stack from '@mui/material/Stack';

import Card from '~/components/ui/Card';
import Divider from '~/components/ui/Divider';
import WeatherCard from '~/components/WeatherCard';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentCondition, selectForecasts, selectWeatherPending } from '~/store/reducers/weatherSlice';

function ForecastsCard() {
  const current = useAppSelector(selectCurrentCondition);
  console.log(current);
  const forecasts = useAppSelector(selectForecasts);
  const pending = useAppSelector(selectWeatherPending);
  const { max, min } = useMemo(
    () =>
      (forecasts || []).reduce(
        (prev, curr) => {
          return {
            ...prev,
            ...(curr.high > prev.max && { max: curr.high }),
            ...(curr.low < prev.min && { min: curr.low }),
          };
        },
        { max: -Infinity, min: Infinity },
      ),
    [forecasts],
  );

  return (
    <Card.Container>
      <Card.Header divider>11-day forecast</Card.Header>

      <Stack
        direction="column"
        sx={{ maxWidth: 600, width: '100%', ...(!pending && !forecasts?.length && { height: 472.5 }) }}
        divider={<Divider />}
      >
        {!pending
          ? forecasts?.map((fc) => <WeatherCard key={fc.date} {...fc} max={max} min={min} />)
          : Array(11)
              .fill(null)
              .map((_n, idx) => {
                return <Skeleton key={idx} height={42} width="100%" />;
              })}
      </Stack>
    </Card.Container>
  );
}

export default ForecastsCard;
