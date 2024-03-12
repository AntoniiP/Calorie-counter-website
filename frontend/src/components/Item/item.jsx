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
                <h4>Calories: { calories }</h4>
                <h4>Protein: { protein }</h4>
            </div>
            <button className="add">Add to Intake</button>
        </div>
	)
}
