import { toNodeHandler } from 'better-auth/node';
import express, { Application, Request, Response } from 'express';
import { auth } from './lib/auth';
import authMiddleware from './middleware/auth'
import globalErrorHandler from './middleware/errorHandler';
import cors from 'cors'
import { sellerRoute } from './modules/seller/seller.routes';
import { adminRoute } from './modules/admin/admin.routes';
import { UserRole } from '../generated/prisma/enums';
import { medicineRoute } from './modules/medicine/medicine.routes';
import { reviewRoute } from './modules/review/review.routes';
import { cartRoute } from './modules/cart/cart.routes';

const app: Application = express();

app.use(cors({
    origin: [process.env.FRONTEND_URL!],
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded());

// Better-auth api
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/seller", authMiddleware(UserRole.SELLER), sellerRoute);
app.use("/api/admin", authMiddleware(UserRole.ADMIN), adminRoute);
app.use("/api", medicineRoute);
app.use("/api/reviews", reviewRoute);
app.use('/api/cart', authMiddleware(UserRole.CUSTOMER), cartRoute);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        ok: true,
        message: "API is running successfully",
        server: "MediStore API",
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