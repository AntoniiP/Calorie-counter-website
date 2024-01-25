const mongoose = require('mongoose')
const user = new mongoose.Schema({
    username: String,
    password: String,
    totalCalories: Number,
    totalProtein: Number,
    currentCalories: Number,
    currentProtein: Number,
    mealLog: [ {
        name: String,
        icon: String,
        data: {
            calories: Number,
            protein: Number
        }
    }],
    meals: [
        {
            name: String,
            icon: String,
            data: {
                calories: Number,
                protein: Number
            },
            food: Array
        }
    ],
    food: [
        {
            name: String,
            icon: String,
            data: {
                calories: Number,
                protein: Number
            }
        }
    ]
})
module.exports = mongoose.model('user', user)