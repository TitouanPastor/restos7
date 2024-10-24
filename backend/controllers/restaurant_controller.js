import {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    addPhoto,
    addRestaurantPhotoLink
} from '../services/restaurant_service.js';

// Obtenir tous les restaurants
export async function getAllRestaurantsHandler(req, res) {
    try {
        const restaurants = await getAllRestaurants();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Obtenir un restaurant par son ID
export async function getRestaurantByIdHandler(req, res) {
    try {
        const restaurant = await getRestaurantById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Créer un nouveau restaurant
export async function createRestaurantHandler(req, res) {
    try {
        // Créer le nouveau restaurant
        const newRestaurant = await createRestaurant(req.body);

        // Si des fichiers sont uploadés, on les ajoute dans la table Photo
        if (req.files && req.files.length > 0) {
            const photoPromises = req.files.map(async (file) => {
                // Ajouter la photo dans la table "Photo"
                const newPhoto = await addPhoto({
                    url: `/static/uploads/${file.filename}`,  // URL du fichier dans le dossier public
                    alt: file.originalname  // Nom original du fichier
                });

                // Créer une liaison dans la table "Have" entre le restaurant et la photo
                await addRestaurantPhotoLink({
                    Id_Restaurant: newRestaurant.Id_Restaurant,
                    Id_Photo: newPhoto.Id_Photo
                });
            });

            await Promise.all(photoPromises);  // Attendre que toutes les photos soient ajoutées
        }

        // Retourner le restaurant créé avec éventuellement ses photos
        const restaurantWithPhotos = await getRestaurantById(newRestaurant.Id_Restaurant);
        res.status(201).json(restaurantWithPhotos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}





// Mettre à jour un restaurant existant
export async function updateRestaurantHandler(req, res) {
    try {
        const updatedRestaurant = await updateRestaurant(req.params.id, req.body);
        if (!updatedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json(updatedRestaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Supprimer un restaurant
export async function deleteRestaurantHandler(req, res) {
    try {
        const deletedRestaurant = await deleteRestaurant(req.params.id);
        if (!deletedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
