import { Stat, Type } from './Enums';
import {Move} from './Move'
import { Pokemon } from './Pokemon';

export class PokemonCombatant {
    id!: number;
    pokemon!: Pokemon;
    hp_current!: number;
    hp_max!: number;
    attack!: number;
    defense!: number;
    sp_attack!: number;
    sp_defense!: number;
    speed!: number;
    types!: Type[];
    moves!: Move[];
    stats!: StatMap;
}

export class StatData {
    base_stat!: number;
    stage!: number;
}

type StatMap = {
    [key in string]: StatData;
};