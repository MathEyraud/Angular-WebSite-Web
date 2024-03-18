import { Company } from "./Company";
import { Session } from "./Session";

export interface IntraSession extends Session{
    
    /* SESSION
    id                  : number;
    code                : number;
    duration            : number;
    price               : number;
    description         : string;
    status              : string;
    date                : Date ;
    location            : string;
    sessionScore        : number;
    creationDate        : Date;
    updateDate          : Date;
    
    trainer             : Trainer;
    training            : Training;
    */

    id                  : number;
    company             : Company;
}