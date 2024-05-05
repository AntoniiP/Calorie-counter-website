import {useState} from 'react'
import Card from '../Card/card'
import './recipes.css'

export default function Recipes() {
    return (
		<div className='recipes'>
			<h2>
				Suggested recipes based on <span className='highlight'>your food.</span>
			</h2>
			<h3>Breakfast and quick meals</h3>
			{/* <div className='cards'> */}
				{/* <Card name='Meal log' /> */}
				{/* <Card name='My meals' button /> */}
				{/* <Card name='My food' button /> */}
			{/* </div> */}
			<h3>Lunch</h3>
			<h3>Dinner</h3>
		</div>
	)
}