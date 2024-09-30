import {Move} from './Move'
import {Type} from './Enums'

export class Pokemon {
    id!: number;
    name!: string;
    type1!: Type;
    type2?: Type;
    hp!: number;
    attack!: number;
    defense!: number;
    sp_attack!: number;
    sp_defense!: number;
    speed!: number;
    moves!: Move[];
}