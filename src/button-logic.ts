import { Game } from './classes/Game';
import {Pokemon} from './classes/Pokemon'

export async function fetchGame<T>(url: string, method: string): Promise<T|null> {
  const host: string = 'http://127.0.0.1:5000';

  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(`${host}/${url}`, {
    method: method,
    headers: headers
  })

  try {
    const res = await fetch(request);
    const res_1 = await res.json();
    return res_1;
  } catch (e) {
    console.error(e)
    return null;
  }
}

class StateManager {
  state: { [key: string]: Pokemon|undefined};

  constructor() {
    this.state = { player: undefined, enemy: undefined};
  }

  getState() {
    return this.state;
  }

  setState(key: string, value: Pokemon) {
    this.state[key] = value;
  }
}

export class Manager {

  stateManager = new StateManager();

  playerNameElement = document.getElementById("player_name")!!;
  enemyNameElement = document.getElementById("enemy_name")!!;

  initFunction() {
    this.getCombatants();

    const attackButtons = document.getElementsByName("attack");
      attackButtons.forEach((attackButton) => {
        attackButton?.addEventListener("click", this.listenerFunction);
      })
    }
    
  listenerFunction(this: HTMLElement, ev: Event) {
    ev.preventDefault();
    let messageElement = document.getElementById("message");
    //getPlayer(this.id as unknown as number).then(player => {
    //  messageElement.textContent = `You pressed Attack ${this.id} on ${player.name}!`
    //});
  }

  updateScreen() {
    let data = this.stateManager.getState();
    this.playerNameElement.textContent = data["player"]?.name!!;
    this.enemyNameElement.textContent = data["enemy"]?.name!!;
  }

  async getCombatants() {
    const response = await fetchGame('game/new', 'GET') as Game;
    if (response !== null) {
      this.stateManager.setState("player", response.pokemon[0]);
      this.stateManager.setState("enemy", response.pokemon[1]);
      this.updateScreen();
    } else {
      alert("Fetch failed! Server may be down.")
    }
  }
}
