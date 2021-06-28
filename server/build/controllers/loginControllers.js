"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
const database_1 = __importDefault(require("../database"));
class LoginControllers {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT conexion.first_user_id AS codigo, usuario.fullname AS nombre FROM proyecto.usuario" +
                " JOIN proyecto.conexion ON (conexion.first_user_id = usuario.user_id) WHERE conexion.second_user_id = " +
                "(SELECT usuario.user_id FROM proyecto.usuario WHERE usuario.username = 'usuario1') UNION SELECT " +
                "conexion.second_user_id AS codigo, usuario.fullname AS nombre FROM proyecto.usuario JOIN proyecto.conexion" +
                " ON (conexion.second_user_id = usuario.user_id) WHERE conexion.first_user_id = " +
                "(SELECT usuario.user_id FROM proyecto.usuario WHERE usuario.username = 'usuario1')";
            const pendingResult = (yield database_1.default).execute(query, [], { outFormat: oracledb_1.default.OUT_FORMAT_OBJECT });
            const result = (yield pendingResult);
            res.send(result.rows);
            console.log(result.rows);
        });
    }
    verificarLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT login('" + req.body['usuario'] + "','" + req.body['password'] + "') AS resultado FROM DUAL";
            const pendingResult = (yield database_1.default).execute(query, [], {
                outFormat: oracledb_1.default.OUT_FORMAT_OBJECT
            });
            const result = (yield pendingResult).rows;
            res.send(result[0]);
        });
    }
}
exports.loginController = new LoginControllers();
