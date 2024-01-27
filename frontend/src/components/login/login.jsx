import {useState} from 'react'
import './login.css'

export default function SetCount({onSetGoal}) {
	const [error, setError] = useState(false)
	const [page, setPage] = useState('login')

	async function handleSubmit(type) {
		if (type == 'login') {
			const username = $('#username').val(),
				password = $('#password').val()
			console.log(username, password)
			if (!username || !password) return setError(true)
			try {
				const req = await fetch('http://localhost:8706/login', {
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({ username, password })
				})
				const res = await req.json()
				console.log(res)
			} catch (er) {
				setError('Incorrect username or password.')
			}
		} else {

			const calories = $('#cal').val()
			const protein = $('#prote').val()
			if (calories < 10 || protein < 10) return setError(true)
			
			localStorage.setItem('dailyGoal', `[${calories}, ${protein}]`)
			onSetGoal([calories, protein])
		}

	}

	const handleKeyDown = (event) => {
		if (event.keyCode === 13) return handleSubmit(event)
		setError(false)
	}

	return (
		<div className='start-set'>
			{page == 'login' ? (
				<div className='login'>
					<h1>Login</h1>
					<input type='text' name='Username' placeholder='Username' id='username' onKeyDown={handleKeyDown} />
					<input type='password' name='Password' placeholder='Password' id='password' onKeyDown={handleKeyDown} />
					{error && <div className='error'>{typeof error == 'string' ? error : 'Please fill out all required fields '}</div>}

					<button className='login-button' onClick={() => handleSubmit('login')}>
						Login
					</button>
					<p>
						Don't have an account? <strong onClick={() => setPage('register')}>Create one</strong>
					</p>
				</div>
			) : (
				<div className='register'>
					<h1>Register</h1>
					<input type='text' name='Username' placeholder='Username' id='username' onKeyDown={handleKeyDown} />
					<input type='password' name='Password' placeholder='Password' id='password' onKeyDown={handleKeyDown} />

					<input type='number' min='10' name='Calories' placeholder='Daily calories goal (cal)' id='cal' onKeyDown={handleKeyDown} />
					<input type='number' min='1' name='Protein' placeholder='Daily protein goal (g)' id='prote' onKeyDown={handleKeyDown} />
					{error && <div className='error'>{typeof error == 'string' ? error : 'Please fill out all required fields '}</div>}
					<button className='login-button' onClick={() => handleSubmit('login')}>
						Register
					</button>
					<p>
						Already have an account? <strong onClick={() => setPage('login')}>Login</strong>
					</p>
				</div>
			)}
		</div>
	)
}
