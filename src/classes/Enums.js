"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stat = exports.Category = exports.Type = void 0;
var Type;
(function (Type) {
    Type[Type["NORMAL"] = 0] = "NORMAL";
    Type[Type["FIRE"] = 1] = "FIRE";
    Type[Type["WATER"] = 2] = "WATER";
    Type[Type["ELECTRIC"] = 3] = "ELECTRIC";
    Type[Type["GRASS"] = 4] = "GRASS";
    Type[Type["ICE"] = 5] = "ICE";
    Type[Type["FIGHTING"] = 6] = "FIGHTING";
    Type[Type["POISON"] = 7] = "POISON";
    Type[Type["GROUND"] = 8] = "GROUND";
    Type[Type["FLYING"] = 9] = "FLYING";
    Type[Type["PSYCHIC"] = 10] = "PSYCHIC";
    Type[Type["BUG"] = 11] = "BUG";
    Type[Type["ROCK"] = 12] = "ROCK";
    Type[Type["GHOST"] = 13] = "GHOST";
    Type[Type["DRAGON"] = 14] = "DRAGON";
    Type[Type["DARK"] = 15] = "DARK";
    Type[Type["STEEL"] = 16] = "STEEL";
    Type[Type["FAIRY"] = 17] = "FAIRY";
})(Type || (exports.Type = Type = {}));
var Category;
(function (Category) {
    Category[Category["PHYSICAL"] = 0] = "PHYSICAL";
    Category[Category["SPECIAL"] = 1] = "SPECIAL";
    Category[Category["STATUS"] = 2] = "STATUS";
})(Category || (exports.Category = Category = {}));
var Stat;
(function (Stat) {
    Stat[Stat["ATTACK"] = 0] = "ATTACK";
    Stat[Stat["DEFENSE"] = 1] = "DEFENSE";
    Stat[Stat["SP_ATTACK"] = 2] = "SP_ATTACK";
    Stat[Stat["SP_DEFENSE"] = 3] = "SP_DEFENSE";
    Stat[Stat["SPEED"] = 4] = "SPEED";
})(Stat || (exports.Stat = Stat = {}));
