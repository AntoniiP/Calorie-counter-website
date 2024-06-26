import './card.css'
export default function Card({name, title, content, sortType, button, bottomButton, width, height, border, shadow, onClickFunction}) {
	return (
		<div className='card main-card' style={{width: width || '30%', height: height || '30vh'}}>
			<div className='text'>{title ? <h2>{title}</h2> : <h3>{name}</h3>}</div>
			{content && <p>{content}</p>}
			<div className='card-c'>
				{button && !bottomButton && <button className='content button'>{typeof button == 'string' ? 'See recipe' : '+'}</button>}
				{!content && (
					<div className='contentDivs'>
						<div className='content'></div>
						<div className='content'></div>
						<div className='content'></div>
						<div className='content'></div>
						<div className='content'></div>
						<div className='content'></div>
						<div className='content'></div>
					</div>
				)}{' '}
				{button && bottomButton && <button onClick={onClickFunction} className='content button textButton'>{typeof button == 'string' ? 'See recipe' : '+'}</button>}
			</div>
		</div>
	)
}
