const { PrismaClient } = require('@prisma/client');

class PostService {

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllPosts() {
        return this.prisma.post.findMany();
    }

    async getPostById(postId) {
        return this.prisma.post.findUnique({
            where: {
                id: parseInt(postId)
            }
        });
    }

    async createPost(Id_Restaurant, Id_User, comment, Id_Post_Parent) {
        return this.prisma.post.create({
            data: {
                Id_Restaurant: parseInt(Id_Restaurant),
                Id_User: parseInt(Id_User),
                comment: comment,
                Id_Post_Parent: Id_Post_Parent
        });
    }

    async updatePost(postId, restaurantId, comment) {
        return this.prisma.post.update({
            where: {
                Id_Post: parseInt(postId),
                Id_Restaurant: parseInt(restaurantId)
            },
            data: {
                comment: comment
            }
        });
    }

    async deletePost(postId, restaurantId) {
        return this.prisma.post.delete({
            where: {
                Id_Post: parseInt(postId),
                Id_Restaurant: parseInt(restaurantId)
            }
        });
    }

    async upvotePost(postId, restaurantId) {
        return this.prisma.post.update({
            where: {
                Id_Post: parseInt(postId),
                Id_Restaurant: parseInt(restaurantId)
            },
            data: {
                upvotes: {
                    increment: 1
                }
            }
        });
    }

    async downvotePost(postId, restaurantId) {
        return this.prisma.post.update({
            where: {
                Id_Post: parseInt(postId),
                Id_Restaurant: parseInt(restaurantId)
            },
            data: {
                downvotes: {
                    increment: 1
                }
            }
        });
    }

    async getReplies(postId, restaurantId) {
        return this.prisma.post.findMany({
            include: {
                replies: true
            },
            where: {
                Id_Post: parseInt(postId),
                Id_Restaurant: parseInt(restaurantId)
            }
        });
    }

    async getPostsByUserId(userId) {
        return this.prisma.post.findMany({
            where: {
                userId: parseInt(userId)
            }
        });
    }

    async getPostsByRestaurantId (restaurantId) {
        return this.prisma.post.findMany({
            where: {
                restaurantId: parseInt(restaurantId)
            }
        });
    }

    async isPostOwner(postId, userId, restaurantId) {
        const post = await this.prisma.post.findUnique({
            where: {
                Id_Post: parseInt(postId),
                Id_User: parseInt(userId),
                Id_Restaurant: parseInt(restaurantId)
            }
        });
        return post !== null;
    }
}

module.exports = new PostService();