import { HTMLAttributes, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';

import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Autocomplete from '@mui/material/Autocomplete';
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete/Autocomplete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import LinearProgress from '@mui/material/LinearProgress';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { List, MagnifyingGlass, MapPin } from '@phosphor-icons/react';

import { citiesApiHeaders } from '~/api/headers';
import { useDebounceValue } from '~/hooks/useDebounceValue';
import { useGeoPositionContext } from '~/providers/useGeoPositionContext';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectWeatherPending } from '~/store/reducers/weatherSlice';
import { fetchWeather } from '~/store/thunks/weatherThunk';
import { CitiesResponse, CityData } from '~/types/cities';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function TopBar() {
  const dispatch = useAppDispatch();
  const pending = useAppSelector(selectWeatherPending);
  const { pos } = useGeoPositionContext();

  const [term, setTerm] = useState('');
  const debouncedTerm = useDebounceValue(term);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<CityData[]>([]);
  const [error, setError] = useState<string>();
  const [value, setValue] = useState<CityData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchOptions = useCallback(async (cityName: string) => {
    try {
      setLoading(true);
      const url = new URL(`https://${import.meta.env.VITE_GEO_DB_HOST}/v1/geo/cities`);
      url.searchParams.set('namePrefix', cityName);
      url.searchParams.set('minPopulation', '60000');

      const res = await fetch(url, { headers: citiesApiHeaders });
      if (res.status === 429) {
        setError('Unable to get cities');
        return;
      }
      const cities = (await res.json()) as CitiesResponse;
      setOptions(cities.data);
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) setOptions([]);
  }, [open]);

  useEffect(() => {
    if (debouncedTerm.trim().length >= 3) fetchOptions(debouncedTerm);
  }, [debouncedTerm, fetchOptions]);

  useEffect(() => {
    error && setTimeout(() => setError(undefined), 5000);
  }, [error]);

  const onInputChange = useCallback((_e: SyntheticEvent, v: string) => {
    setTerm(v);
  }, []);

  const onValueChange = useCallback(
    (_e: SyntheticEvent, v: CityData | null) => {
      setValue(v);
      v && dispatch(fetchWeather({ latitude: v.latitude, longitude: v.longitude }));
    },
    [dispatch],
  );

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onGetCurrentLocationWeather = useCallback(() => {
    pos && dispatch(fetchWeather({ latitude: pos.latitude, longitude: pos.longitude }));
  }, [dispatch, pos]);

  const renderInput = useCallback(
    ({ InputProps, inputProps }: AutocompleteRenderInputParams) => (
      <Box ref={InputProps.ref}>
        <StyledInputBase
          inputProps={{ ...inputProps }}
          onFocus={(e) => {
            e.target.select();
          }}
          disabled={loading}
        />
      </Box>
    ),
    [loading],
  );

  const renderOption = useCallback(
    (props: HTMLAttributes<HTMLLIElement>, option: CityData) => (
      <Box component="li" {...props} key={String(option.id)}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box>
            <MapPin weight="fill" />
          </Box>
          <Stack direction="column">
            <Box>{option.name}</Box>
            <Box>
              {option.region}, {option.country}
            </Box>
            {/* <Box component="pre">{JSON.stringify(option, null, 2)}</Box> */}
          </Stack>
        </Stack>
      </Box>
    ),
    [],
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {pending && (
        <Box sx={{ position: 'absolute', width: '100%' }}>
          <LinearProgress />
        </Box>
      )}

      <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent' }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
            <List />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            Weather
          </Typography>
          <BiCurrentLocation onClick={onGetCurrentLocationWeather} />
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass />
            </SearchIconWrapper>

            <Autocomplete<CityData>
              getOptionLabel={(option) => `${option.name}, ${option.region}`}
              loading={loading}
              onChange={onValueChange}
              onClose={onClose}
              onInputChange={onInputChange}
              onOpen={onOpen}
              open={open}
              options={options}
              renderInput={renderInput}
              renderOption={renderOption}
              value={value}
            />
          </Search>
        </Toolbar>
      </AppBar>

      <Slide direction="down" in={!!error}>
        <Alert
          severity="error"
          color="error"
          onClose={() => {
            setError(undefined);
          }}
          sx={{ position: 'absolute', top: 12, left: '50%', transform: 'translate(-50%, 0)' }}
        >
          {error}
        </Alert>
      </Slide>
    </Box>
  );
}

export default TopBar;
