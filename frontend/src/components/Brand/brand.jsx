import './brand.css'
import AppContext from '../../context/AppContext'
import {useState, useContext} from 'react'
import useFetch from '../../hooks/useFetch'

export default function Brand({name, icon}) {
	return <img className={'brand-icon ' + name} src={icon} alt=''></img>
}
