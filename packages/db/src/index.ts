import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/extension'



export const prismaClient = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL!,
}).$extends(withAccelerate())