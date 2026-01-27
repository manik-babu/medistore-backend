import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from '../lib/auth'
import { UserRole } from "../types/userRole";

const auth = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const session = await betterAuth.api.getSession({
                headers: req.headers as any
            });

            if (!session) {
                return res.status(401).json({
                    ok: false,
                    status: 401,
                    message: "You are not authorized",
                    error: "Session not found"
                })
            }
            if (!roles.includes(session.user.role as UserRole)) {
                return res.status(401).json({
                    ok: false,
                    status: 401,
                    message: "You don't have permission to access",
                    error: "User role does't match"
                })
            }

            req.user = {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                role: session.user.role as UserRole
            }
            next();
        } catch (error: any) {
            console.log(error)
            res.status(500).json({
                ok: false,
                status: 500,
                message: 'Internal server error!',
                errors: error.message
            });
        }
    }
}

export default auth;