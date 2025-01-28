import "reflect-metadata";
import express from 'express';
import { json } from 'body-parser';
import authRouter from './auth/infraestructure/authRoutes';
import { AppDataSource } from './shared/ormconfig';
import { errorHandler } from "./shared/middleware/errorMiddleware";
import { errorNotFound } from "./shared/middleware/errorNotFoundMiddleware";

const app = express();
const PORT = process.env.PORT || 3001;
app.use(json());

async function initializeDB() {
    try {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to the database", error);
    }
}

initializeDB();

app.use(authRouter)

app.use(errorHandler);
app.use(errorNotFound);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

