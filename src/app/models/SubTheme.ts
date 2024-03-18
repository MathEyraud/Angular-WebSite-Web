import { Theme } from "./Theme";

export interface SubTheme {
    id: number;
    subthemeTitle: string;
    description: string;
    creationDate: Date;
    updateDate: Date;
    themes: Theme[];
}