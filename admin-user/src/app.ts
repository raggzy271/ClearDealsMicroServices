import express from 'express';
import cors from 'cors';
import adminUserRoutes from './routes/adminUserRoutes';
import sequelize from './config/database';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));

// Routes
app.use('/', adminUserRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

export default app;