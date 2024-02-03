import './add.css'
import Search from '../Search/search'
import { useState } from 'react'

export default function Add() {
    const [ isActive, setActive ] = useState(true)
    function toggleSwitch() {
        return setActive(!isActive)
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
			
            { isActive ? <div className='custom-intake'>
                {/* Add inputs */}
            </div> : <div className='brands'>
                {/* Add brands */}
            </div> }
		</div>
	)
}