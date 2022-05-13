import express from "express";
import { createUser, loginUser, getUserProfile } from "../controllers/userController.js";
import Auth from "../middleware/auth.js";

const router = express.Router()

router.post('/', createUser)
router.post('/login', loginUser)
router.get('/profile', Auth, getUserProfile)

export default router