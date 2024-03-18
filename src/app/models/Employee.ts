import { Company } from "./Company";
import { User } from "./User";

export interface Employee extends User {
    id                  : number;
    firstname           : string;
    lastname            : string;
    gender              : string;
    highestDiploima     : string;
    birthDate           : Date;
    company             : Company;
}