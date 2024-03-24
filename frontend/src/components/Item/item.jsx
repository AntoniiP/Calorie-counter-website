import './item.css'
import {useState} from 'react'

export default function Item({name, calories, protein, image}) {

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
            <button className="add-button">Add to Intake</button>
        </div>
	)
}
