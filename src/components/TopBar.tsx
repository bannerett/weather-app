import AppBar from '@mui/material/AppBar';
import Autocomplete from '@mui/material/Autocomplete';
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete/Autocomplete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { List, MagnifyingGlass, MapPin } from '@phosphor-icons/react';
import { delay } from 'lodash';
import { HTMLAttributes, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { citiesMock } from '~/mock/cities.mock';
import { CityData } from '~/types/cities';

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
  const [term, setTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<CityData[]>([]);
  const [value, setValue] = useState<CityData | null>(null);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) return undefined;

    (async () => {
      console.log(term);
      delay(() => {
        if (active) setOptions(citiesMock.data);
      }, 3000); // For demo purposes.
    })();

    return () => {
      active = false;
    };
  }, [loading, term]);

  useEffect(() => {
    if (!open) setOptions([]);
  }, [open]);

  useEffect(() => {
    if (value) {
      console.log(value);
    }
  }, [value]);

  const onInputChange = useCallback((_e: SyntheticEvent, v: string) => {
    setTerm(v);
  }, []);

  const onValueChange = useCallback((_e: SyntheticEvent, v: CityData | null) => {
    setValue(v);
  }, []);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const renderInput = useCallback(
    ({ InputProps, inputProps }: AutocompleteRenderInputParams) => (
      <Box ref={InputProps.ref}>
        <StyledInputBase inputProps={{ ...inputProps }} />
      </Box>
    ),
    [],
  );

  const renderOption = useCallback(
    (props: HTMLAttributes<HTMLLIElement>, option: CityData) => (
      <Box component="li" {...props} key={String(option.latitude)}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box>
            <MapPin weight="fill" />
          </Box>
          <Stack direction="column">
            <Box>{option.name}</Box>
            <Box>
              {option.region}, {option.country}
            </Box>
            {/*<Box component="pre">{JSON.stringify(option, null, 2)}</Box>*/}
          </Stack>
        </Stack>
      </Box>
    ),
    [],
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
            <List />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            Weather
          </Typography>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass />
            </SearchIconWrapper>

            <Autocomplete<CityData>
              open={open}
              onOpen={onOpen}
              onClose={onClose}
              onInputChange={onInputChange}
              onChange={onValueChange}
              value={value}
              getOptionLabel={(option) => `${option.name}, ${option.region}`}
              renderInput={renderInput}
              renderOption={renderOption}
              options={options}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopBar;
