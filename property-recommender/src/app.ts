import express from 'express';
import cors from 'cors';
import propertyRoutes from './routes/propertyRoutes';
import sequelize from './config/db';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', propertyRoutes);

// Error handling middleware
app.use(errorHandler);

// Database connection
sequelize.sync()
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

export default app;