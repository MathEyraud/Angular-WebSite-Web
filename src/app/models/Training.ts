import { Requirement } from "./Requirement";

// training.model.ts
export interface Training{

    id              : number;
    
    title           : string;
    description     : string;
    trainingPrice   : number;
    logo            : string;
    creationDate    : Date;
    updateDate      : Date;

    requirement     : Requirement;
}