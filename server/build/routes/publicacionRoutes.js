"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publicacionController_1 = require("../controllers/publicacionController");
class LoginRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/all', publicacionController_1.publicacionController.obtenerPublicaciones);
        this.router.post('/newPublicacion', publicacionController_1.publicacionController.newPublicacion);
    }
}
const usuariosRoutes = new LoginRoutes();
exports.default = usuariosRoutes.router;
