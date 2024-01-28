const bcrypt = require('bcrypt')

/**
 * Hashes a password using bcrypt.
 * @param {String} password The password to hash.
 * @param {Number} saltRounds The cost factor for hashing.
 * @returns {Promise<String>} The hashed password.
 */
async function hashPassword(password, saltRounds = 10) {
	try {
		return await bcrypt.hash(password, saltRounds)
	} catch (error) {
		console.error(error)
		throw error // It's better to throw the error to be handled by the caller
	}
}

module.exports = {hashPassword}
