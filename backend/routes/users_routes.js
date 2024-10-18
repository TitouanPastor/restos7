import express from 'express';
import usersController from '../controllers/users_controller.js';
import authMiddleware from '../middlewares/auth_middleware.js';
const router = express.Router();

// Route for getting user personal info with auth middleware
router.get('/me', authMiddleware, usersController.getUserPersonnalInfo);

export default router;