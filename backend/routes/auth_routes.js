// /routes/auth_routes.js
import express from 'express';
import authController from '../controllers/auth_controller.js';
import authMiddleware from '../middlewares/auth_middleware.js';

const router = express.Router();

// Route for user registration
router.post('/register', authController.register);

// Route for user login
router.post('/login', authController.login);

// check the validity of the token
router.get('/verify-token', authMiddleware, authController.verifyToken);

export default router;
