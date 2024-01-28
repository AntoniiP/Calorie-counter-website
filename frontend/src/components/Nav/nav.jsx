import {useState} from 'react'
import './nav.css'

export default function Nav() {
	const [mode, setMode] = useState(localStorage.getItem('mode') || 'light')
	function changeVar(variable, color) {
		document.documentElement.style.setProperty(variable, color)
	}
	function loadMode() {
		
		const darkModeColors = {
				'--main-color': '#2F3746',
				'--card-color': '#242424',
				'--white-bg-color': '#121212',
				'--search-bar-color': '#202020',
				'--text-color': 'white',
				'--scrollbar-color': '#0e0e0e'
			},
			lightModeColors = {
				'--main-color': '#D3DBEF',
				'--white-bg-color': '#fff',
				'--card-color': '#f3f3f3',
				'--search-bar-color': '#f8f8f8',
				'--text-color': 'black',
				'--scrollbar-color': '#f1f1f1'
			}

		if (mode == 'light') {
			const values = Object.values(darkModeColors)
			Object.keys(darkModeColors).forEach((variable, i) => changeVar(variable, values[i]))
		} else {
			const values = Object.values(lightModeColors)
			Object.keys(lightModeColors).forEach((variable, i) => changeVar(variable, values[i]))
		}
	}

	loadMode()
	
	function toggleMode() {
		setMode((mode) => {
			const content = (mode == 'light' ? 'dark' : 'light')
			localStorage.setItem('mode', content)
			return content
		})
		loadMode()

	}

	return (
		<nav className='vertical-nav'>
			<ul className='nav-list'>
				<li className='nav-item'>
					<a href='#' className='nav-link'>
						<i className='nav-icon home-icon'></i>
					</a>
				</li>
				<li className='nav-item'>
					<a href='#' className='nav-link'>
						<i className='nav-icon meals-icon'></i>
					</a>
				</li>
				<li className='nav-item'>
					<a href='#' className='nav-link'>
						<i className='nav-icon notes-icon'></i>
					</a>
				</li>
				<li className='nav-item'>
					<a href='#' className='nav-link'>
						<i className='nav-icon time-icon' onClick={toggleMode}></i>
					</a>
				</li>
				<div className='nav-separator'></div>
				<li className='nav-item'>
					<a href='#' className='nav-link'>
						<i className='nav-icon settings-icon'></i>
					</a>
				</li>
				<li className='nav-item'>
					<a href='#' className='nav-link'>
						<i className='nav-icon help-icon'></i>
					</a>
				</li>

				<li className='nav-item'>
					<a href='#' className='nav-link'>
						<i className='nav-icon logout-icon' onClick={ () => {
							localStorage.clear()
							location.reload()
						} }></i>
					</a>
				</li>
			</ul>
		</nav>
	)
}
