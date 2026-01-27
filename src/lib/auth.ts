import { betterAuth, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: [process.env.FRONTEND_URL!],
    user: {
        additionalFields: {
            role: {
                type: ["ADMIN", "CUSTOMER", "SELLER"],
                required: false,
                defaultValue: "CUSTOMER"
            },
            contact: {
                type: "string",
                required: false,
            },
            bio: {
                type: "string",
                required: false,
            },
            age: {
                type: "number",
                required: false
            },
            isBanned: {
                type: "boolean",
                required: false,
                defaultValue: false
            },
            storeName: {
                type: "string",
                required: false
            }
        }
    }
});