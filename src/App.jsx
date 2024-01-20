import {useState} from 'react'
import './App.css'
import Counter from './components/Counter/counter'
import Nav from './components/Nav/nav'
import Search from './components/Search/search'
import Card from './components/Card/card'
function App() {

	return (
            <div className="main-wrapper">
			<Nav />
			<Search />
			<div className="cards">
				<Card />
				<Card />
				<Card />
			</div>
			<div className="counters">

				<Counter type="cal" current={1250} goal={2700} name="Calories" />
				<Counter type="g" current={100} goal={170} name="Protein" />
			</div>
		</div>
	)
}

export default App
