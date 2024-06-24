import { validationResult } from 'express-validator'
//import Precio from '../models/Precio.js';
//import Categoria from '../models/Categoria.js';
import {Precio, Categoria, Propiedad} from '../models/index.js'


const admin = async (req, res) => {
	
	const {id} = req.usuario;

	const propiedades = await Propiedad.findAll({
		where: {
			usuarioId : id
		},
		include: [
			{ model: Categoria, as: 'categoria' },
			{ model: Precio, as: 'precio' }
		]
	})
	res.render('propiedades/admin', {
		pagina: 'Mis propiedades',
		propiedades
	})
}

//Formulario para crear una propiedad

const crear = async (req, res) =>{

	const [categorias, precios] = await Promise.all([ //se crea un arreglo, el promise.all ejecuta la consulta en simultaneo.
		Categoria.findAll(),  //retorna los valores al arreglo
		Precio.findAll()
	])

	res.render('propiedades/crear', {
		pagina: 'Crear Propiedad',
		csrfToken: req.csrfToken(),
		categorias,
		precios,
		datos: {}  //se crea un objeto para que no nos marque error sin definir datos
	})
}

const guardar = async (req, res) => {
	
	// Validación
	let resultado = validationResult(req)

	if(!resultado.isEmpty()) {

		// Consultar Modelo de Precio y Categorias
		const [categorias, precios] = await Promise.all([
			Categoria.findAll(),
			Precio.findAll()
		])

		return res.render('propiedades/crear', {
			pagina: 'Crear Propiedad',
			csrfToken: req.csrfToken(),
			categorias,
			precios, 
			errores: resultado.array(),
			datos: req.body
		})
	}
   // console.log(req.body);
   
   // Crear un Registro, se extraen los datos del request.body, se renombre el precioid por precio.

	const { titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, precio: precioId, categoria: categoriaId } = req.body

	const { id: usuarioId } = req.usuario
  
	try {
		const propiedadGuardada = await Propiedad.create({
			titulo,
			descripcion,
			habitaciones, 
			estacionamiento, 
			wc,
			calle,
			lat,
			lng,
			precioId,
			categoriaId,
			usuarioId,
			imagen: ''
		})

		const {id} = propiedadGuardada

		res.redirect(`/propiedades/agregarImagen/${id}`)

	} catch (error) {
		console.log(error)
	}
}

const agregaImagen = async (req, res) =>{
	const {id} = req.params  //se extrae el id del modelo propiedades

	// Validar que la propiedad exista
	const propiedad = await Propiedad.findByPk(id)
	if(!propiedad) {
		return res.redirect('/mispropiedades')
	}

	// Validar que la propiedad no este publicada
	if(propiedad.publicado) {
		return res.redirect('/mispropiedades')
	}

	// Validar que la propiedad pertenece a quien visita esta página
	if( req.usuario.id.toString() !== propiedad.usuarioId.toString() ) {
		return res.redirect('/mispropiedades')
	}
	
	res.render('propiedades/agregarImagen', {
		pagina: `Agregar Imagen: ${propiedad.titulo}`,
		csrfToken: req.csrfToken(),
		propiedad
	})
}

const almacenarImagen = async (req, res, next) => {

	const {id} = req.params

	// Validar que la propiedad exista
	const propiedad = await Propiedad.findByPk(id)
	if(!propiedad) {
		return res.redirect('/mispropiedades')
	}

	// Validar que la propiedad no este publicada
	if(propiedad.publicado) {
		return res.redirect('/mispropiedades')
	}

	// Validar que la propiedad pertenece a quien visita esta página
	if( req.usuario.id.toString() !== propiedad.usuarioId.toString() ) {
		return res.redirect('/mispropiedades')
	}

	try {
		// console.log(req.file)

		// Almacenar la imagen y publicar propiedad
		propiedad.imagen = req.file.filename
		propiedad.publicado = 1

		await propiedad.save()

		next()

	} catch (error) {
		console.log(error)
	}
}


export {
	admin,
	crear,
	guardar,
	agregaImagen,
	almacenarImagen
}