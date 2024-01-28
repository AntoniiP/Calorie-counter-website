const bcrypt = require('bcrypt')

/**
 * Generates a salt using bcrypt.
 * @param {Number} saltRounds The cost factor for generating the salt.
 * @returns {Promise<String>} The generated salt.
 */
async function generateSalt(saltRounds = 10) {
	try {
		return await bcrypt.genSalt(saltRounds)
	} catch (error) {
		console.log(error)
	}
}

/**
 * Hashes a password using a given salt.
 * @param {String} password The password to hash.
 * @param {String} salt The salt to use for hashing.
 * @returns {Promise<String>} The hashed password.
 */
async function hashPassword(password, salt) {
	try {
		return await bcrypt.hash(password, salt)
	} catch (error) {
		console.log(error)
	}
}

module.exports = {generateSalt, hashPassword}
