"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./router/user.routes");
const app = (0, express_1.default)();
app.use('/api/auth', user_routes_1.userRouter);
app.listen(process.env.PORT, () => console.log('Server running in port ' + process.env.PORT));
