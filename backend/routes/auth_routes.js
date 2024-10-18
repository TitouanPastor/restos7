// /routes/auth_routes.js
import express from 'express';
import authController from '../controllers/auth_controller.js';
const router = express.Router();

// Route for user registration
router.post('/register', authController.register);

// Route for user login
router.post('/login', authController.login);

export default router;