import User from '../model/User';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Valoracion from '../model/Valoracion';



const register = async (req: Request, res: Response) => {
	const name = req.body.name;
	const username = req.body.username;
	const birthdate = req.body.birthdate;
	const email = req.body.email;
	
	let password = req.body.password;
	password = CryptoJS.AES.encrypt(password, 'groupEA2022').toString();
	const newUser = new User({ name, username, email, password, birthdate });
	await newUser.save( (err: any) => {
		if (err) {
			return res.status(500).send(err);
		}
	});
	// const token = jwt.sign({ id: newUser._id }, 'yyt#KInN7Q9X3m&$ydtbZ7Z4fJiEtA6uHIFzvc@347SGHAjV4E', {
	// 	expiresIn: 60 * 60 * 24
	// });
	//  res.status(200).json({ auth: true, token });
	res.status(201).json({ auth: true});
};

const login = async (req: Request, res : Response) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(404).send('The email does not exist');
		}
		const validPassword = CryptoJS.AES.decrypt(user.password.toString(), 'groupEA2022').toString(CryptoJS.enc.Utf8);

		// const validPassword = CryptoJS.AES.decrypt(user.password, 'groupEA2022').toString(CryptoJS.enc.Utf8);
		if (validPassword !== req.body.password) {
			return res.status(402).json({ auth: false, token: null});
		}

		// const token = jwt.sign({ id: user._id }, 'yyt#KInN7Q9X3m&$ydtbZ7Z4fJiEtA6uHIFzvc@347SGHAjV4E', {
		// 	expiresIn: 60 * 60 * 24
		// });
		// res.status(201).json({ auth: true, token});
		res.status(201).json({ auth: true});

	}
	catch (error) {
		res.status(401).send('User not found');
	}
};

const profile = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id, { password: 0 });
	if (!user) {
		return res.status(404).send('No user found.');
	}
	res.status(200).json(user);
};

const getall = async (req: Request, res: Response) => {
	const users = await User.find();
	res.status(200).json(users);
};

const getone = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);
	res.json(user);
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		await User.findByIdAndRemove(req.params.id);
		res.status(200).json({ status: 'User deleted' });
	}
	catch (error) {
		res.status(500).json({message: 'error unknown', error });
	}
};

const getValoracion = async (req: Request, res: Response) => {
	const valoracion = await Valoracion.findById(req.params.id);
	res.json(valoracion);
};

 export async function valorar (req:Request, res: Response): Promise<Response> {
try {
		
		
		const puntos = req.body.puntos;
		const comment = req.body.comment;

		console.log(puntos + " prueba 1" + comment + " prueba 1")

		// const puntos = req.body.puntos;
		// const comment = req.body.comment;
		
		const newValoracion = new Valoracion({puntos, comment})

		console.log(newValoracion + "prueba 2");

		const valoracionSaved = await newValoracion.save()
	//   const user = await User.findByIdAndUpdate(req.params._id, {
	// 		newValoracion}, {new: true});
		
	const user = await User.findOneAndUpdate({_id: req.body._id},{$push: {valoraciones: valoracionSaved}})
	
		return res.status(200).json(user.valoraciones)
	
}
catch(error) {
	return res.status(400).json(error)
}

}
	

const update = async (req: Request, res: Response) => {
	try{
		const name = req.body.name;
		const username = req.body.username;
		const birthdate = req.body.birthdate;
		const email = req.body.email;
		const user = await User.findByIdAndUpdate(req.body._id, {
			name, username, birthdate, email
		}, {new: true});
		res.json(user).status(200);
	}catch (error) {
		res.status(401).send(error);
	}
};



export default {
	register,
	login,
	profile,
	getall,
	getone,
	deleteUser,
	update,
	valorar,

};