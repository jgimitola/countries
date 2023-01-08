import { CountryResponse } from '@geonatives-types/index';

import { get } from '@services/http';

const fetchByCCA3Code = async (code: string) => {
  const response = await get<CountryResponse[]>(`/alpha/${code}`, {
    baseURL: process.env.API_URL,
  });

  if (response.status < 400) return response.data![0];

  return null;
};

export default fetchByCCA3Code;
