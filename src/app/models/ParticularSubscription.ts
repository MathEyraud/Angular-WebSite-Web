import { InterSession } from "./InterSession";
import { Particular } from "./Particular";

export interface ParticularSubscription{

    id              : number;

    status          : string;
    creationDate    : Date;
    updateDate      : Date;
    interSession    : InterSession;
    particular      : Particular;
    
}