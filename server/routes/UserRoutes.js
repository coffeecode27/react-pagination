// File routes ini akan menghandle routing yg bersangkutan dengan user
// lalu kita juga akan menggunakan express untuk menghandle routing
import Express from "express";
import { getUser } from "../controllers/UserController.js"; // get user adalah function dari controller yg akan dijalankan ketika ada req ke endpoint /users

const router = Express.Router();

// endpoint get user
router.get("/users", getUser);

export default router;
