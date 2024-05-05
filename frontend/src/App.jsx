import {useEffect, useState} from 'react'
import './App.css'
import Counter from './components/Counter/counter'
import Nav from './components/Nav/nav'
import Search from './components/Search/search'
import Card from './components/Card/card'
import Login from './components/login/login'
import AppContext from './context/AppContext'
import Recipes from './components/recipes/recipes'

function App({type}) {
	const [count, setCount] = useState(JSON.parse(localStorage.getItem('dailyGoal')) || [])

	const [user, setUser] = useState({})

	useEffect(() => {
		updateDailyGoal()
	}, [])

	function updateDailyGoal(newGoal) {
		if (newGoal) localStorage.setItem('dailyGoal', JSON.stringify(newGoal))
		const allData = {}
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i)
			const item = localStorage.getItem(key)
			allData[key] = item.match(/\[|\(/) ? JSON.parse(item) : item
		}
		setUser(allData)
		if (newGoal) setCount(newGoal)
	}
	function updateCount() {
		const allData = {}
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i)
			const item = localStorage.getItem(key)
			allData[key] = item.match(/\[|\(/) ? JSON.parse(item) : item
		}
		setUser(allData)
	}

	const componentRoutes = [
		{
			route: '/',
			element: user.dailyGoal ? (
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
			)
		},
		{
			route: '/recipes',
			element: (
				<div className='main-wrapper'>
					<Nav />
					<Search />
					<Recipes />
				</div>
			)
		}
	]

	return <AppContext.Provider value={{updateCount}}>{componentRoutes[type].element}</AppContext.Provider>
}

export default App
