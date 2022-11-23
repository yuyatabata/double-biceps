import { prisma } from './prismaClient';

export const findExercises = async (userId: string) => {
  const exercises = await prisma.exercise.findMany({
    where: {
      userId: +userId
    }
  });
  return exercises
}

export const postExercise = async (name: string, userId: string) => {
  const exercise = await prisma.exercise.create({
    data: {
      name: name,
      userId: +userId
    },
  });
  return exercise
}