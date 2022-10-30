import { Fragment, useEffect, useMemo, useState } from 'react';

import Link from 'next/link';

import { Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import debounce from 'lodash.debounce';

const AsyncSearchField = (props) => {
  const {
    label,
    placeholder,
    isOptionEqualToValue,
    getOptionLabel,
    fetchController,
    ...rest
  } = props;

  const [predicate, setPredicate] = useState('');
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState({ status: 200, options: [] });
  const loading =
    Boolean(predicate) &&
    open &&
    options.options.length === 0 &&
    options.status !== 404;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = async (event, value, reason) => {
    setPredicate(value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleInputChange, 300);
  }, []);

  useEffect(() => {
    if (!predicate || !open) return;

    setOptions({ status: 200, options: [] });
    const fetchOptions = async () => {
      const options = await fetchController(predicate);
      setOptions(options);
    };
    fetchOptions();
  }, [predicate, open]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  useEffect(() => {
    if (!open) setOptions({ status: 200, options: [] });
  }, [open]);

  return (
    <Autocomplete
      freeSolo
      disableClearable
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      onInputChange={debouncedResults}
      filterOptions={(x) => x}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      options={options.options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            placeholder,
            endAdornment: (
              <Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={16} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
      renderOption={(props, state) => {
        return (
          <Box
            key={props.id}
            component={Link}
            href={`/countries/${state.cca3}`}
            passHref
          >
            <Typography
              component="a"
              sx={{
                display: 'inline-block',
                color: 'rgb(0 0 0 / 87%)',
                textDecoration: 'none',
                p: 1,
              }}
            >
              {props.key}
            </Typography>
          </Box>
        );
      }}
    />
  );
};

export default AsyncSearchField;
