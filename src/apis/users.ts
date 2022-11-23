import { prisma } from './prismaClient';

export const findUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: +userId
    }
  });
  return user
}