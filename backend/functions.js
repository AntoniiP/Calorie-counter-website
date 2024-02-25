const bcrypt = require('bcrypt'),
	jwt = require('jsonwebtoken')

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
/**
 * Generates a unique token based on a MongoDB _id 
 * @param {string} _id 
 * @returns User web token
 */
function generateToken(_id) {
	return jwt.sign({_id}, process.env.ACCESS_TOKEN) // No expiresIn field so user can be kept logged in
}

module.exports = {hashPassword, generateToken}
