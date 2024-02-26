import './brand.css'
import AppContext from '../../context/AppContext'
import {useState, useContext} from 'react'
import useFetch from '../../hooks/useFetch'

export default function Brand({name, icon}) {
	const [isRequestMade, setIsRequestMade] = useState(false)
	const [isActive, setActive] = useState(true)
	const {updateCount} = useContext(AppContext)
	const {postData, getData} = useFetch()

	async function getBrandData(name) {
		if (!isRequestMade) {
			const res = await getData('http://localhost:8706/brands/' + name)
			if (!res.error) {
				setBrandsData(res)
				setIsRequestMade(true)
			}
		}
	}

	return (
		<img className={'brand-icon'} src={icon} alt='' onClick={() => getBrandData(name)}></img>
	)
}
