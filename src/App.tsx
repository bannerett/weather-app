import { IconContext } from 'react-icons';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

import clearNight from '~/assets/img/31-clear-night-4.jpeg';
import sunny from '~/assets/img/32-sunny.jpeg';
import clouds from '~/assets/img/clouds-384672_1920.jpg';
import fairDay from '~/assets/img/fair-sky.jpg';
import partlyCloudy from '~/assets/img/partly-cloudy.jpg';
import rainDrops from '~/assets/img/rain-drops.jpeg';
import CurrentWeatherCard from '~/components/CurrentWeatherCard';
import FeelsLikeCard from '~/components/FeelsLikeCard';
import ForecastsCard from '~/components/ForecastsCard';
import HumidityPressureCard from '~/components/HumidityPressureCard';
import SunriseCard from '~/components/SunriseCard';
import TopBar from '~/components/TopBar';
import VisibilityCard from '~/components/VisibilityCard';
import WindCard from '~/components/WindCard';
import { useGeoPositionContext } from '~/providers/useGeoPositionContext';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectCurrentConditionCode } from '~/store/reducers/weatherSlice';
import { weatherThunk } from '~/store/thunks/weatherThunk';
import { WEATHER_CODE } from '~/types/weatherCode';

const images = {
  [WEATHER_CODE.SHOWERS]: rainDrops,
  [WEATHER_CODE.CLOUDY]: clouds,
  [WEATHER_CODE.MOSTLY_CLOUDY_DAY]: clouds,
  [WEATHER_CODE.PARTLY_CLOUDY_DAY]: partlyCloudy,
  [WEATHER_CODE.PARTLY_CLOUDY]: partlyCloudy,
  [WEATHER_CODE.FAIR_DAY]: fairDay,
  [WEATHER_CODE.CLEAR_NIGHT]: clearNight,
  [WEATHER_CODE.SUNNY]: sunny,
} as { [key: number]: string };

function App() {
  const dispatch = useAppDispatch();
  const position = useGeoPositionContext();
  const conditionCode = useAppSelector(selectCurrentConditionCode);

  console.log('RENDER APP', conditionCode);

  // useEffect(() => {
  //   if (position) {
  //     const {
  //       coords: { latitude, longitude },
  //     } = position;

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
  // }
  // }, [position]);

  return (
    <IconContext.Provider
      value={{ color: '#fff', size: '26', style: { filter: 'drop-shadow(0 0 2px rgba(0,0,0, 0.9))' } }}
    >
      <CssBaseline />
      <Box
        className="App"
        sx={{
          position: 'relative',
          height: '100svh',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': { display: 'none !important' },
          background: `url(${images[conditionCode || 34]})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          // maxHeight: '100svh',
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
        {/* <Box */}
        {/*   component="img" */}
        {/*   loading="lazy" */}
        {/*   src={images[conditionCode || 34]} */}
        {/*   sx={{ position: 'absolute', width: '100svw', height: '100svh', objectFit: 'cover' }} */}
        {/* /> */}
        <Button
          sx={{ position: 'absolute', top: 64, left: 0, opacity: 1 }}
          onClick={() => {
            if (position.coords) {
              dispatch(weatherThunk({ latitude: position.coords.latitude, longitude: position.coords.longitude }));
            }
          }}
        >
          T
        </Button>

        <TopBar />
        {/* </ThemeProvider> */}
        <Box
          sx={{
            // maxWidth: { xs: '100%', sm: 706, md: 706, lg: 706 },
            maxWidth: 706,
            mx: 'auto',
            pb: 3,
            pt: 8,
            px: 1,
            // height: '100%',
            // overflowY: 'scroll',
            // '&::-webkit-scrollbar': { display: 'none !important' },
          }}
        >
          <CurrentWeatherCard />
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6}>
              <ForecastsCard />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <WindCard />
                </Grid>
                <Grid item xs={6}>
                  <VisibilityCard />
                </Grid>
                <Grid item xs={6}>
                  <SunriseCard />
                </Grid>
                <Grid item xs={6}>
                  <HumidityPressureCard />
                </Grid>
                <Grid item xs={6}>
                  <FeelsLikeCard />
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
