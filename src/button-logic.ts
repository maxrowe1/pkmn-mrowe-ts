import {Pokemon} from './classes/Pokemon'

class StateObject {
  0: Pokemon
  1: Pokemon
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

  fetchGET(url: string): Promise<StateObject> {
    const host: string = 'http://127.0.0.1:5000';

    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')

    const request: RequestInfo = new Request(`${host}/${url}`, {
      method: 'GET',
      headers: headers
    })

    // For our example, the data is stored on a static `users.json` file
    return fetch(request)
      // the JSON body is taken from the response
      .then(res => res.json())
      .then(res => {
        // The response has an `any` type, so we need to cast
        // it to the `User` type, and return it from the promise
        return res as StateObject
      })
  }

  updateScreen() {
    let data = this.stateManager.getState();
    this.playerNameElement.textContent = data["player"]?.name!!;
    this.enemyNameElement.textContent = data["enemy"]?.name!!;
  }

  async getCombatants() {
    const response = await this.fetchGET('game');
    this.stateManager.setState("player", response[0]);
    this.stateManager.setState("enemy", response[1]);
    this.updateScreen();
  }
}
