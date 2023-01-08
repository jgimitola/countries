import { get } from '@services/http';

import type { NextApiRequest, NextApiResponse } from 'next';

const globalConfig = { baseURL: process.env.API_URL };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const URL = req.url!.split('/api')[1];
    const METHOD = req.method;

    let request;
    switch (METHOD) {
      case 'GET':
        request = await get<any>(URL, globalConfig);
        break;

      default:
        res.status(400).json({ message: 'Method not supported yet.' });
        return;
    }

    res.status(request.status).json(request.data);
  } catch (error) {
    res.status(500).json({ message: 'An error ocurred', error });
  }
};

export default handler;
