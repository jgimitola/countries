import { get } from '@services/http';

const fetchCCA3Codes = async () => {
  const response = await get(`/all`, { baseURL: process.env.API_URL });

  if (response.status < 400)
    return response.data.map((country) => country.cca3);

  return [];
};

export default fetchCCA3Codes;
