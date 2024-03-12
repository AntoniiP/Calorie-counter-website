import './brand.css'
import AppContext from '../../context/AppContext'
import {useState, useContext} from 'react'
import useFetch from '../../hooks/useFetch'

export default function Brand({name, icon, updateData}) {
	const [isActive, setActive] = useState(true)
	const {postData, getData} = useFetch()

	async function getBrandData(name) {
			const res = await getData('http://localhost:8706/brands/' + name)
			if (!res.error) updateData(res)
	}

	return (
		<img className={'brand-icon'} src={icon} loading="lazy" alt='' onClick={() => getBrandData(name)}></img>
	)
}
