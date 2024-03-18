import { User } from "./User";

export interface Particular extends User {
    id: number;
    activity: string;
    firstname: string;
    lastname: string;
    gender: string
    highestDiploma: string;
    birthDate: Date;
}