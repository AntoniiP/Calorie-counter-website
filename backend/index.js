require('dotenv').config()

const express = require('express'),
	mongoose = require('mongoose'),
	bodyparser = require('body-parser'),
	bcrypt = require('bcrypt'),
	app = express(),
	PORT = 8706,
	db = require('./models/user'),
	{hashPassword} = require('./functions'),
	cors = require('cors'),
	fs = require('fs')

app.use(bodyparser.json(), bodyparser.urlencoded({extended: true}), cors())

mongoose.connect(process.env.db).then(
	() => console.log('Connected to DB.'),
	(er) => console.log('Error connecting to DB.', er)
)

app.post('/register', async (req, res) => {
	const {username, totalCalories, totalProtein, password} = req.body
	if (!username || !totalCalories || !totalProtein || !password) return res.status(400).send({error: 'All fields are required.'})
	if (username.length < 5 || username.length > 20) return res.status(400).send({error: 'Username must be between 5 and 20 characters.'})
	if (password.length < 5) return res.status(400).send({error: 'Password must be between minimum 5 characters.'})
	if (await db.findOne({username})) return res.status(409).send({error: 'Account already exists.'}) // "The request could not be completed due to a conflict with the current state of the resource. This code is only allowed in situations where it is expected that the user might be able to resolve the conflict and resubmit the request. " - Stackoverflow 3825990

	const hash = await hashPassword(password)

	await db.create({
		username,
		password: hash,
		totalCalories,
		totalProtein,
		currentCalories: 0,
		currentProtein: 0
	})

	return res.status(200).send({totalCalories, totalProtein})
})

app.post('/login', async (req, res) => {
	const {username, password} = req.body
	if (!username || !password) return res.status(400).send({error: 'Username and password are required.'})

	try {
		const user = await db.findOne({username})
		if (!user) return res.status(404).send({error: 'No user found.'})

		const isMatch = await bcrypt.compare(password, user.password)

		if (!isMatch) return res.status(401).send({error: 'Invalid credentials.'})

		const {totalCalories, totalProtein, currentCalories, currentProtein, mealLog, meals, food} = user
		return res.send({totalCalories, totalProtein, currentCalories, currentProtein, mealLog, meals, food})
	} catch (er) {
		console.error(er)
		return res.status(500).send({error: 'An error occurred while processing your request.'})
	}
})

app.get('/brands', (req, res) => {
	const files = fs.readdirSync('./brandsData')
	
	const names = files.map((a) => a.split('.')[0])
	const icons  = files.map(x => require('./brandsData/' + x)).map(x => x.icon)
	
	const brandIconsObject = names.reduce((obj, brand, index) => {
		obj[brand] = {icon: icons[index]}
		return obj
	}, {}) 
	// Returns an object in the form of
	// 	{
	//		"Name": {
	// 			icon: "iconURL"
	// 		}
	// 	}

	res.send(brandIconsObject)
})

app.get('/meallog', (req, res) => {})

app.get('/meals', (req, res) => {})

app.get('/food', (req, res) => {})

app.listen(PORT, () => console.log('Server started on http://localhost:8706'))
