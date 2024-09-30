import { Manager } from "./button-logic.js";

export function initialize() {
    let manager = new Manager();
    manager.initFunction();
    console.log("ANYTHING??");
}

initialize();