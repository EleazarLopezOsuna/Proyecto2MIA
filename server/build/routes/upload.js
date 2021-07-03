"use strict";
var express = require('express');
var _router = express.Router();
var multer = require('multer');
var store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/public/profile');
    },
    filename: function (req, file, cb) {
        cb(null, file.filename);
    }
});
var upload = multer({ storage: store }).single('file');
_router.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        var _a, _b;
        if (err) {
            return res.status(501).json({ error: err });
        }
        return res.json({ originalName: (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname, uploadName: (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename });
    });
});
module.exports = _router;
