import Stack from '@mui/material/Stack';

import Card from '~/components/ui/Card';
import Divider from '~/components/ui/Divider';
import WeatherCard from '~/components/WeatherCard';
import type { Forecast } from '~/types/weather';

function ForecastsCard({ forecasts }: { forecasts: Forecast[] }) {
  return (
    <Card.Container>
      <Card.Header divider>11-day forecast</Card.Header>
      <Stack direction="column" sx={{ maxWidth: 600, width: '100%' }} divider={<Divider />}>
        {forecasts.map((fc) => (
          <WeatherCard key={fc.date} {...fc} />
        ))}
      </Stack>
    </Card.Container>
  );
}

export default ForecastsCard;
