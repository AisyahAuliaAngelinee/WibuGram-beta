const { verifyPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class Controller {
	static async register(req, res) {
		try {
			// res.send("Masuk Login");
			// console.log(req.body);

			const newUser = {
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
			};

			const createUser = await User.create(newUser);
			// console.log(createUser, "<<< New User");

			res.status(201).json({ message: "CREATE USER SUCCESSFULL", createUser });
		} catch (error) {
			console.log(error);
		}
	}

	static async login(req, res) {
		try {
			// res.send("Masuk Controller");
			// console.log(req.body);

			const { email, password } = req.body;
			const findUser = await User.findOne({
				where: {
					email,
				},
			});
			// console.log(findUser.username, "<<< User");

			// ?handler if user not found
			if (!findUser) {
				throw new Error("USER NOT FOUND");
			}

			// ?verified the password
			const verifiedPassword = verifyPassword(password, findUser.password);

			// ?handler if password not verified
			if (!verifiedPassword) {
				throw new Error("INVALID EMAIL/PASSWORD");
			}

			// ?create token
			const payload = {
				id: findUser.id,
				username: findUser.username,
				email,
			};
			const token = signToken(payload);
			res.status(200).json({ message: "WE FOUND YOUR USER", access_token: token });
		} catch (error) {
			console.log(error);
		}
	}

	static async updateUser(req, res) {
		try {
			// res.send("Masuk Controller");
			// console.log(id);

			const { id } = req.params;

			const findUserById = await User.findByPk(id);
			// console.log(findUserById, "<<< User by id");

			// ?handle if user not found
			if (!findUserById) {
				throw new Error("USER NOT FOUND");
			}

			// ?update the user
			const { username, email } = req.body;
			await User.update(
				{
					username,
					email,
				},
				{
					where: {
						id,
					},
				}
			);

			res.status(200).json({ message: "USER SUCCESS UPDATED" });
		} catch (error) {
			console.log(error);
		}
	}

	static async deleteUser(req, res) {
		try {
			// res.send("Masuk Controller");
			// console.log(req.params);

			const { id } = req.params;

			// ?find user by id
			const findUserById = await User.findByPk(id);
			// console.log(findUser, "<<< User");

			// ?handle if user not found
			if (!findUserById) {
				throw new Error("USER NOT FOUND");
			}

			await User.destroy({ where: { id } });

			res.status(200).json({ message: "USER SUCCESS DELETED" });
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Controller;
