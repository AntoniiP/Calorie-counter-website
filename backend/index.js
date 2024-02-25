require('dotenv').config()

const express = require('express'),
	mongoose = require('mongoose'),
	bodyparser = require('body-parser'),
	bcrypt = require('bcrypt'),
	app = express(),
	PORT = 8706,
	db = require('./models/user'),
	{ hashPassword, generateToken } = require('./functions'),
	cors = require('cors'),
	fs = require('fs'),
	jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
	const authHeader = req.headers[ 'authorization' ],
		token = authHeader && authHeader.split(' ')[ 1 ]
	
	if (!token) return res.status(401).send({ error: "Invalid Credentials" })
	jwt.verify(token, process.env.ACCESS_TOKEN, async (err, decoded) => {
		if (err) return res.status(403).send({ error: 'Token invalid or expired.' })
		try {
			const user = await db.findOne({ _id: decoded._id })
			if (!user) return res.status(404).send({ error: 'User not found' })
			req.user = user;
			next()
		} catch (err) {
			return res.status(500).send({ error: 'Failed to authenticate user.' })
		}
	})
	
}

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

	const user = await db.create({
		username,
		password: hash,
		totalCalories,
		totalProtein,
		currentCalories: 0,
		currentProtein: 0
	})
	const token = generateToken(user._id)
	return res.status(200).send({totalCalories, totalProtein, token})
})

app.post('/login', async (req, res) => {
	const {username, password} = req.body
	if (!username || !password) return res.status(400).send({error: 'Username and password are required.'})

	try {
		const user = await db.findOne({username})
		if (!user) return res.status(404).send({error: 'No user found.'})

		const isMatch = await bcrypt.compare(password, user.password)

		if (!isMatch) return res.status(401).send({error: 'Invalid credentials.'})

		const { totalCalories, totalProtein, currentCalories, currentProtein, mealLog, meals, food } = user
		const token = generateToken(user._id)
		
		return res.send({totalCalories, totalProtein, currentCalories, currentProtein, mealLog, meals, food, token})
	} catch (er) {
		console.error(er)
		return res.status(500).send({error: 'An error occurred while processing your request.'})
	}
})

app.post('/update', isAuthenticated, async (req, res) => {
	const { currentCalories, currentProtein } = req.body
	if (!currentCalories || !currentProtein) return res.status(400).send({ error: 'Invalid form' })
	try {
		const user = req.user
		user.currentCalories = currentCalories
		user.currentProtein = currentProtein
		await user.save()
		res.status(200)
	} catch (err) {
		res.status(500).send({ error: 'Failed to update'})
	}
})

app.get('/brands/:brand', (req, res) => {
	console.log(req.params)
	const files = fs.readdirSync('./brandsData')
	
	const names = files.map((a) => a.split('.')[0])
	const json = files.map(x => require('./brandsData/' + x))
	const icons = json.map(x => x.icon)
	if (req.params?.brand) {
		if (!names.includes(req.params.brand)) {
			const brandIconsArray = names.map((brand, index) => {
				return {Name: brand, icon: icons[index]}
			})
			// Returns an array in the form of
			// 	[ {Name: "", icon: ""}, ... ]

			res.send(brandIconsArray)
		}

		return res.send(json.find(x => x.name == req.params.brand))
	}
})

app.get('/meallog', (req, res) => {})

app.get('/meals', (req, res) => {})

app.get('/food', (req, res) => {})

app.listen(PORT, () => console.log('Server started on http://localhost:8706'))
