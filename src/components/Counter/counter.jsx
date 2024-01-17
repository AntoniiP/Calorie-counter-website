import {useState} from 'react'
import './counter.css'

export default function Counter() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('dailyGoal')) || [])
    const [ error, setError ] = useState(false)
    

	function handleSubmit() {
		const calories = $('#cal').val()
		const protein = $('#prote').val()
		if (!calories || protein === undefined) return setError(true)

		console.log(calories, protein)
		localStorage.setItem('dailyGoal', `[${calories}, ${protein}]`)
		setUser(JSON.parse(localStorage.getItem('dailyGoal')))
	}
	const handleKeyDown = (event) => {
		if (event.keyCode === 13) handleSubmit(event)
    }

	return (
		<div className='counter'>
			{user.length ? (
				<div>
					<div className='goal'>
						<h2>Daily goal:</h2>
						<span>0/{user[0]}</span>
						<p>calories</p>
						<span>0/{user[1]}g</span>
						<p>protein</p>
					</div>
					{/* <div className='update-buttons'> */}
						{/* <button className='set' onClick={handleSubmit}>Manually Add</button> */}
						{/* <button className='set' onClick={handleSubmit}>Browse items</button> */}
						{/* <button className='set' onClick={handleSubmit}>Create an item</button> */}
					{/* </div> */}
				</div>
			) : (
				<div className='start'>
					<h2>Set your daily goal:</h2>
					<input type='number' min='10' name='Calories' placeholder='Calories' id='cal' onKeyDown={handleKeyDown} />
					<input type='number' min='0' name='Protein' placeholder='Grams of protein' id='prote' onKeyDown={handleKeyDown} />
					{error && <div className='error'>Please fill out all required fields</div>}
					<button className='set' onClick={handleSubmit}>
						Set
					</button>
				</div>
			)}
		</div>
	)
}
