import express from 'express';
import { body } from 'express-validator';
import { admin, crear, guardar, agregaImagen, almacenarImagen } from '../controller/propiedadController.js';
import protegerRuta from '../middleware/protegerRuta.js';
import upload from '../middleware/subirImagen.js';

const router = express.Router();

router.get('/mispropiedades', protegerRuta, admin);
router.get('/propiedades/crear', protegerRuta, crear);

router.post('/propiedades/crear', 
	protegerRuta, 
	body('titulo').notEmpty().withMessage('El Titulo del Anuncio es Obligatorio'),
	body('descripcion')
		.notEmpty().withMessage('La Descripción no puede ir vacia')
		.isLength({ max: 200 }).withMessage('La Descripción es muy larga'),
	body('categoria').isNumeric().withMessage('Selecciona una categoría'),
	body('precio').isNumeric().withMessage('Selecciona un rango de Precios'),
	body('habitaciones').isNumeric().withMessage('Selecciona la Cantidad de Habitaciones'),
	body('estacionamiento').isNumeric().withMessage('Selecciona la Cantidad de Estacionamientos'),
	body('wc').isNumeric().withMessage('Selecciona la Cantidad de Baños'),
	body('lat').notEmpty().withMessage('Ubica la Propiedad en el Mapa'),
	guardar
);

router.get('/propiedades/agregarImagen/:id', 
protegerRuta,
agregaImagen
);

router.post('/propiedades/agregarImagen/:id',
	protegerRuta,
	upload.single('imagen'),
	almacenarImagen
)


export default router