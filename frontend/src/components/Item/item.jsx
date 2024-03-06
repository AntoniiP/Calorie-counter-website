import './item.css'
import {useState} from 'react'

export default function Item({name, calories, protein, image}) {

	return (
		<div className="item">
            {/* {item.category}: {item.name} - Calories: {item.calories}, Protein: {item.protein}g */ }
            <div className="text-content">
                <h4>{ name }</h4>
                <h4>{ calories }</h4>
                <h4>{ protein }</h4>
            </div>
            <button className="add">Add to Intake</button>
        </div>
	)
}
