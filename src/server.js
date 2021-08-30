import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import morgan from 'morgan';

dotenv.config();

connectDB();

const app = express();

app.use(morgan('tiny'));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow);
});
