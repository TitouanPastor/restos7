import {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    addPhoto,
    addRestaurantPhotoLink,
    addReview
} from '../services/restaurant_service.js';

import axios from 'axios';

import { stringSimilarity } from "string-similarity-js";

// Obtenir tous les restaurants
export async function getAllRestaurantsHandler(req, res) {
    try {
        const restaurants = await getAllRestaurants();
        const centerCoordinates = await getCenterCoordinatesHandler(restaurants);
        res.status(200).json({ restaurants, centerCoordinates });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getCenterCoordinatesHandler(restaurants) {
    const center = restaurants.reduce((acc, restaurant) => {
        acc.latitude += restaurant.latitude;
        acc.longitude += restaurant.longitude;
        return acc;
    }, { latitude: 0, longitude: 0 });

    center.latitude /= restaurants.length;
    center.longitude /= restaurants.length;

    return center;
}
    

// Obtenir un restaurant par son ID
export async function getRestaurantByIdHandler(req, res) {
    try {
        const restaurant = await getRestaurantById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        const centerCoordinates = { latitude: restaurant.latitude, longitude: restaurant.longitude };
        res.status(200).json({restaurant, centerCoordinates});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getRestaurantByNameHandler(req, res) {
    try {
        const restaurant = await getAllRestaurants();
        // Trouver un pourcentage de similarité entre le nom du restaurant et le nom recherché
        const similarity = restaurant.map((r) => {
            const similarity = stringSimilarity(r.name, req.params.name, 1);
            return { ...r, similarity };
        });

        // Trier les restaurants par similarité
        const sortedRestaurants = similarity.sort((a, b) => b.similarity - a.similarity);

        // Si le premier restaurant a une similarité inférieure à 0.7, on ne retourne que le premier
        /*if (sortedRestaurants[0].similarity < 0.7) {
            return res.status(200).json([sortedRestaurants[0]]);
        }*/

        // Retourner les restaurants avec un score de similarité supérieur à 0.7
        const filteredRestaurants = sortedRestaurants.filter((r) => r.similarity > 0.2);
        const centerCoordinates = await getCenterCoordinatesHandler(filteredRestaurants);
        res.status(200).json({restaurants: filteredRestaurants, centerCoordinates});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Créer un nouveau restaurant
export async function createRestaurantHandler(req, res) {
    try {
        // récupérer la longitude et la latitude avec l'api gmap
        const address = `${req.body.address} ${req.body.postal_code} ${req.body.city}`;
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GMAP_API_KEY}`);
        const location = response.data.results[0].geometry.location;
        req.body.latitude = location.lat;
        req.body.longitude = location.lng;
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

// Ajouter une review
export async function addReviewHandler(req, res) {
    try {
        req.body.Id_Restaurant = parseInt(req.params.restaurantId, 10);
        req.body.Id_User = req.jwtUserId;
        const newReview = await addReview(req.body);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
