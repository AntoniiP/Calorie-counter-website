import './add.css'
import AppContext from '../../context/AppContext'
import {useState, useEffect, useContext} from 'react'
import useFetch from '../../hooks/useFetch'
import Brand from '../Brand/brand'
import Item from '../Item/item'

export default function Add({toggleDiv}) {
	const [isActive, setActive] = useState(true)
	const [isRequestMade, setIsRequestMade] = useState(false)
	const [brandsData, setBrandsData] = useState([])
	const [sharedData, setSharedData] = useState([])
	const [originalData, setOriginalData] = useState([])
	const [parsedData, setParsedData] = useState([])
	const [ categories, setCategories ] = useState([])
	const [inputValue, setInputValue] = useState('')

	const {updateCount} = useContext(AppContext)
	const {postData, getData} = useFetch()

	async function toggleSwitch() {
		if (!isRequestMade) {
			const res = await getData('http://localhost:8706/brands/all')
			if (!res.error) {
				setBrandsData(res)
				setIsRequestMade(true)
			}
		}

		setActive(!isActive)
	}

	function handleKeyDown(event) {
		if (event.keyCode === 13) return addCount()
	}

	async function addCount() {
		const protein = $('#prote').val(),
			cal = $('#cal').val()
		if (cal < 10 || protein < 0) return
		const current = JSON.parse(localStorage.getItem('current'))
		if (cal) current[0] += Number(cal)
		if (protein) current[1] += Number(protein)
		localStorage.setItem('current', JSON.stringify(current))
		toggleDiv()
		updateCount(current)
		await postData('http://localhost:8706/update', {currentCalories: current[0], currentProtein: current[1]}, {authorization: 'Bearer ' + localStorage.getItem('userToken')})
	}

	function parseData(data) {
		let parsedData = []
		let categories = []
		Object.keys(data).forEach((category) => {
			if (typeof data[category] === 'object')
				Object.keys(data[category]).forEach((item) => {
					const sizes = data[category][item]
					Object.keys(sizes).forEach((size) => {
						const milkTypes = sizes[size]
						Object.keys(milkTypes).forEach((milkType) => {
							const {calories, protein} = milkTypes[milkType]
							categories.push(category)
							parsedData.push({
								name: `${item} (${size}, ${milkType})`,
								calories,
								protein
							})
						})
					})
				})
		})
		return [parsedData, categories]
	}

	useEffect(() => {
		const [data, categoriesData] = parseData(sharedData)
		setOriginalData(data) // Store original data
		setParsedData(data) // Also initialize parsedData with original data
		setCategories([...new Set(categoriesData)])
	}, [sharedData])

	function handleSearch(event) {
		const searchText = event.target.value.toLowerCase()
		setInputValue(event.target.value) // Update inputValue on each change

		// Always filter from the original full dataset
		const filteredData = searchText ? originalData.filter((item) => item.name.toLowerCase().includes(searchText)).sort((a, b) => a.name.localeCompare(b.name)) : [...originalData] // If no search text, show all original data

		setParsedData(filteredData)
	}

	return (
		<div className='add-wrapper'>
			<div className='add-cal'>
				<h4>Add your custom intake or select an item from a specific brand.</h4>
				<div className='close-div' onClick={toggleDiv}>
					<svg width='40' height='40' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
						<rect x='40' y='10' width='20' height='80' rx='10' ry='10' />
						<rect x='10' y='40' width='80' height='20' rx='10' ry='10' />
					</svg>
				</div>

				<div className='button-cover'>
					<div className='button r' id='button-1'>
						<input type='checkbox' className='checkbox' onClick={toggleSwitch} />
						<div className='knobs'></div>
						<div className='layer'></div>
					</div>
				</div>

				{isActive ? (
					<div className='custom-intake'>
						<p>Calories (cal)</p>
						<input type='number' min='10' name='Calories' placeholder='Daily calories goal (cal)' id='cal' onKeyDown={handleKeyDown} />
						<p>Protein (g)</p>
						<input type='number' min='1' name='Protein' placeholder='Daily protein goal (g)' id='prote' onKeyDown={handleKeyDown} />
						<button className='button' onClick={addCount}>
							Add to the count
						</button>
					</div>
				) : (
					<div className='brands'>
						{sharedData.name ? (
							<div className='brand-items'>
								<div className='categories-selector'>
									<button className='button-back' onClick={() => setSharedData([])}>
										&lt;
									</button>
									{categories.map((item, index) => (
										<button key={index} className='button-category' id={item}>
											{item}
										</button>
									)) }
										
									<input value={inputValue} type='text' className='search'  id='item-search' placeholder='Search...' onChange={handleSearch} autoComplete='off' />
								</div>
								<div className='brand-item-wrapper'>
									{parsedData.map((item, index) => (
										<Item key={index} name={item.name} calories={item.calories} protein={item.protein} />
									))}
								</div>
							</div>
						) : (
							brandsData.map((x, i) => <Brand key={i} name={x.Name} icon={x.icon} updateData={setSharedData}></Brand>)
						)}
					</div>
				)}
			</div>
		</div>
	)
}
