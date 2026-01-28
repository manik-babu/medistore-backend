import { UserRole } from "../../generated/prisma/enums";

export type LoggedInUser = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}