import app from "./app";
import { prisma } from "./lib/prisma";

const port = process.env.PORT || 8080;

(async () => {
    try {
        await prisma.$connect();
        console.log("Database connected successfully")

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        })
    } catch (error) {
        console.log("Error to run server");
        prisma.$disconnect();
        process.exit(1);
    }
})();