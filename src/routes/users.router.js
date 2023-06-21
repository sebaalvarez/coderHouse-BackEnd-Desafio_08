import { Router } from "express";
import { authToken } from "../utils.js";
import { ingreso } from "../controllers/users.controller.js";

const router = Router();

router.get("/:userId", authToken, ingreso);

export default router;
