import './add.css'
import AppContext from '../../context/AppContext'
import { useState, useContext } from 'react'

export default function Add({ toggleDiv }) {
	const [ isActive, setActive ] = useState(true)
	const {updateCount} = useContext(AppContext)
	
    function toggleSwitch() {
        return setActive(!isActive)
	}
	
	function handleKeyDown(event) {
		if (event.keyCode === 13) return addCount()
	}
	
	function addCount() {
		const protein = $('#prote').val(),
			cal = $('#cal').val()
		if (cal < 10 || protein < 0) return
		const current = JSON.parse(localStorage.getItem('current'))
		if (cal) current[0] += Number(cal)
		if (protein) current[ 1 ] += Number(protein)
		localStorage.setItem('current', JSON.stringify(current))
		toggleDiv()
		updateCount(current)
	}

    return (
		<div className='add-cal'>
			<h4>Add your custom intake or select an item from a specific brand.</h4>

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
					<input type='number' min='1' name='Protein' placeholder='Daily protein goal (g)' id='prote' onKeyDown={handleKeyDown}/>
					<button className="button" onClick={addCount}>Add to the count</button>
				</div>
			) : (
				<div className='brands'>{/* Add brands */}</div>
			)}
		</div>
	)
}