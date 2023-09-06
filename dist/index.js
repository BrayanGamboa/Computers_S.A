"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = __importDefault(require("@hapi/hapi"));
const init = async () => {
    const server = hapi_1.default.server({
        port: 3000,
        host: 'localhost'
    });
    await server.start();
    console.log(`Servidor activo en la dirección: ${server.info.uri}`);
};
init();
