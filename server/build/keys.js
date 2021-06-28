"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    database: {
        user: 'proyecto',
        password: 'admin',
        connectString: '(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)' +
            '(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))' +
            '(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))'
    }
};
