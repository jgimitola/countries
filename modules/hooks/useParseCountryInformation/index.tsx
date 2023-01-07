import { useMemo } from 'react';

const useParseCountryInformation = (data) => {
  const information = useMemo(
    () => ({
      name: data.name.common,
      officialName: data.name.official,
      flagURL: data.flags.svg,
      languages: data.languages
        ? Object.entries(data.languages)
            .map((entry) => entry[1])
            .join(', ')
        : '',
    }),
    [data]
  );

  return information;
};

export default useParseCountryInformation;
