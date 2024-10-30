import express from 'express';

import { getAllCountriesHandler } from '../controllers/misc_controller.js';

import authMiddleware from '../middlewares/auth_middleware.js';

const router = express.Router();

/* ************* RESTAURANT ROUTES ************* */
router.get('/countries', (req, res) => {
    getAllCountriesHandler(req, res);
});

export default router;
