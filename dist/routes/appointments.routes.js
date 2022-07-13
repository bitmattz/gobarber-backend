"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var uuid_1 = require("uuid");
var appointmentsRouter = express_1.Router();
var appointments = [];
appointmentsRouter.post('/', function (request, response) {
    var _a = request.body, provider = _a.provider, date = _a.date;
    var appointment = {
        id: uuid_1.v4(),
        provider: provider,
        date: date,
    };
    appointments.push(appointment);
    return response.json(appointment);
});
exports.default = appointmentsRouter;
