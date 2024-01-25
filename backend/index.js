const express = require('express'),
	mongoose = require('mongoose'),
	app = express(),
	PORT = 8706

mongoose.connect('mongodb://127.0.0.1:27017/calcounter').then(() => console.log('Connected to DB.'), console.log('Error connecting to DB.'))

app.get('/register', (req, res) => {})

app.get('/login', (req, res) => {})

app.get('/meallog', (req, res) => {})

app.get('/meals', (req, res) => {})

app.get('/food', (req, res) => {})

app.listen(PORT, () => console.log('Server started on http://localhost:8706'))
