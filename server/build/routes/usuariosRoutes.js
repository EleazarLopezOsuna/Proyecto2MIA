"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class LoginRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/all', usuariosController_1.usuariosController.obtenerUsuarios);
        this.router.post('/newRelacion', usuariosController_1.usuariosController.newRelacion);
    }
}
const usuariosRoutes = new LoginRoutes();
exports.default = usuariosRoutes.router;
