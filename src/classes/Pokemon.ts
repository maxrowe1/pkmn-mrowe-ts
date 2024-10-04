import { Type } from "./Enums";

export class Pokemon {
    id!: number;
    name!: string;
    type1!: Type;
    type2?: Type;    
}