import express from 'express';
import PostController from '../controllers/post_controller';

const router = express.Router();

post_controller = PostController();

/* ************* RESTAURANT ROUTES ************* */
router.get('/restaurants', (req, res) => {
    throw new NotImplementedError();
});

router.get('/restaurants/:id', (req, res) => {
    const restaurantId = req.params.id;
    throw new NotImplementedError();
});

router.post('/restaurants', (req, res) => {
    const newRestaurant = req.body;
    throw new NotImplementedError();
});

router.put('/restaurants/:id', (req, res) => {
    const restaurantId = req.params.id;
    const updatedRestaurant = req.body;
    throw new NotImplementedError();
});

router.delete('/restaurants/:id', (req, res) => {
    const restaurantId = req.params.id;
    throw new NotImplementedError();
});

/* ************* POST ROUTES ************* */
router.get('/restaurants/:restaurantId/posts', (req, res) => {
    post_controller.getPostsByRestaurantId(req, res);
});

router.get('/restaurants/:restaurantId/posts/:postId', (req, res) => {
    post_controller.getPostById(req, res);
});

router.post('/restaurants/:restaurantId/posts', (req, res) => {
    post_controller.createPost(req, res);
});

router.put('/restaurants/:restaurantId/posts/:postId', (req, res) => {
    post_controller.updatePost(req, res);
});

router.delete('/restaurants/:restaurantId/posts/:postId', (req, res) => {
    post_controller.deletePost(req, res);
});

router.put('/restaurants/:restaurantId/posts/:postId/upvote', (req, res) => {
    post_controller.upvotePost(req, res);
});

router.put('/restaurants/:restaurantId/posts/:postId/downvote', (req, res) => {
    post_controller.downvotePost(req, res);
});

module.exports = router;