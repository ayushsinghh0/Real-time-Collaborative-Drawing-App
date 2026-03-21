import  { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "../generated/prisma/client.js";

console.log("DataBase Connected")
const connectionString = 'postgresql://neondb_owner:npg_ghYfPecCj5J8@ep-calm-voice-ad7hczn4-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter });

export default prisma;