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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const database_1 = require("../database");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield database_1.prisma.user.findMany();
        console.log(allUsers);
        res.json(allUsers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrio un error al obtener los usuarios' });
    }
}));
exports.userRouter.get('/auth', (req, res) => {
    res.send('Este es un mensaje para ver si funciona');
});
