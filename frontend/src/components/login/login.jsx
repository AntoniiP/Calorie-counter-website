import {useState} from 'react'
import './login.css'
import useFetch from '../../hooks/useFetch'

export default function SetCount({onSetGoal}) {
	const [error, setError] = useState(false)
	const [page, setPage] = useState('login')
	const {postData} = useFetch()

	async function handleSubmit(type) {
		if (type == 'login') {
			const username = $('#username').val(),
				password = $('#password').val()
			if (!username || !password) return setError(true)

			const res = await postData('http://localhost:8706/login', {username, password})
			if (!res.error) {
				const {totalCalories, totalProtein, currentCalories, currentProtein, token} = res
				localStorage.setItem('dailyGoal', `[${totalCalories}, ${totalProtein}]`)
				localStorage.setItem('mode', 'dark')
				localStorage.setItem('current', `[${currentCalories}, ${currentProtein}]`)
				localStorage.setItem('userToken', token)

				onSetGoal([totalCalories, totalProtein])
			} else setError(res.error)
		} else {
			const username = $('#username').val(),
				password = $('#password').val(),
				calories = $('#cal').val(),
				protein = $('#prote').val()
			if (calories < 10 || protein < 10) return setError(true)
			if (!username || !password) return setError(true)
			const res = await postData('http://localhost:8706/register', {username, password, totalCalories: calories, totalProtein: protein})
			if (!res.error) {
				const {totalCalories, totalProtein, token} = res
				localStorage.setItem('dailyGoal', `[${totalCalories}, ${totalProtein}]`)
				localStorage.setItem('mode', 'dark')
				localStorage.setItem('current', '[0,0]')
				localStorage.setItem('userToken', token)
				onSetGoal([totalCalories, totalProtein])
			} else setError(er)
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
					<button className='login-button' onClick={() => handleSubmit('register')}>
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
