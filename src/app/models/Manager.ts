import { User } from "./User";

export interface Manager extends User {
  firstname:    string;
  lastname:     string;
  gender:       string;
}
