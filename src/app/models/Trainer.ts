import { User } from "./User";

// trainer.model.ts
export interface Trainer extends User
{
  /*
  User
  id          : number;
  phone       : string;
  email       : string;
  address     : string;
  login       : string;
  password    : string;
  photo       : string;
  creationDate: Date;
  updateDate  : Date;
  */
  
  id                  : number;
  activity            : string;
  cvLink              : string;
  firstName           : string;
  lastName            : string;
  gender              : string;

  // ID de validationTest si nécessaire ou l'objet ValidationTest associé
  validationTestId?   : number;
}