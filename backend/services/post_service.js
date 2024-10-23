import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Récupérer tous les posts
export const getAllPosts = async () => {
    return prisma.post.findMany();
};

// Récupérer un post par ID
export const getPostById = async (postId) => {
    return prisma.post.findUnique({
        where: {
            id: parseInt(postId),
        },
    });
};

// Créer un post
export const createPost = async (Id_Restaurant, Id_User, comment, Id_Post_Parent) => {
    return prisma.post.create({
        data: {
            Id_Restaurant: parseInt(Id_Restaurant),
            Id_User: parseInt(Id_User),
            comment,
            Id_Post_Parent,
        },
    });
};

// Mettre à jour un post
export const updatePost = async (postId, restaurantId, comment) => {
    return prisma.post.update({
        where: {
            Id_Post: parseInt(postId),
            Id_Restaurant: parseInt(restaurantId),
        },
        data: {
            comment,
        },
    });
};

// Supprimer un post
export const deletePost = async (postId, restaurantId) => {
    return prisma.post.delete({
        where: {
            Id_Post: parseInt(postId),
            Id_Restaurant: parseInt(restaurantId),
        },
    });
};

// Upvoter un post
export const upvotePost = async (postId, restaurantId) => {
    return prisma.post.update({
        where: {
            Id_Post: parseInt(postId),
            Id_Restaurant: parseInt(restaurantId),
        },
        data: {
            upvotes: {
                increment: 1,
            },
        },
    });
};

// Downvoter un post
export const downvotePost = async (postId, restaurantId) => {
    return prisma.post.update({
        where: {
            Id_Post: parseInt(postId),
            Id_Restaurant: parseInt(restaurantId),
        },
        data: {
            downvotes: {
                increment: 1,
            },
        },
    });
};

// Récupérer les réponses à un post
export const getReplies = async (postId, restaurantId) => {
    return prisma.post.findMany({
        include: {
            replies: true,
        },
        where: {
            Id_Post: parseInt(postId),
            Id_Restaurant: parseInt(restaurantId),
        },
    });
};

// Récupérer les posts d'un utilisateur
export const getPostsByUserId = async (userId) => {
    return prisma.post.findMany({
        where: {
            Id_User: parseInt(userId),
        },
    });
};

// Récupérer les posts d'un restaurant
export const getPostsByRestaurantId = async (restaurantId) => {
    return prisma.post.findMany({
        where: {
            Id_Restaurant: parseInt(restaurantId),
        },
    });
};

// Vérifier si un utilisateur est propriétaire du post
export const isPostOwner = async (postId, userId, restaurantId) => {
    const post = await prisma.post.findUnique({
        where: {
            Id_Post: parseInt(postId),
            Id_User: parseInt(userId),
            Id_Restaurant: parseInt(restaurantId),
        },
    });
    return post !== null;
};
