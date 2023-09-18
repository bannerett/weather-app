import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

import clouds from '~/assets/img/clouds-384672_1920.jpg';
import rainDrops from '~/assets/img/rain-drops.jpeg';
import CurrentWeatherCard from '~/components/CurrentWeatherCard';
import FeelsLikeCard from '~/components/FeelsLikeCard';
import ForecastsCard from '~/components/ForecastsCard';
import HumidityPressureCard from '~/components/HumidityPressureCard';
import SunriseCard from '~/components/SunriseCard';
import TopBar from '~/components/TopBar';
import VisibilityCard from '~/components/VisibilityCard';
import WindCard from '~/components/WindCard';
import { weatherMock } from '~/mock/weather.mock';
import { UNIT } from '~/types/unit';
import type { WeatherResponse } from '~/types/weather';
import { WEATHER_CODE } from '~/types/weatherCode';

const images = {
  [WEATHER_CODE.SHOWERS]: rainDrops,
  [WEATHER_CODE.CLOUDY]: clouds,
} as { [key: number]: string };

function App() {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [weather, setWeather] = useState<WeatherResponse>(weatherMock);
  const [units, setUnits] = useState<UNIT>(UNIT.CELSIUS);

  console.log(position);
  console.log(window.navigator);
  console.log(weather);

  useEffect(() => {
    const watchId = window.navigator.geolocation.watchPosition((data) => {
      setPosition(data);
    });

    return () => {
      window.navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  console.log(position);
  useEffect(() => {
    if (position) {
      const {
        coords: { latitude, longitude },
      } = position;

      // (async () => {
      //   try {
      //     const res = await fetch(
      //       `https://${import.meta.env.VITE_API_HOST}/weather?lat=${latitude}&long=${longitude}&format=json`,
      //       {
      //         headers: {
      //           'Content-Type': 'application/json',
      //           'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      //           'X-RapidAPI-Host': import.meta.env.VITE_API_HOST,
      //         },
      //       },
      //     );
      //     const data = await res.json();
      //     console.log(data);
      //   } catch (e) {
      //     console.log('catch', e);
      //   }
      // })();
    }
  }, [position]);

  return (
    <IconContext.Provider
      value={{ color: '#fff', size: '26', style: { filter: 'drop-shadow(0 0 2px rgba(0,0,0, 0.9))' } }}
    >
      <Box
        className="App"
        sx={{
          position: 'relative',
          height: '100vh',
          maxHeight: '100vh',
          // '&::after': {
          //   position: 'absolute',
          //   content: '""',
          //   background: `fixed no-repeat url(${images[weather.current_observation.condition.code]})`,
          //   backgroundSize: 'cover',
          //   // backgroundRepeat: 'no-repeat',
          //   // backgroundPosition: 'center',
          //   // backgroundOrigin: 'contain',
          //   width: '100%',
          //   height: '100%',
          //   top: 0,
          //   left: 0,
          //   zIndex: -1,
          //   filter: 'blur(0.5px)',
          // },
        }}
      >
        {/* <ThemeProvider theme={theme}> */}
        <CssBaseline />
        <Box
          component="img"
          loading="lazy"
          src={images[weather.current_observation.condition.code]}
          sx={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <TopBar />
        {/* </ThemeProvider> */}
        <Box
          sx={{
            // maxWidth: { xs: '100%', sm: 706, md: 706, lg: 706 },
            maxWidth: 706,
            mx: 'auto',
            py: 3,
            px: 1,
            height: '100%',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': { display: 'none !important' },
          }}
        >
          <CurrentWeatherCard condition={weather.current_observation.condition} location={weather.location} />
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6}>
              <ForecastsCard forecasts={weather.forecasts} />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <WindCard {...weather.current_observation.wind} />
                </Grid>
                <Grid item xs={6}>
                  <VisibilityCard visibility={weather.current_observation.atmosphere.visibility} />
                </Grid>
                <Grid item xs={6}>
                  <SunriseCard {...weather.current_observation.astronomy} />
                </Grid>
                <Grid item xs={6}>
                  <HumidityPressureCard {...weather.current_observation.atmosphere} />
                </Grid>
                <Grid item xs={6}>
                  <FeelsLikeCard {...weather.current_observation.wind} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </IconContext.Provider>
  );
}

export default App;
