import { prisma } from "../utils/db";
import { logger } from "../utils/logger";

async function seed() {
  await prisma.user.createMany({
    data: [
      { email: "user1@example.com", password: "password123" },
      { email: "user2@example.com", password: "password123" },
    ],
  });

  logger.info("Database seeded successfully");
}

seed()
  .catch((error) => logger.error(error))
  .finally(() => prisma.$disconnect());
