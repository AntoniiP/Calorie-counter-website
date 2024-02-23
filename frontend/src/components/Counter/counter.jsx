import { useEffect, useState, useRef } from 'react'
import Add from '../Add/add'
import './counter.css'

export default function Card({ type, current, goal, name, onSetCurrent }) {
	const circleRef = useRef(null)
	const [circleStyles, setCircleStyles] = useState({})
	const [ isDivVisible, setIsDivVisible ] = useState(false);
	let percentage = Math.ceil((current * 100) / goal)

	useEffect(() => {
		if (circleRef.current) {
			if (percentage > 100) percentage = 100;
			const radius = circleRef.current.r.baseVal.value
			const circumference = radius * 2 * Math.PI
			const offset = circumference - (percentage / 100) * circumference

			setCircleStyles({
				strokeDashoffset: offset,
				strokeDasharray: `${circumference} ${circumference}`
			})
		}
	}, [ percentage ])

	function toggleDiv() {
		setIsDivVisible(!isDivVisible)
	}

	return (
		<div className='counter main-card'>
			{ isDivVisible && <Add toggleDiv={ toggleDiv } />}
			<h3>Total {name}</h3>
			<div className='progress-circle'>
				<svg className='progress-svg' width='100%' height='100%' viewBox='0 0 250 250'>
					<circle className='circle-bg' cx='125' cy='125' r='110'  strokeWidth='20' fill='none' />
					<circle className='circle' cx='125' cy='125' r='110' stroke='url(#gradient)' strokeWidth='20' fill='none' transform='rotate(-180, 125, 125)' style={circleStyles} ref={circleRef} />
					<defs>
						<linearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
							<stop offset='0%' style={{stopColor: '#72B982', stopOpacity: 1}} />
							<stop offset='100%' style={{stopColor: '#0C6234', stopOpacity: 1}} />
						</linearGradient>
					</defs>
				</svg>
				<div className='inside-circle'>
					<p>
						<span className='number-text'>{current}</span>
						{type}
					</p>
					<p>{percentage}% of goal</p>
				</div>
				<h4 className='add' onClick={toggleDiv}>
					Add {name}
				</h4>
			</div>
		</div>
	)
}
