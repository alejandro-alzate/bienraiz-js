import express from "express";
import {
	formularioLogin,
	autenticar,
	formularioRegistro,
	olvidePassword,
	registrar,
	confirmar,
	resetPassword,
	comprobarToken,
	nuevoPassword
} from "../controller/usuarioController.js";

//Routes
const router = express.Router()

// //Rutas o end-points
router.get("/login", formularioLogin);
router.post("/login", autenticar);

router.get("/signup", formularioRegistro);
router.post("/signup", registrar);

router.get("/confirm/:token", confirmar);

router.get("/recover", olvidePassword);
router.post("/recover", resetPassword);

router.get("/recover/:token", comprobarToken);
router.post("/recover/:token", nuevoPassword);


export default router;


// router.get("/login", formularioLogin);
// router.post("/login", autenticar);

// router.get("/register", formularioRegistro);

// router.get("/recover", formularioRecuperar);

// router.get("/recover/:token", comprobarToken);

// router.get("/confirm/:token", confirmar);

// router.post("/register", registrar);

// router.post("/recover/", olvidePassword);

// router.post("/recover/:token", olvidePassword);

// export default router;