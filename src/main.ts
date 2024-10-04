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

let combatantNames: { [key: number]: HTMLElement }
combatantNames = {
    0: document.getElementById("player_name") as HTMLElement,
    1: document.getElementById("enemy_name") as HTMLElement
}

let attackButtons = Array.from(document.getElementsByName("attack"));
attackButtons.forEach((attackButton) => {
    attackButton?.addEventListener("click", selectMove);
})

const messageDisplay = document.getElementById("message") as HTMLElement;

function getCombatantMove(combatant_index:number, move_number: number) {
    return getData().pokemon[combatant_index].moves.find((move: Move) => {
        return move.number == move_number;
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

async function messageDelay(ms: number = 3000) {
    await new Promise(f => setTimeout(f, ms));
}

async function runResponses(move: Move, responses: Response[], userIndex: number, targetIndex: number) {
    if (responses.includes(Response.HIT)) {
        // Attack hitting should run first
        // TODO: Health blinks and changes color?
        updateHealthDisplay();
        for (let i = 0; i < 4; i++) {
            // Health bar blinks
            healthDisplays[targetIndex].hidden = true;
            await messageDelay(100);
            healthDisplays[targetIndex].hidden = false;
            await messageDelay(100);
        }

    }

    const target_name = combatantNames[targetIndex].textContent;
    const stage_effect = move.stage_effect ? move.stage_effect : 0;
    const stat_name = move.stat ? move.stat.toString() : '';

    for (const response of responses) {
        switch (response) {
            case Response.MISS:
                messageDisplay.textContent = `${combatantNames[userIndex].textContent}'s attack missed!`
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

async function useMove(combatant_index: number, move_number: number) {
    const move = getCombatantMove(0, move_number);
    messageDisplay.textContent = `${combatantNames[combatant_index].textContent} used ${move.name}!`
    const responses = await combatantUseMove(combatant_index, move);
    console.log("Player move is complete.");
    await messageDelay();
    await runResponses(move, responses, 0, 1);
}

async function selectMove(this: HTMLButtonElement, ev: Event) {
    // TODO: Speed determines who goes first
    ev.preventDefault();
    hideMoveButtons(true);

    // Player uses move
    const move_id = Number(this.id);
    await useMove(0, move_id);

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
        if (healthPercentage > 50) {
            healthDisplays[index].style["color"] = "green";
        } else if (healthPercentage > 25) {
            healthDisplays[index].style["color"] = "orange";
        } else {
            healthDisplays[index].style["color"] = "red";
        }

        let healthDisplay = ""
        for (let i = 0; i < 100; i += 2) {
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

    combatantNames[0].textContent = player.pokemon.name;
    combatantNames[1].textContent = data.pokemon[1].pokemon.name;

    attackButtons.forEach((attackButton) => {
        attackButton.textContent = getCombatantMove(0, Number(attackButton.id))?.name;
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