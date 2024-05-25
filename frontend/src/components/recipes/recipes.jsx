import {useState, useEffect} from 'react'
import Card from '../Card/card'
import useFetch from '../../hooks/useFetch'
import './recipes.css'

export default function Recipes() {
	const { postData, getData } = useFetch()
	const [data, setData] = useState([])
	const [isRecipe, setRecipe] = useState(false)

	async function getRecipes() {
		const res = await getData('http://localhost:8706/recipes')
		setData(res)
	}

	useEffect(() => {
		getRecipes()
	}, [])

	function seeRecipe(name) {
		console.log(name)
		const recipe = data.find(x => x.name == name)?.recipe
		console.log(recipe)
		
		if (!recipe) return;
		setRecipe(recipe)
	}

	return (
		<>
			{!isRecipe ? (
				<div className='recipes'>
					<h2>
						Suggested recipes based on <span className='highlight'>your food.</span>
					</h2>
					<h3>Breakfast and quick meals</h3>
					<div className='small-cards'>
						{data
							.filter((x) => x.type == 'breakfast')
							.map((x, i) => (
								<Card width={'350px'} height={'200px'} key={i} title={x.name} content={'Calories: ' + x.calories + ' cal. Protein: ' + x.protein + 'g'} button={'See recipe'} bottomButton onClickFunction={() => seeRecipe(x.name)} />
							))}
					</div>
					<h3>Lunch</h3>
					<div className='small-cards'>
						{data
							.filter((x) => x.type == 'lunch')
							.map((x, i) => (
								<Card width={'350px'} height={'200px'} key={i} title={x.name} content={'Calories: ' + x.calories + ' cal. Protein: ' + x.protein + 'g'} button={'See recipe'} bottomButton onClickFunction={() => seeRecipe(x.name)} />
							))}
					</div>
					<h3>Dinner</h3>
					<div className='small-cards'>
						{data
							.filter((x) => x.type == 'dinner')
							.map((x, i) => (
								<Card width={'350px'} height={'200px'} key={i} title={x.name} content={'Calories: ' + x.calories + ' cal. Protein: ' + x.protein + 'g'} button={'See recipe'} bottomButton onClickFunction={() => seeRecipe(x.name)} />
							))}
					</div>
				</div>
			) : (
					<div className='recipes'>
						<button className='back-button' onClick={() => setRecipe(null)}>Back</button>
					<p>{isRecipe}</p>
				</div>
			)}
		</>
	)
}