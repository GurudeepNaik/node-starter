// src/services/user.ts
import { prisma, redis } from "../utils/db";

export const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: { email, password },
  });

  // Cache the newly created user in Redis
  await redis.set(`user:${user.id}`, JSON.stringify(user), "EX", 3600); // 1-hour expiration

  return user;
};

export const getUserById = async (userId: number) => {
  // First, try to fetch the user from Redis
  const cachedUser = await redis.get(`user:${userId}`);

  if (cachedUser) {
    return JSON.parse(cachedUser);
  }

  // If user is not found in Redis, fetch from PostgreSQL
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user) {
    // Cache the user data in Redis for future requests
    await redis.set(`user:${userId}`, JSON.stringify(user), "EX", 3600); // Cache for 1 hour
  }

  return user;
};

export const deleteUser = async (userId: number) => {
  await prisma.user.delete({
    where: { id: userId },
  });

  // Invalidate the cached user data in Redis
  await redis.del(`user:${userId}`);
};
