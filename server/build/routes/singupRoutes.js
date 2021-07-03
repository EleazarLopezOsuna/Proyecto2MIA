"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const singupController_1 = require("../controllers/singupController");
class SingUpRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', singupController_1.singupController.singUp);
    }
}
const singUpRoutes = new SingUpRoutes();
exports.default = singUpRoutes.router;
