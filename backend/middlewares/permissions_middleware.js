import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Middleware pour vérifier si l'utilisateur a la permission nécessaire
const permissionMiddleware = (requiredPermissions) => {
    return async (req, res, next) => {
        const userId = req.jwtUserId; // ID de l'utilisateur extrait du token JWT

        try {
            // Récupérer l'utilisateur et ses permissions via la relation many-to-many
            const user = await prisma.user.findUnique({
                where: { Id_User: userId },
                include: {
                    userPermissions: {
                        include: {
                            permission: true, // Inclut les informations sur la permission
                        },
                    },
                },
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Extraire les noms des permissions de l'utilisateur
            const userPermissions = user.userPermissions.map(up => up.permission.name);
            console.log(userPermissions);
            console.log(requiredPermissions);

            // Vérifier si l'utilisateur possède au moins une des permissions requises
            const hasPermission = requiredPermissions.some(requiredPermission =>
                userPermissions.includes(requiredPermission)
            );
            console.log(hasPermission);

            // Si l'utilisateur n'a pas la permission requise, renvoyer une erreur
            if (!hasPermission) {
                return res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
            }

            // L'utilisateur a les permissions nécessaires, on passe au contrôleur suivant
            next();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
};

export default permissionMiddleware;
