import {StyleSheet, Text, View, TextInput, Button} from 'react-native'
import React, {useState} from 'react'

export default function Login() {
	const [text, setText] = useState('')
	const [pass, setPass] = useState('')
	const [isLoginPage, setLoginPage] = useState(true)

	function handleLogin(type) {
		console.log('clicked')
	}

	function changePage() {
		setLoginPage(!isLoginPage)
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
					<TextInput style={styles.input} placeholder='Username' onChangeText={(newText) => setText(newText)} defaultValue={text}></TextInput>
					<TextInput style={styles.input} secureTextEntry={true} placeholder='Password' onChangeText={(newText) => setPass(newText)} defaultValue={pass}></TextInput>
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
					<TextInput style={styles.input} placeholder='Username' onChangeText={(newText) => setText(newText)} defaultValue={text}></TextInput>
					<TextInput style={styles.input} secureTextEntry={true} placeholder='Password' onChangeText={(newText) => setPass(newText)} defaultValue={pass}></TextInput>
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
/**
 				<h1>Register</h1>
					<input type='text' name='Username' placeholder='Username' id='username' onKeyDown={handleKeyDown} />
					<input type='password' name='Password' placeholder='Password' id='password' onKeyDown={handleKeyDown} />

					<input type='number' min='10' name='Calories' placeholder='Daily calories goal (cal)' id='cal' onKeyDown={handleKeyDown} />
					<input type='number' min='1' name='Protein' placeholder='Daily protein goal (g)' id='prote' onKeyDown={handleKeyDown} />

					{error && <div className='error'>{typeof error == 'string' ? error : 'Please fill out all required fields '}</div>}
					<button className='login-button' onClick={() => handleSubmit('register')}>
						Register
					</button>
					<p>
						Already have an account? <strong onClick={() => setPage('login')}>Login</strong>
					</p>
 */
const styles = StyleSheet.create({
	start: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100vw',
		height: '100vh'
	},
	login: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		width: '80%',
		height: '80%',
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
