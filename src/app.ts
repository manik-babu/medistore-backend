import { toNodeHandler } from 'better-auth/node';
import express, { Application, Request, Response } from 'express';
import { auth } from './lib/auth';

const app: Application = express();

app.use(express.json());

// Better-auth api
app.all("/api/auth/*splat", toNodeHandler(auth));

app.get('/', (req: Request, res: Response) => {
    res.send("Hello world")
})


export default app;