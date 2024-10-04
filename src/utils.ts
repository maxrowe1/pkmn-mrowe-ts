import { Category } from "./classes/Enums.js";
import { Game } from "./classes/Game.js";

export const game_state_key = 'game';

export function getData() {
    return JSON.parse(sessionStorage.getItem('game') ?? "{}");
}

export function setData(data: Game) {
    sessionStorage.setItem(game_state_key, JSON.stringify(data));
}

export function equalCategory(category1: string, category2: number) {
    return category1 == Category[category2];
}