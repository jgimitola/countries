import { get, patch, post, put, remove } from '@services/http';

const globalConfig = { baseURL: process.env.API_URL };

const handler = async (req, res) => {
  try {
    const URL = req.url.split('/api')[1];
    const METHOD = req.method;
    const BODY = req.body;

    let request;
    switch (METHOD) {
      case 'GET':
        request = await get(URL, globalConfig);
        break;

      case 'DELETE':
        request = await remove(URL, globalConfig);
        break;

      case 'POST':
        request = await post(URL, BODY, globalConfig);
        break;

      case 'PUT':
        request = await put(URL, BODY, globalConfig);
        break;

      case 'PATCH':
        request = await patch(URL, BODY, globalConfig);
        break;

      default:
        res.status(400).json({ message: 'Method not supported yet.' });
        break;
    }

    res.status(request.status).json(request.data);
  } catch (error) {
    res.status(500).json({ message: 'An error ocurred', error });
  }
};

export default handler;
