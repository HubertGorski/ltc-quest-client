import { Role } from "@/models/Role";

export const roles = [
    new Role(1, "Owner", [1,1,1,1,1]),
    new Role(1, "Admin", [1,1,1,1,0]),
    new Role(1, "Mod", [1,0,0,0,0]),
    new Role(1, "User", [0,0,0,0,0]),
]