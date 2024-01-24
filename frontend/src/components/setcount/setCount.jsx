import {useState} from 'react'
import './counter.css'

export default function SetCount({onSetGoal}) {
	const [error, setError] = useState(false)

	function handleSubmit() {
		const calories = $('#cal').val()
		const protein = $('#prote').val()
		if (calories < 10 || protein < 10) return setError(true)

		localStorage.setItem('dailyGoal', `[${calories}, ${protein}]`)
		onSetGoal([calories, protein])
	}

	const handleKeyDown = (event) => {
		if (event.keyCode === 13) handleSubmit(event)
	}

	return (
		<div className='start-set'>
			<h2>Set your daily goal:</h2>
			<input type='number' min='10' name='Calories' placeholder='Calories' id='cal' onKeyDown={handleKeyDown} />
			<input type='number' min='1' name='Protein' placeholder='Grams of protein' id='prote' onKeyDown={handleKeyDown} />
			{error && <div className='error'>Please fill out all required fields</div>}
			<button className='set' onClick={handleSubmit}>
				Set
			</button>
		</div>
	)
}
