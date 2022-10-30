import { get } from '@services/http';

const fetchSearchPredicate = async (predicate) => {
  const response = await get(`/name/${predicate}`);

  if (response.status < 400)
    return { options: response.data, status: response.status };

  return { options: [], status: response.status };
};

export default fetchSearchPredicate;
