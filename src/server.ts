import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import projectRoutes from './routes/project.routes';

dotenv.config();

connectDB();

const app = express();

//Lecturas de formato JSON
app.use(express.json());

//Rutas
app.use('/api/projects', projectRoutes);

export default app;