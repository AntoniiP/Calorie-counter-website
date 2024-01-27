import {useEffect, useState} from 'react'
import './App.css'
import Counter from './components/Counter/counter'
import Nav from './components/Nav/nav'
import Search from './components/Search/search'
import Card from './components/Card/card'
import Login from './components/login/login'

function App() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('dailyGoal')) || [])

	const updateDailyGoal = (newGoal) => {
		localStorage.setItem('dailyGoal', JSON.stringify(newGoal))
		setUser(newGoal)
	}
	
	return (
		<>
			{user.length ? (
				<div className='main-wrapper'>
					<Nav />
					<Search />
					<div className='cards'>
						<Card name='Meal log' />
						<Card name='My meals' button />
						<Card name='My food' button />
					</div>
					<div className='counters'>
						<Counter type='cal' current={2650} goal={2700} name='Calories' />
						<Counter type='g' current={132} goal={170} name='Protein' />
					</div>
				</div>
			) : (
				<Login onSetGoal={updateDailyGoal} />
			)}
		</>
	)
}

export default App
