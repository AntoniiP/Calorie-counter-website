import {useEffect, useState} from 'react'
import './App.css'
import Counter from './components/Counter/counter'
import Nav from './components/Nav/nav'
import Search from './components/Search/search'
import Card from './components/Card/card'
import Login from './components/login/login'

function App() {
	const [count, setCount] = useState(JSON.parse(localStorage.getItem('dailyGoal')) || [])

	const [user, setUser] = useState([])



	const updateDailyGoal = (newGoal) => {
		localStorage.setItem('dailyGoal', JSON.stringify(newGoal))
		const allData = {}
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i)
			const item =  localStorage.getItem(key)
			allData[key] = item.match(/\[|\(/) ? JSON.parse(item) : item
		}
		setUser(allData)
		setCount(newGoal)
	}

	return (
		<>
			{count.length ? (
				<div className='main-wrapper'>
					<Nav />
					<Search />
					<div className='cards'>
						<Card name='Meal log' />
						<Card name='My meals' button />
						<Card name='My food' button />
					</div>
					<div className='counters'>
						<Counter type='cal' current={user.current[0]} goal={count[0]} name='Calories' />
						<Counter type='g' current={user.current[1]} goal={count[1]} name='Protein' />
					</div>
				</div>
			) : (
				<Login onSetGoal={updateDailyGoal} />
			)}
		</>
	)
}

export default App
