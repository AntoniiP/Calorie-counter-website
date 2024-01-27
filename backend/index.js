require('dotenv').config()

const express = require('express'),
	mongoose = require('mongoose'),
	app = express(),
    PORT = 8706,
    db = require('./models/user'),
    { HashPassword } = require('./functions')

mongoose.connect(process.env.db).then(() => console.log('Connected to DB.'), console.log('Error connecting to DB.'))

app.get('/register', async (req, res) => {
	const {username, calorieCount, proteinCount, password} = req.body
	if (!username || !calorieCount || !proteinCount || !password) return res.status(400)
	if (await db.findOne({username})) return res.send(409) // "The request could not be completed due to a conflict with the current state of the resource. This code is only allowed in situations where it is expected that the user might be able to resolve the conflict and resubmit the request. " - Stackoverflow 3825990

    await db.create({
		username, // Character limit needed in the future
		password: HashPassword(password),
		totalCalories: calorieCount,
		totalProtein: proteinCount,
		currentCalories: 0,
		currentProtein: 0
	})

})

app.get('/login', (req, res) => {})

app.get('/meallog', (req, res) => {})

app.get('/meals', (req, res) => {})

app.get('/food', (req, res) => {})

app.listen(PORT, () => console.log('Server started on http://localhost:8706'))
