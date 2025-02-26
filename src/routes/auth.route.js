import express from "express";
import { logout, signup } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";
import { changePassword } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup",   
	signup
	
);
router.post("/login",
	login
);
router.post("/changePassword",
changePassword
);
router.post("/logout",
	logout

);

export default router;