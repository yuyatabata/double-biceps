import { Exercise } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { findExercises,postExercise } from '@/apis/exercises';

const handler = async (req: NextApiRequest, res: NextApiResponse<Exercise[] | Exercise>) => {
  const { method } = req;

  // NOTE: Next.jsのDynamic Routing では配列を許容しているが、仕様上許可していない
  const [userId] = [req.query.id].flat(1)

  // NOTE: Next.jsのDynamic Routing では初回レンダリング時にルートパラメータが提供されずundefinedになるため
  if (userId) {
    switch (method) {
      case 'GET':
        const exercises =  await findExercises(userId)
        res.status(200).json(exercises)    
        break;
      
      case 'POST':
        const exercise =  await postExercise(req.body.name, userId)
        res.status(200).json(exercise)
        break;
      
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }

}

export default handler