import "reflect-metadata";
import express from 'express';
import { json } from 'body-parser';
import authRouter from './auth/infraestructure/authRoutes';
import { AppDataSource } from './shared/ormconfig';
import { errorHandler } from "./shared/middleware/errorMiddleware";
import { errorNotFound } from "./shared/middleware/errorNotFoundMiddleware";
import walletRoutes from "./wallet/insfraestructure/walletRoutes";

const app = express();
const PORT = process.env.PORT || 3001;
app.use(json());

AppDataSource.initialize().then(() => {
    AppDataSource.runMigrations().then(() => {
        app.use(authRouter);
        app.use(walletRoutes);

        app.use(errorHandler);
        app.use(errorNotFound);

        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
    });
    console.log("Database connected successfully");
}).catch((error) => console.error(error));




