"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oracledb_1 = __importDefault(require("oracledb"));
const keys_1 = __importDefault(require("./keys"));
const pool = oracledb_1.default.getConnection(keys_1.default.database);
exports.default = pool;
