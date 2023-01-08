import { useMemo } from 'react';

import { CountryResponse } from '@geonatives-types/index';

export interface CountryInformation {
  name: string;
  officialName: string;
  flagURL?: string;
  languages: string;
}

const useParseCountryInformation = (
  data: CountryResponse
): CountryInformation => {
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
