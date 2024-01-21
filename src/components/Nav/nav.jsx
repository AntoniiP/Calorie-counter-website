import './nav.css'

export default function Nav() {
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
						<i className='nav-icon time-icon'></i>
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
						<i className='nav-icon logout-icon'></i>
					</a>
				</li>
			</ul>
		</nav>
	)
}