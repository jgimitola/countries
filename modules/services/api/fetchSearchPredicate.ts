import { CountryResponse } from '@geonatives-types/index';

import { get } from '@services/http';

const fetchSearchPredicate = async (predicate: string) => {
  const response = await get<CountryResponse[]>(`/name/${predicate}`);

  return { options: response.data || [], status: response.status };
};

export default fetchSearchPredicate;
