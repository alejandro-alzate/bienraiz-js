//commonjs
//const express = require("express");
import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import propiedadRoutes from "./routes/propiedadRoutes.js";
import db from "./config/db.js";
import cookieParser from "cookie-parser";
import csrf from "csurf";
//Crear app
const app = express();

//Habilitar lectura del formulario
app.use(express.urlencoded({extended: true}))

//Habilitar Cookie parser
app.use(cookieParser())
//Habilitar CSurf
app.use(csrf({cookie: true}))

//Conexion DB
try {
	//await db.authenticate();
	console.log("Conexion realizada a la base de datos.");
	db.sync(); //Crear tablas que no existan
} catch (error) {
	console.log(error)
	
}

//Habilitar pug
app.set("view engine", "pug")
app.set("views", "./views")

//Carpeta publica
app.use(express.static("public"))

//Rutas
app.use("/auth", usuarioRoutes)
app.use("/", propiedadRoutes)

//Puerto del proyecto
const port = process.env.BE_PORT || 3000;
app.listen(port, () => {
	console.log("El servidor esta activo: " + port)
})
