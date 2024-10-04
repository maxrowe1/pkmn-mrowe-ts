import { fetchGame } from "./button-logic.js";
import { Game } from "./classes/Game.js";
import { game_state_key, setData } from "./utils.js";

const game_id_input = document.getElementById("game_id")!! as HTMLInputElement;
const load_button = document.getElementById("load_game")!! as HTMLButtonElement;
const new_button = document.getElementById("new_game")!! as HTMLButtonElement;

let state: { [key: string]: any};
state = { game_id: 0 }

function getState() {
    return state;
}

function setState(key: string, value: any) {
    state[key] = value;
}

function getGameIdFromState() {
    return getState()[game_state_key].id
}

function startBattle() {
    setData(getState()[game_state_key])
    window.location.href = 'battle.php';
}

async function fetchGameFromDB(url:string, method:string = 'GET'): Promise<Game> {
    const game = await fetchGame(url, method) as unknown as Game;
    setState("game", game);
    return game;
}

async function fetchLastId() {
    const last_game = await fetchGameFromDB('game/last');
    if (last_game) {
        game_id_input.value = `${last_game.id}`;    
    }
}

async function fetchById(game_id: number) {
    await fetchGameFromDB(`game/${game_id}`);
    console.log(`Loaded game ${getGameIdFromState()}`)
}

async function loadGame(this: HTMLElement, ev: Event) {
    if (Number(game_id_input.value) !== getGameIdFromState()) {
        // Load a different game than the last one
        await fetchById(Number(game_id_input.value));
    }
    console.log(`Player will play game ${getGameIdFromState()}`)
    startBattle();
    
}

async function newGame(this: HTMLElement, ev: Event) {
    await fetchGameFromDB("game/new", 'POST');
    console.log(`Created new game with ID ${getGameIdFromState()}`)
    startBattle();
}

load_button.addEventListener("click", loadGame);
new_button.addEventListener("click", newGame);

fetchLastId();