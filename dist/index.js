"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_routes_1 = require("./router/user.routes");
const errorHandler_1 = require("./middleware/errorHandler");
const notes_routes_1 = require("./router/notes.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/auth', user_routes_1.userRouter);
app.use('/api/notes', notes_routes_1.notesRouter);
app.use(errorHandler_1.errorHandler);
app.listen(process.env.PORT, () => console.log('Server running in port ' + process.env.PORT));
