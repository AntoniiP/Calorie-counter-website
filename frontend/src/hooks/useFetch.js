import {useState} from 'react'

const useFetch = () => {
	const [error, setError] = useState(null)

	const postData = async (url, data) => {
		setError(null) 
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
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

	return {postData, error}
}

export default useFetch
