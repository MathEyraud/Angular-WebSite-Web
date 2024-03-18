import { Employee } from "./Employee";
import { IntraSession } from "./IntraSession";
import { User } from "./User";

export interface Company extends User {
    id          : number;
    activity    : string;
    name        : string;
    employees   : Employee[];
    intraSession: IntraSession[];
} 