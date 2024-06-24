import express from "express"

//
const router = express.Router()

router.get("/", (req, res) => {
	res.json({msg: "Hola mundo cruel"})
})

router.post("/", (req, res) => {
	res.json({msg: "post /"})
})

router.get("/nosotros", (req, res) => {
	res.json({msg: "nosotros"})
})

export default router
