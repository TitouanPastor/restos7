import {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
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
        const newRestaurant = await createRestaurant(req.body);
        res.status(201).json(newRestaurant);
    } catch (error) {
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
