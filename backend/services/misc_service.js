import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// Obtenir tous les restaurants
export async function getAllCountries() {
    return prisma.country.findMany();
}