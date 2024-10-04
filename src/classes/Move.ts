import { Type, Category, Stat } from "./Enums";

export class Move {
    id!: number;
    number!: number;
    name!: string;
    type!: Type;
    category!: Category;
    power?: number;
    accuracy!: number;
    base_pp!: number;
    stat?: Stat;
    target_self?: boolean;
    stage_effect?: number;
    can_crit?: boolean;
}