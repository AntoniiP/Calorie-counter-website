import {useState, useEffect} from 'react'
import Card from '../Card/card'
import useFetch from '../../hooks/useFetch'
import './recipes.css'

export default function Recipes() {
	const { postData, getData } = useFetch()
	const [data, setData] = useState([])

	async function getRecipes() {
		const res = await getData('http://localhost:8706/recipes')
		setData(res)
	}

	useEffect(() => {
		getRecipes()
	}, [])
    return (
		<div className='recipes'>
			<h2>
				Suggested recipes based on <span className='highlight'>your food.</span>
			</h2>
			<h3>Breakfast and quick meals</h3>
			<div className='small-cards'>
				{data.filter(x => x.type == 'breakfast').map((x, i) => <Card width={'350px'} height={'200px'} key={i} title={x.name} content={"Calories: " + x.calories + ' cal. Protein: ' + x.protein + 'g'} button={'See recipe'} bottomButton />)}
			</div>
			<h3>Lunch</h3>
			<div className='small-cards'>
				{data.filter(x => x.type == 'lunch').map((x, i) => <Card width={'350px'} height={'200px'} key={i} title={x.name} content={"Calories: " + x.calories + ' cal. Protein: ' + x.protein + 'g'} button={'See recipe'} bottomButton />)}
			</div>
			<h3>Dinner</h3>
			<div className='small-cards'>
				{data.filter(x => x.type == 'dinner').map((x, i) => <Card width={'350px'} height={'200px'} key={i} title={x.name} content={"Calories: " + x.calories + ' cal. Protein: ' + x.protein + 'g'} button={'See recipe'} bottomButton />)}
			</div>
		</div>
	)
}