import fg from "fast-glob";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Command, Event } from "#base";
import ck from "chalk";

export async function loadModules() {
    const files = await fg("./src/discord/{commands,events,responders}/**/*.js");
    
    for (const file of files) {
        try {
            const absolutePath = path.resolve(file);
            const fileURL = pathToFileURL(absolutePath).href;
            await import(fileURL);
        } catch (err) {
            console.error(ck.red(`❌ Erro ao carregar módulo ${file}:`), err);
        }
    }
}

export function registerEvents(client) {
    for (const event of Event.all.values()) {
        const execute = (...args) => event.run(...args, client);
        if (event.once) client.once(event.name, execute);
        else client.on(event.name, execute);
    }
}