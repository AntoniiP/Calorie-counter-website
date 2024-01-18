import {useState, useEffect, useRef} from 'react'
import './counter.css'

export default function Counter() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('dailyGoal')) || [])
    const [ error, setError ] = useState(false)
    const [div, setDiv] = useState(false)
	const divRef = useRef(null)


	useEffect(() => {
		const handleClickOutside = (event) => {
			if (divRef.current && !divRef.current.contains(event.target)) showDiv()
		}

		$(document).on('click', handleClickOutside)

		return () => {
			$(document).off('click', handleClickOutside)
		}
	}, [])

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

	function showDiv() {
		setDiv(!div)
	}

	return (
		<>
			<div className='counter' ref={divRef}>
				{user.length ? (
					<div className='main-content'>
						<div className='goal'>
							<h2>Daily goal:</h2>
							<span>0/{user[0]}</span>
							<p>calories</p>
							<span>0/{user[1]}g</span>
							<p>protein</p>
						</div>
						<div className='update-buttons'>
							<button className='add' onClick={showDiv}>
								<svg fill='#ffffff' version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 45.402 45.402' xml:space='preserve' stroke='#ffffff'>
									<g id='SVGRepo_bgCarrier' stroke-width='0'></g>
									<g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
									<g id='SVGRepo_iconCarrier'>
										<g>
											<path d='M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z'></path>
										</g>
									</g>
								</svg>
								Add calories/protein
							</button>
						</div>
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
			{div && (
				<div className='select' onClick={showDiv}>
					<button className='close'>Close</button>
				</div>
			)}
		</>
	)
}
