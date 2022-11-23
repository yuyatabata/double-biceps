import { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse<User[] | User>) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      const users = await prisma.user.findMany();
      res.status(200).json(users);
      break;

    case 'POST':
      const user = await prisma.user.create({
        data: {
          name: 'Test',
          mail: 'test@gmail.com',
          password: 'testtest',
        },
      });
      res.status(200).json(user); // idを含む保存したデータを返す
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default handler