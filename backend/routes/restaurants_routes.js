import express from 'express';
import {
    getPostsByRestaurantIdHandler,
    getPostByIdHandler,
    createPostHandler,
    updatePostHandler,
    deletePostHandler,
    upvotePostHandler,
    downvotePostHandler
} from '../controllers/post_controller.js'; // Import des fonctions du contrôleur

import { getAllRestaurantsHandler, getRestaurantByIdHandler, createRestaurantHandler, updateRestaurantHandler, deleteRestaurantHandler } from '../controllers/restaurant_controller.js';

import authMiddleware from '../middlewares/auth_middleware.js';
import permissionMiddleware from '../middlewares/permissions_middleware.js';

const router = express.Router();

/* ************* RESTAURANT ROUTES ************* */
router.get('/', (req, res) => {
    throw new NotImplementedError(); // Tu pourras implémenter ces routes plus tard
});

router.get('/:id', (req, res) => {
    const restaurantId = req.params.id;
    throw new NotImplementedError();
});

// Post a new restaurant
router.post('/', authMiddleware, permissionMiddleware(["creator","administrator"]), createRestaurantHandler);

router.put('/:id', (req, res) => {
    const restaurantId = req.params.id;
    const updatedRestaurant = req.body;
    throw new NotImplementedError();
});

router.delete('/:id', (req, res) => {
    const restaurantId = req.params.id;
    throw new NotImplementedError();
});

/* ************* POST ROUTES ************* */
router.get('/:restaurantId/posts', getPostsByRestaurantIdHandler);

router.get('/:restaurantId/posts/:postId', getPostByIdHandler);

router.post('/:restaurantId/posts', createPostHandler);

router.put('/:restaurantId/posts/:postId', updatePostHandler);

router.delete('/:restaurantId/posts/:postId', deletePostHandler);

router.put('/:restaurantId/posts/:postId/upvote', upvotePostHandler);

router.put('/:restaurantId/posts/:postId/downvote', downvotePostHandler);

export default router;
