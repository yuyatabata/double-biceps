import { Record } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { findRecords, postRecord } from '@/apis/records';

const handler = async (req: NextApiRequest, res: NextApiResponse<Record[] | Record>) => {
  const { method } = req;

  // NOTE: Next.jsのDynamic Routing では配列を許容しているが、仕様上許可していない
  const [userId] = [req.query.id].flat(1)

  // NOTE: Next.jsのDynamic Routing では初回レンダリング時にルートパラメータが提供されずundefinedになるため
  if (userId) {
    switch (method) {
      case 'GET':
        const records =  await findRecords(userId)
        res.status(200).json(records)
        break;

      case 'POST':
        const date = new Date(req.body.date)
        const record =  await postRecord(userId, req.body.exerciseId, date, req.body.weight, req.body.setCount, req.body.times)
        res.status(200).json(record)
        break;
      
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }

}

export default handler