import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// Obtenir tous les restaurants
export async function getAllRestaurants() {
    return prisma.restaurant.findMany({
        include: {
            country: true, // Inclure la relation avec le pays
            photos: true   // Inclure les photos du restaurant
        }
    });
}

// Obtenir un restaurant par son ID
export async function getRestaurantById(restaurantId) {
    return prisma.restaurant.findUnique({
        where: {
            Id_Restaurant: parseInt(restaurantId)
        },
        include: {
            country: true,
            photos: true,
            posts: true,
            notes: true
        }
    });
}

// Créer un nouveau restaurant
export async function createRestaurant(data) {
    return prisma.restaurant.create({
        data: {
            name: data.name,
            postal_code: data.postal_code,
            city: data.city,
            address: data.address,
            description: data.description,
            website: data.website,
            Id_Country: parseInt(data.Id_Country)
        }
    });
}

// Mettre à jour un restaurant existant
export async function updateRestaurant(restaurantId, data) {
    return prisma.restaurant.update({
        where: {
            Id_Restaurant: parseInt(restaurantId)
        },
        data: {
            name: data.name,
            postal_code: data.postal_code,
            city: data.city,
            address: data.address,
            description: data.description,
            website: data.website,
            Id_Country: parseInt(data.Id_Country),
            photos: {
                connect: data.photoIds.map(id => ({ Id_Photo: parseInt(id) }))
            }
        }
    });
}

// Supprimer un restaurant
export async function deleteRestaurant(restaurantId) {
    return prisma.restaurant.delete({
        where: {
            Id_Restaurant: parseInt(restaurantId)
        }
    });
}
