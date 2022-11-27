import { Fragment, useEffect, useMemo, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import useStore from '@zustand/store';

import StyledLink from './StyledLink';

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

  const renderMode = useStore((state) => state.renderMode);

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
            href={`/countries/${renderMode.toLowerCase()}/${state.cca3}`}
            passHref
          >
            <StyledLink>
              <Image src={state.flags.svg} width={24.4} height={16} />
              {props.key}
            </StyledLink>
          </Box>
        );
      }}
    />
  );
};

export default AsyncSearchField;
