import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUserPersonnalInfo = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: { Id_User: userId },
            select: {
                name: true,
                firstname: true,
                email: true,
            },
        });
        // TODO : if there is an image, get the link to the image
        return user;
    } catch (error) {
        console.error("Error getting user info: ", error);
        throw new Error('An error occurred while getting user info');
    }
};

export default {
    getUserPersonnalInfo,
};