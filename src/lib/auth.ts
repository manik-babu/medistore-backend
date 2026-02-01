import { betterAuth, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "./prisma";
import sendMail from "../helper/sendEmail";

const isProduction = process.env.NODE_ENV === 'production';

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    advanced: {
        defaultCookieAttributes: {
            secure: isProduction, // secure: true only in production
            sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-site in production, 'lax' for dev
            httpOnly: true,
        },
    },
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
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true
    },
    emailVerification: {
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            try {
                await sendMail(user, url, token);
            }
            catch (error) {
                console.log("An error accured ", error);
            }
        },
    },
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});