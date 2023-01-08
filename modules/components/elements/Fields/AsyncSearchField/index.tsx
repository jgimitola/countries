import { Fragment, SetStateAction, useEffect, useMemo, useState } from 'react';

import Image from 'next/image';

import { CountryResponse } from '@geonatives-types/index';

import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import useStore from '@zustand/store';

import StyledLink from './StyledLink';

import debounce from 'lodash.debounce';

interface AsyncSearchFieldProps {
  label: string;
  placeholder: string;
  isOptionEqualToValue: (option: any, value: any) => boolean;
  getOptionLabel: (option: any) => string;
  fetchController: (...args: any) => any;
}

const AsyncSearchField = (props: AsyncSearchFieldProps) => {
  const {
    label,
    placeholder,
    isOptionEqualToValue,
    getOptionLabel,
    fetchController,
    ...rest
  } = props;

  const renderMode = useStore((state) => state.renderMode);

  const [predicate, setPredicate] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<{ status: number; options: any[] }>({
    status: 200,
    options: [],
  });
  const loading: boolean =
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

  const handleInputChange = async (
    _event: any,
    value: SetStateAction<string>,
    _reason: any
  ) => {
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
      renderOption={(props, state: CountryResponse) => {
        return (
          <StyledLink
            key={props.id}
            href={`/countries/${renderMode.toLowerCase()}/${state.cca3}`}
          >
            {state.flags.svg && (
              <Image src={state.flags.svg} alt="" width={24.4} height={16} />
            )}
            {state.name.official}
          </StyledLink>
        );
      }}
    />
  );
};

export default AsyncSearchField;
