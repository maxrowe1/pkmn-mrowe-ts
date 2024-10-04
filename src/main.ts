import { combatantUseMove } from "./battle-logic.js";
import { sendPutRequest } from "./button-logic.js";
import { Response } from "./classes/Enums.js";
import { Move } from "./classes/Move.js";
import { getData } from "./utils.js";

let healthDisplays: { [key: number]: HTMLElement }
healthDisplays = {
    0: document.getElementById("player_health") as HTMLElement,
    1: document.getElementById("enemy_health") as HTMLElement
}

let attackButtons = Array.from(document.getElementsByName("attack"));
attackButtons.forEach((attackButton) => {
    attackButton?.addEventListener("click", useMove);
})

const messageDisplay = document.getElementById("message") as HTMLElement;

const player_name = document.getElementById("player_name") as HTMLElement;
const enemy_name = document.getElementById("enemy_name") as HTMLElement;

function getPlayerMove(index: number) {
    return getData().pokemon[0].moves.find((move: Move) => {
        return move.number == index;
    })
}

function hideMoveButtons(hidden: boolean) {
    attackButtons.forEach((attackButton) => {
        attackButton.hidden = hidden;
    })
}

function resetMessage() {
    messageDisplay.textContent = "What will you do?";
}

async function messageDelay() {
    await new Promise(f => setTimeout(f, 3000));
}

async function runResponses(move: Move, responses: Response[], user: HTMLElement, target: HTMLElement) {
    if (responses.includes(Response.HIT)) {
        // Attack hitting should run first
        // TODO: Health blinks and changes color?
        await messageDelay();
    }

    const target_name = target.textContent;
    const stage_effect = move.stage_effect ? move.stage_effect : 0;
    const stat_name = move.stat ? move.stat.toString() : '';

    for (const response of responses) {
        switch (response) {
            case Response.MISS:
                messageDisplay.textContent = `${user.textContent}'s attack missed!`
                break;
            case Response.STAT:
                // [Pokemon]'s [stat] (2:greatly) [rose|fell] (3:drastically)!
                messageDisplay.textContent = `${target_name}'s ${stat_name} ${Math.abs(stage_effect) == 2 ? 'greatly ' : ''}${stage_effect > 0 ? 'rose' : 'fell'}${Math.abs(stage_effect) == 3 ? ' drastically!' : ''}!`
                break;
            case Response.STAT_FAIL:
                if (!responses.includes(Response.HIT)) {
                    // Message does not display if move hits but its stat change does not happen
                    // [Pokémon]'s [stat] won't go higher/lower!
                    messageDisplay.textContent = `${target_name}'s ${stat_name} won't go ${stage_effect > 0 ? 'higher': 'lower'}!`
                }
                break;
            default:
                continue;
        }
        await messageDelay();
    }
}

async function useMove(this: HTMLButtonElement, ev: Event) {
    // TODO: Speed determines who goes first
    ev.preventDefault();
    hideMoveButtons(true);

    const move_id = Number(this.id);
    const move = getPlayerMove(move_id);
    messageDisplay.textContent = `${player_name.textContent} used ${move.name}!`
    const responses = await combatantUseMove(0, move);
    console.log("Player move is complete.");
    await messageDelay();

    await runResponses(move, responses, player_name, enemy_name);

    updateHealthDisplay();
    hideMoveButtons(false);
    resetMessage();

    // TODO: Save after both moves are complete
    sendPutRequest(getData()).catch(console.error);
}

function updateHealthDisplay() {
    const pokemon = getData().pokemon;
    [0,1].forEach(index => {
        const combatant = pokemon[index]
        const healthPercentage = (combatant.hp_current / combatant.hp_max) * 100;

        let healthDisplay = ""
        for (let i = 0; i < 100; i +=5) {
            if (healthPercentage > i) {
                healthDisplay += "\u2588"
            } else {
                healthDisplay += "|"
            }
        }
        healthDisplays[index].textContent = healthDisplay;
    });
}

function initialize() {
    const data = getData();
    const player = data.pokemon[0];

    player_name.textContent = player.pokemon.name;
    enemy_name.textContent = data.pokemon[1].pokemon.name;

    attackButtons.forEach((attackButton) => {
        attackButton.textContent = getPlayerMove(Number(attackButton.id))?.name;
        if (!attackButton.textContent) {
            attackButton.hidden = true;
        }
    })
    attackButtons = attackButtons.filter((attackButton) => {
        return !attackButton.hidden
    })

    resetMessage();
    updateHealthDisplay();
}

initialize();