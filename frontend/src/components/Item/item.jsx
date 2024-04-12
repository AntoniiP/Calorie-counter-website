import './item.css'
import AppContext from '../../context/AppContext'
import {useState, useContext} from 'react'

export default function Item({name, calories, protein, image}) {
    const {updateCount} = useContext(AppContext)

    async function addCount(cal, protein) {
		const current = JSON.parse(localStorage.getItem('current'))
		current[0] += Number(cal)
		current[1] += Number(protein)
		
        localStorage.setItem('current', JSON.stringify(current))
		updateCount(current)
		await postData('http://localhost:8706/update', {currentCalories: current[0], currentProtein: current[1]}, {authorization: 'Bearer ' + localStorage.getItem('userToken')})
    }
    
	return (
		<div className="item">
            {/* {item.category}: {item.name} - Calories: {item.calories}, Protein: {item.protein}g */ }
            <div className="image-container">

            </div>
            <div className="text-content">
                <h4>{ name }</h4>
                <h5>Calories: { calories } cal</h5>
                <h5>Protein: { protein } g</h5>
            </div>
            <button className="add-button" onClick={() => addCount(calories, protein)}>Add to Intake</button>
        </div>
	)
}
