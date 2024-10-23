// app.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth_routes.js';
import usersRoutes from './routes/users_routes.js';
import restaurantsRoutes from './routes/restaurants_routes.js';
import dotenv from 'dotenv';

dotenv.config();  // To load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/restaurants', restaurantsRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
