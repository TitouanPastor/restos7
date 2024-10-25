import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const registerUser = async (name, firstname, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);  // Hash du mot de passe

    try {
        const response = await prisma.user.create({
            data: {
                name,              // Nom de l'utilisateur
                firstname,         // Prénom de l'utilisateur
                email,             // Email de l'utilisateur
                password: hashedPassword, // Mot de passe hashé
                // Pas besoin d'inclure Id_Photo ici car il est facultatif
            },
        });
        return response;
    } catch (error) {
        console.error("Error creating user: ", error);
        throw error;
    }
};


const loginUser = async (email, password) => {
    // Recherche de l'utilisateur par email
    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            userPermissions: {
                include: {
                    permission: true,
                }
            }
        }, // Inclure les permissions de l'utilisateur
    });

    // Vérification de l'existence de l'utilisateur
    if (!user) {
        throw new Error('Email not found');
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password');
    }

    // Génération du token JWT
    const token = jwt.sign(
        { userId: user.Id_User, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    // Exclure le mot de passe de l'objet utilisateur
    const { password: _, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword };
};


const findUserById = async (id) => {
    return prisma.user.findUnique({
        where: { id },
    });
};

export default {
    registerUser,
    loginUser,
    findUserById,
};