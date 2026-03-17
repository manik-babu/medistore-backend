import { prisma } from "../lib/prisma";

const BACKEND_URL = "https://medistore-unique.vercel.app";  // "http://localhost:8080" for dev
async function seedAdmin() {
    try {
        const adminData = {
            name: "Admin",
            email: "admin@gmail.com",
            password: "medistore",
            role: "ADMIN"
        };

        const user = await prisma.user.findUnique({
            where: {
                email: adminData.email
            },
            select: {
                id: true
            }
        });

        if (user) {
            throw new Error("User already exists");
        }

        const data = await fetch(`${BACKEND_URL}/api/auth/sign-up/email`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Origin: `${BACKEND_URL}`
            },
            body: JSON.stringify(adminData)
        });
        if (data.ok) {
            await prisma.user.update({
                where: {
                    email: adminData.email
                },
                data: {
                    emailVerified: true
                }
            });
            console.log("Admin created successfully");
        }
    } catch (error) {
        console.log(error);
    }
}
seedAdmin();