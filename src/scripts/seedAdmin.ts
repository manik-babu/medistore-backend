import { UserRole } from "../../generated/prisma/enums"
import { prisma } from "../lib/prisma";

async function seedAdmin() {
    try {
        const adminData = {
            name: "Admin",
            email: "admin@admin.com",
            password: "admin1234",
            role: UserRole.ADMIN
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

        const data = await fetch(`http://localhost:8080/api/auth/sign-up/email`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Origin: "http://localhost:8080"
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