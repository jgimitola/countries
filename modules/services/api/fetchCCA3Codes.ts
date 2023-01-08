import { CountryResponse } from '@geonatives-types/index';

import { get } from '@services/http';

const fetchCCA3Codes = async () => {
  const response = await get<CountryResponse[]>(`/all`, {
    baseURL: process.env.API_URL,
  });

  return response.data?.map((country) => country.cca3) || [];
};

export default fetchCCA3Codes;
