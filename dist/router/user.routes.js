"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const requireToken_1 = require("../middleware/requireToken");
const requireRefreshToken_1 = require("../middleware/requireRefreshToken");
const authController_1 = require("../controllers/authController");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/sign-in', authController_1.SignIn);
exports.userRouter.post('/sign-up', authController_1.SignUp);
exports.userRouter.get('/profile', requireToken_1.requireToken, authController_1.UserProfile);
exports.userRouter.get('/refresh', requireRefreshToken_1.requireRefreshToken, authController_1.RefreshToken);
