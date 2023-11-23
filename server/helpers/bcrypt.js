const bcrypt = require("bcrypt");

const hashPassword = (pass) => {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(pass, salt);
};

const verifyPassword = (pass, hash) => {
	return bcrypt.compareSync(pass, hash);
};

module.exports = { hashPassword, verifyPassword };
