import { PokemonCombatant } from "./PokemonCombatant";

export class Game {
    id!: number;
    pokemon!: Map<number, PokemonCombatant>;
}