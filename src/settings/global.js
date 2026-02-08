import { join } from "node:path";

Object.assign(globalThis, Object.freeze({
    __rootname: process.cwd(),
    rootTo(...path) {
        return join(process.cwd(), ...path);
    }
}));