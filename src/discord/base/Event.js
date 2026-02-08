// ./src/discord/base/Event.js
import { Collection } from "discord.js";

export class Event {
    static all = new Collection();

    constructor(data) {
        // data: { name, once, run }
        this.data = data;
        Event.all.set(data.name, data);
    }
}