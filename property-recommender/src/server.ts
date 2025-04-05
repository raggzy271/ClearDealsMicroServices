// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { PORT } from './config/config';

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});