import { Category, Stat, Response } from "./classes/Enums.js";
import { Move } from "./classes/Move.js";
import { PokemonCombatant } from "./classes/PokemonCombatant.js";
import { equalCategory, getData, setData } from "./utils.js";

/**
 * Gen I math
 * Gen VII+ probability
 * Calculated based on Stat stage from attacker; TODO: simple for now; include stages
 * @returns 2 if a critical hit, 1 otherwise (no effect on attack)
 */
function getCritical() {
    return Math.floor(Math.random() * 24) == 1 ? 2 : 1;
}

/**
 * Stage can be any whole number between and including -6 and 6.
 * Stage represents how much a stat has been increased or decreased during the fight.
 * @param stage 
 * @returns 
 */
function getStage(stage: number) {
    return Math.abs(stage) <= 6 ? stage : Math.sign(stage) * 6
}

/**
 * Total stat value is multiplied by current stage modifier.
 * @param stat_data
 * @returns 
 */
function getCurrentStat(combatant: PokemonCombatant, stat: Stat) {
    const stat_data = getStat(combatant, stat);
    const use_stage = getStage(stat_data?.stage!!);
    return stat_data?.base_stat!! * (1 + (.5 * use_stage));
}

function getStat(combatant: PokemonCombatant, stat: Stat) {
    return combatant.stats[Stat[stat]]
}

/**
 * Gen I description
 * Effective physical stat of the Pokémon if the used move is a physical move, or the effective Special stat
 * of the Pokémon if the used move is a special move.
 * For a critical hit, all modifiers are ignored, and the unmodified stat is used instead.
 * 
 * @param move 
 * @param combatant Attacker or defender
 * @param phy Attack or Defense
 * @param spc Special Attack or Special Defense
 * @param critical_mod If move will crit
 * @returns Total value of relevant stat at current stage for the combatant
 */
function getScore(move: Move, combatant: PokemonCombatant, phy: Stat, spc: Stat, critical_mod: number) {
    const is_physical = equalCategory(move.category.toString(), Category.PHYSICAL);
    const stat = is_physical ? phy : spc as Stat;
    const stat_data = getStat(combatant,stat);
    return critical_mod > 1 ? stat_data?.base_stat : getCurrentStat(combatant,stat)!!
}

/**
 * Gen I description
 * random is realized as a multiplication by a random uniformly distributed integer between 217 and 255 (inclusive),
 * followed by an integer division by 255. If the calculated damage thus far is 1, random is always 1.
 * 
 * @param damage Damage calculated up until this point
 * @returns Final damage calculation
 */
function getRandomDamage(damage: number) {
    const max = 255;
    const min = 217;
    if (damage == 1) {
        return 1;
    }
    return Math.floor(Math.random() * (max - min + 1) + min) / max;
}

/**
 * Increase/decrease stat modifer (stage) within range -6 to 6 for the combatant.
 * 
 * @param combatant Target whose stats are being modified
 * @param move Tells us what stat is impacted and by how much
 */
function modifyStage(combatant: PokemonCombatant, move: Move) {
    let stat_data = combatant.stats[move.stat!!];
    stat_data.stage += move.stage_effect!!;
    stat_data.stage = getStage(stat_data.stage);
}

/**
 * Combatant uses one of their moves. Results of the attack are sent to
 * the battle api, which then sends it over kafka to save the current status of the game.
 * 
 * @param combatant_index Game index [0,1] of which combatant used the move
 * @param move The move the combatant used.
 * @returns 
 */
export async function combatantUseMove(combatant_index:number, move: Move): Promise<Response[]> {
    const data = getData();
    if (move.accuracy < 100) {
        const rand_accuracy = Math.random() * 100
        if (rand_accuracy > move.accuracy) {
            // Move missed; no changes
            return [Response.MISS];
        }
    }

    let response;
    const attacker = data.pokemon[combatant_index] as PokemonCombatant;
    const target = data.pokemon[move.target_self ? combatant_index : Math.abs(combatant_index-1)];

    // Move hits
    if (!equalCategory(move.category.toString(), Category.STATUS)) {
        // Move affects target's health
        response = [Response.HIT]

        // Damage is increased based on randomized critical hit modifier
        const critical_mod = move.can_crit ? getCritical() : 1

        // The effective (Special)Attack stat of the attacking Pokémon
        const attack = getScore(move, attacker, Stat.ATTACK, Stat.SP_ATTACK, critical_mod);
        // The effective (Special)Defense stat of the target Pokémon
        const defense = getScore(move, target, Stat.DEFENSE, Stat.SP_DEFENSE, critical_mod);

        // Same type ability bonus (move type matches one of the attacker's two types)
        const stab = attacker.types.includes(move.type) ? 1.5 : 1

        // Effectiveness against both of target's types
        // TODO
        const type_bonus = 1

        // Gen I damage calculation, as seen on Bulbapedia
        let damage = (( (((2 * 100 * critical_mod) / 5 + 2) * move.power!! * (attack!!/defense!!)) / 50 ) + 2) * stab * type_bonus
        damage *= getRandomDamage(damage)

        // HP = HP - damage (rounded down); HP minimum of 0
        const hp_current = target.hp_current - Math.floor(damage);
        target.hp_current = hp_current < 0 ? 0 : hp_current;

        // TODO: response.concat -- Attack causes stat effect
    } else {
        // Target is affected by stat changes
        const current_stage = target.stats[move.stat!!].stage
        modifyStage(target, move);
        if (current_stage != target.stats[move.stat!!].stage) {
            response = [Response.STAT];
        } else {
            response = [Response.STAT_FAIL];
        }
    }

    setData(data);
    return response;
}