import { Trainer } from "./Trainer";
import { Training } from "./Training";
export interface Session{
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
}