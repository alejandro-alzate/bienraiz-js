import nodemailer from "nodemailer";

const emailRegistro = async(datos) => {
	const transport = nodemailer.createTransport({
		host: process.env.EM_HOST,
		port: process.env.EM_PORT,
		auth: {
			user: process.env.EM_USER,
			pass: process.env.EM_PASS
		}
	});
	const { nombre, email, token } = datos;
	await transport.sendMail({
		from: "atencionalcliente@bienraiz.com",
		to: email,
		subject: `Bienvenido A ${process.env.UI_LINK}`,
		text: "Confirme su correo a finca raiz",
		html: `
			<p>Hola ${nombre}, Confirme su cuenta </p>
			<p>Tu cuenta ya está disponible oprima el enlace</p>
			<a href="${process.env.BE_HOST}:${process.env.BE_PORT ?? 3000}/auth/confirm/${token}">Aqui</a>
		`
	})
	//console.log(datos)
}

const emailOlvidePassword = async (datos) => {
	const transport = nodemailer.createTransport({
		host: process.env.EM_HOST,
		port: process.env.EM_PORT,
		auth: {
			user: process.env.EM_USER,
			pass: process.env.EM_PASS
		}
	});

	await transport.sendMail(
		{
			from: "BienesRaices.com",
			to: email,
			subject: `Restablece tu Password en ${process.env.UI_LINK}`,
			text: `Restablece tu contraseña en ${process.env.UI_LINK}`,
			html: `
				<p>Hola ${nombre}, has solicitado reestablecer tu contraseña en BienesRaices.com</p>

				<p>Sigue el siguiente enlace para reestablecer tu contraseña y usar una nueva:
				<a href="${process.env.BE_HOST}:${process.env.BE_PORT ?? 3000}/auth/recover/${token}">Reestablecer contraseña</a></p>

				<p>Si tu no solicitaste el cambio de contraseña, puedes ignorar y eliminar este mensaje</p>
			`
		}
	)
}

export {
	emailRegistro,
	emailOlvidePassword
}