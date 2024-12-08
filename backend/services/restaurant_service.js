import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// Obtenir tous les restaurants
export async function getAllRestaurants() {
    return prisma.restaurant.findMany({
        include: {
            country: true, // Inclure la relation avec le pays
            photos: {
                include: {
                    photo: true  // Récupère les informations de la table "Photo" via la relation "Have"
                }
            }
        }
    });
}

// Obtenir un restaurant par son ID
export async function getRestaurantById(restaurantId) {
    console.log(restaurantId);
    return prisma.restaurant.findUnique({
        where: {
            Id_Restaurant: parseInt(restaurantId)
        },
        include: {
            country: true,
            posts: true,
            reviews: true,
            reviews: {
                include: {
                    user: {
                        include: {
                            password: false
                        }
                    }
                }
            },
            // Récupérer les photos via la table de jonction "Have"
            photos: {
                include: {
                    photo: true  // Récupère les informations de la table "Photo" via la relation "Have"
                }
            }
        }
    });
}


export async function createRestaurant(data) {
    return prisma.restaurant.create({
        data: {
            name: data.name,
            postal_code: data.postal_code,
            city: data.city,
            address: data.address,
            description: data.description,
            website: data.website,
            Id_Country: parseInt(data.Id_Country),
            latitude: data.latitude,
            longitude: data.longitude,
        }
    });
}


// Ajouter une nouvelle photo dans la table "Photo"
export async function addPhoto(data) {
    console.log(data);
    return prisma.photo.create({
        data: {
            url: data.url,
            alt: data.alt,
        },
    });
}

// Créer une liaison entre un restaurant et une photo dans la table "Have"
export async function addRestaurantPhotoLink(data) {
    await prisma.have.create({
        data: {
            Id_Restaurant: data.Id_Restaurant,
            Id_Photo: data.Id_Photo,
        },
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

// Ajouter un avis (une note) à un restaurant
// addReview service function
export async function addReview(data) {
    // Vérifier si l'utilisateur a déjà laissé un avis sur ce restaurant
    const existingReview = await prisma.review.findFirst({
        where: {
            Id_Restaurant: data.Id_Restaurant,
            Id_User: data.Id_User
        }
    });

    // Si un avis existe déjà, retourner une erreur ou une réponse personnalisée
    if (existingReview) {
        const error = new Error("You have already submitted a review for this restaurant.");
        error.status = 409;
        throw error;
    }

    // Créer un nouvel avis pour le restaurant spécifié
    const newReview = await prisma.review.create({
        data: {
            Id_Restaurant: data.Id_Restaurant,
            Id_User: data.Id_User,
            score: data.score,
            comment: data.comment
        },
        include: {
            user: {
                select: {
                    Id_User: true,
                    firstname: true,
                    name: true,
                    email: true,
                    // Exclure le champ `password` si nécessaire
                }
            }
        }
    });

    // Calculer la nouvelle moyenne des scores pour le restaurant
    const averageScore = await prisma.review.aggregate({
        where: {
            Id_Restaurant: data.Id_Restaurant
        },
        _avg: {
            score: true
        }
    });

    // Mettre à jour le champ avg_score dans le restaurant
    await prisma.restaurant.update({
        where: { Id_Restaurant: data.Id_Restaurant },
        data: { score: averageScore._avg.score }
    });

    return newReview;
}


