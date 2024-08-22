import { PrismaClient } from "@prisma/client";

/**
 * As this is an export, it is cached.
 */
export const db = new PrismaClient();
