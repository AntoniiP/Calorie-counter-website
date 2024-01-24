import './card.css'
export default function Card({ name, content, sortType, button }) {
	return (
		<div className='card main-card'>
			<div className="text">
				<h3>{ name }</h3>
			</div>
			<div className="card-c">
				{button && <button className='content button'>+</button>}
				<div className="content"></div>
				<div className="content"></div>
				<div className="content"></div>
				<div className="content"></div>
				<div className="content"></div>
				<div className="content"></div>
				<div className="content"></div>
			</div>
		</div>
	)
}
