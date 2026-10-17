import express from 'express'
import { getMe, loginUser, signOut, singUp } from '../controller/authController.js'
import { verifyAccessToken } from '../middleware/verifyAccessTokenMiddleware.js'
import { refreshTokenAccess } from '../controller/refreshTokenController.js'

export const router = express.Router()

router.post("/register", singUp)

router.post("/login", loginUser)

router.post("/refresh", refreshTokenAccess)

router.post("/logout", signOut)

router.get("/me", verifyAccessToken, getMe)
