import { toNodeHandler } from 'better-auth/node';
import express, { Application, Request, Response } from 'express';
import { auth } from './lib/auth';
import globalErrorHandler from './middleware/errorHandler';
import authMiddleware from "./middleware/auth"
import { UserRole } from './types/userRole';

const app: Application = express();

app.use(express.json());

// Better-auth api
app.all("/api/auth/*splat", toNodeHandler(auth));

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        message: "API is running successfully",
        server: "Circle API",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    });
})
app.use((req: Request, res: Response) => {
    res.status(404).json({
        ok: false,
        status: 404,
        message: "Route not found",
        method: req.method,
        url: req.url,
        timestamp: new Date().toISOString()
    })

})

app.use(globalErrorHandler);


export default app;