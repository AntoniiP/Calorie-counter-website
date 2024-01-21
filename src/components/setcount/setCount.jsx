// import {useState, useEffect, useRef} from 'react'
// import './counter.css'

// export default function Counter() {
// 	const [user, setUser] = useState(JSON.parse(localStorage.getItem('dailyGoal')) || [])
// 	const [error, setError] = useState(false)
// 	const [div, setDiv] = useState(false)
// 	const divRef = useRef(null)

// 	useEffect(() => {
// 		const handleClickOutside = (event) => {
// 			if (divRef.current && !divRef.current.contains(event.target)) showDiv()
// 		}

// 		$(document).on('click', handleClickOutside)

// 		return () => {
// 			$(document).off('click', handleClickOutside)
// 		}
// 	}, [])

// 	function handleSubmit() {
// 		const calories = $('#cal').val()
// 		const protein = $('#prote').val()
// 		if (!calories || protein === undefined) return setError(true)

// 		console.log(calories, protein)
// 		localStorage.setItem('dailyGoal', `[${calories}, ${protein}]`)
// 		setUser(JSON.parse(localStorage.getItem('dailyGoal')))
// 	}
// 	const handleKeyDown = (event) => {
// 		if (event.keyCode === 13) handleSubmit(event)
// 	}

// 	function showDiv() {
// 		setDiv(!div)
// 	}

// 	return (
// 		<>
// 			<div className='start'>
// 				<h2>Set your daily goal:</h2>
// 				<input type='number' min='10' name='Calories' placeholder='Calories' id='cal' onKeyDown={handleKeyDown} />
// 				<input type='number' min='0' name='Protein' placeholder='Grams of protein' id='prote' onKeyDown={handleKeyDown} />
// 				{error && <div className='error'>Please fill out all required fields</div>}
// 				<button className='set' onClick={handleSubmit}>
// 					Set
// 				</button>
// 			</div>
// 		</>
// 	)
// }
