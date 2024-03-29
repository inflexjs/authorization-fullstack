import Router from 'express'
import userController from '../controllers/user.controller.js'
import authMiddleware from "../middlewares/auth.middleware.js";
import {body} from "express-validator";
import activatedMiddleware from "../middlewares/activated.middleware.js";

const router = new Router()

router.post('/registration',
	body('email').isEmail(),
	body('password').isLength({min: 6, max: 32}),
	userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users',
	[authMiddleware, activatedMiddleware],
	userController.getUsers)
router.get('/hello', userController.hello)

export default router