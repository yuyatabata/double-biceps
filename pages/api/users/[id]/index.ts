import { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { findUser } from '../../../../prisma/apis/users';

const handler = (req: NextApiRequest, res: NextApiResponse<User | null>) => {
  
  (async() => {
    // NOTE: Next.jsのDynamic Routing では配列を許容しているため
    const [userId] = [req.query.id].flat(1)
    
    // NOTE: Next.jsのDynamic Routing では初回レンダリング時にルートパラメータが提供されずundefinedになるため
    if (userId) {
      const findedUser =  await findUser(userId)
      res.status(200).json(findedUser)
    }
  })()

}

export default handler