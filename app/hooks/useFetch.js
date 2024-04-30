import {useState} from 'react'

const useFetch = () => {
	const [error, setError] = useState(null)

	const postData = async (url, data, headers = {}) => {
		setError(null)
		headers['Content-Type'] = 'application/json'
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers,
				body: JSON.stringify(data)
			})
			const result = await response.json()
			if (!response.ok || result.error) setError(result.error || 'An error occurred')

			return result
		} catch (e) {
			setError('Network error')
			return null
		}
	}
	const getData = async (url, headers = {}) => {
		headers['Content-Type'] = 'application/json'
		try {
			const response = await fetch(url, {
				method: 'GET',
				headers
			})
			const result = await response.json()
			if (!response.ok || result.error) setError(result.error || 'An error occurred')
			return result
		} catch (e) {
			setError('Network error')
			return null
		}
	}

	return {postData, getData, error}
}

export default useFetch
