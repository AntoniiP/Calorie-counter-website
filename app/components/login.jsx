import {StyleSheet, Text, View, TextInput, Dimensions} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react'
import useFetch from '../hooks/useFetch'

export default function Login({onSetGoal}) {
	const [username, setUsername] = useState('')
	const [password, setPass] = useState('')
	const [isLoginPage, setLoginPage] = useState(true)
	const [error, setError] = useState(false)
	const [calories, setCalories] = useState(false)
	const [protein, setProtein] = useState(false)
	const {postData} = useFetch()

	async function handleLogin(type) {
		const apiUrl = process.env.EXPO_PUBLIC_API_URL
		if (type == 'login') {
			if (!username || !password) return setError(true)
			const res = await postData(apiUrl + '/login', {username, password})
			if (!res.error) {
				const {totalCalories, totalProtein, currentCalories, currentProtein, token} = res
				await AsyncStorage.setItem('dailyGoal', `[${totalCalories}, ${totalProtein}]`)
				await AsyncStorage.setItem('mode', 'dark')
				await AsyncStorage.setItem('current', `[${currentCalories}, ${currentProtein}]`)
				await AsyncStorage.setItem('userToken', token)
				onSetGoal([totalCalories, totalProtein])

			} else setError(res.error)
		} else {
			if (calories < 10 || protein < 10) return setError('Calories and protein must be more than 10')
			if (!username || !password) return setError(true)
			const res = await postData(apiUrl + '/register', {username, password, totalCalories: calories, totalProtein: protein})
			if (!res.error) {
				const { totalCalories, totalProtein, token } = res
				await AsyncStorage.setItem('dailyGoal', `[${totalCalories}, ${totalProtein}]`)
				await AsyncStorage.setItem('mode', 'dark')
				await AsyncStorage.setItem('current', '[0,0]')
				await AsyncStorage.setItem('userToken', token)
				onSetGoal([totalCalories, totalProtein])
			} else setError(res.error)
		}
	}

	function changePage() {
		setLoginPage(!isLoginPage)
		setError(false)
	}

	return (
		<View style={styles.start}>
			{isLoginPage ? (
				<View style={styles.login}>
					<Text
						style={{
							fontSize: 40
						}}
					>
						Login
					</Text>
					<TextInput style={styles.input} placeholder='Username' onChangeText={(newText) => setUsername(newText)} defaultValue={username}></TextInput>
					<TextInput
						style={styles.input}
						secureTextEntry={true}
						placeholder='Password'
						onChangeText={(newText) => {
							setError(false)
							setPass(newText)
						}}
						defaultValue={password}
					></TextInput>
					{error && <Text style={{color: 'black', fontSize: 16}}>{typeof error == 'string' ? error : 'Please fill out all required fields '}</Text>}

					<View onStartShouldSetResponder={() => handleLogin('login')} style={styles.button} accessibilityLabel='Login Button'>
						<Text style={{color: '#fff'}}>Login</Text>
					</View>
					<Text style={{fontSize: 16, marginTop: 15}}>
						Don't have an account?{' '}
						<Text onPress={changePage} style={{fontWeight: 'bold'}}>
							Create one
						</Text>
					</Text>
				</View>
			) : (
				<View style={styles.login}>
					<Text
						style={{
							fontSize: 40
						}}
					>
						Register
					</Text>
					<TextInput style={styles.input} placeholder='Username' onChangeText={(newText) => setUsername(newText)} defaultValue={username}></TextInput>
					<TextInput
						style={styles.input}
						secureTextEntry={true}
						placeholder='Password'
						onChangeText={(newText) => {
							setError(false)
							setPass(newText)
						}}
						defaultValue={password}
					></TextInput>
					<TextInput style={styles.input} onChangeText={(newNumber) => setCalories(newNumber)} inputMode='numeric' placeholder='Daily calories goal (cal)'></TextInput>
					<TextInput style={styles.input} onChangeText={(newNumber) => setProtein(newNumber)} inputMode='numeric' placeholder='Daily protein goal (g)'></TextInput>

					{error && <Text style={{color: 'black', fontSize: 16}}>{typeof error == 'string' ? error : 'Please fill out all required fields '}</Text>}
					<View onStartShouldSetResponder={() => handleLogin('register')} style={styles.button} accessibilityLabel='Login Button'>
						<Text style={{color: '#fff'}}>Register</Text>
					</View>
					<Text style={{fontSize: 16, marginTop: 15}}>
						Already have an account?{' '}
						<Text onPress={changePage} style={{fontWeight: 'bold'}}>
							Login
						</Text>
					</Text>
				</View>
			)}
		</View>
	)
}
const styles = StyleSheet.create({
	start: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100vw',
		height: Dimensions.get('screen').height * 0.9
	},
	login: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		width: '80%',
		height: Dimensions.get('screen').height * 0.7,
		borderRadius: 20
	},
	input: {
		borderColor: 0,
		padding: 15,
		backgroundColor: '#f3f3f3', // card-color
		borderRadius: 20,
		margin: 15,
		width: '60%'
	},
	button: {
		border: 0,
		fontSize: 24,
		fontWeight: 600,
		color: '#fff',
		backgroundColor: '#4ca46f',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		padding: 5,
		width: 200,
		height: 50,
		margin: 15
	}
})
