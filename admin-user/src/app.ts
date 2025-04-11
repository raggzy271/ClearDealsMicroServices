import express from 'express';
import cors from 'cors';
import adminUserRoutes from './routes/adminUserRoutes';
import sequelize from './config/database';
import { ROUTES } from './constants/routes.constants';
import { successResponse } from './utils/response';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));

// Routes
app.use(ROUTES.API, adminUserRoutes);

// Health check
app.get(ROUTES.HEALTH, (req, res) => {
    successResponse(res, 'Server is running', null);
});

export default app;