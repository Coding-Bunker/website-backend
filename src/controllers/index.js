import { getRepository } from "typeorm"

import { User } from "../entity/user"
import DbService from "../services/DbService"


export default {
	newsletters: async (req, res) => {
		const {
			email,
			name,
			surname
		} = req.body;

		if (!email)
			return res.status(400).json({
				ok: false,
				message: "email missing"
			});

		if (!name)
			return res.status(400).json({
				ok: false,
				message: "name missing"
			});

		if (!surname)
			return res.status(400).json({
				ok: false,
				message: "surname missing"
			});
		
		const UserRepo = DbService.getConnection().getRepository(User);
		
		try {
			const checkEmailExistance = await UserRepo.find({
				select: ["email"],
				where: {
					email: email
				}
			});

			if (checkEmailExistance.length)
				return res.status(400).json({
					ok: false,
					message: "email already exists"
				});
		} catch (e) {
			console.error("[ERROR]", e.message);
			return;
		}

		try {
			await UserRepo.save({
				email,
				name,
				surname
			});
		} catch (e) {
			console.error("[ERROR]", e.message);
			return;
		}

		res.status(201).json({
			ok: true,
			message: "user created"
		});

		/*
		const queryCheck = 'SELECT email FROM accounts WHERE email = \'' + req.body.email + '\'';
		const queryInsert = 'INSERT INTO accounts (Nome, Cognome, Email) VALUES (\'' + req.body.name + '\',\'' + req.body.surname + '\',\'' + req.body.email + '\')';
		
		console.log(queryInsert);
		
		connection.query(queryCheck, function(err, rows, fields)
		{
		console.log(rows);
		if (err) throw err;
		if (rows.length) res.status(400).send("Email gi� utilizzata!!!");
		else
		{
		console.log(queryInsert);
		
		connection.query(queryInsert, function(err, rows, fields)
		{
		if(err) throw err;
		else res.status(200).send("Contatto inserito correttamente!");
		});
		}
		});
	    */
	}
}