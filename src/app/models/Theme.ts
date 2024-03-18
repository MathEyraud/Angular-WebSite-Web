import { SubTheme } from "./SubTheme";

export interface Theme {
    id              : number;
    themeTitle      : string;
    description     : string;
    creationDate    : Date;
    updateDate      : Date;
    subThemes       : SubTheme[];
}