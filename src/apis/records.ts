import { prisma } from './prismaClient';

export const findRecords = async (userId: string) => {
  const records = await prisma.record.findMany({
    where: {
      userId: +userId
    }
  });
  return records
}

export const postRecord = async (userId: string, exerciseId: string, date: Date, weight: number, setCount: number, times:number) => {
  const record = await prisma.record.create({
    data: {
      userId: +userId,
      exerciseId: +exerciseId,
      date: date,
      weight: weight,
      setCount: setCount,
      times: times
    },
  });
  return record
}