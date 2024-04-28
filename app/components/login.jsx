import {StyleSheet, Text, View, TextInput, Button} from 'react-native'
import React, {useState} from 'react'

export default function Login() {
	const [text, setText] = useState('')
	const [pass, setPass] = useState('')

	function handleLogin() {}

	return (
		<View style={styles.start}>
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
				<Button onPress={handleLogin} title='Login' color='#4ca46f' style={styles.button} accessibilityLabel='Login Button'></Button>
			</View>
		</View>
	)
}
/**
 				<div className='login'>
					<h1>Login</h1>
					<input type='text' name='Username' placeholder='Username' id='username' onKeyDown={handleKeyDown} />
					<input type='password' name='Password' placeholder='Password' id='password' onKeyDown={handleKeyDown} />
					{error && <div className='error'>{typeof error == 'string' ? error : 'Please fill out all required fields '}</div>}

					<button className='login-button' onClick={() => handleSubmit('login')}>
						Login
					</button>
					<p>
						Don't have an account? <strong onClick={() => setPage('register')}>Create one</strong>
					</p>
				</div>
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
		userSelect: 'none',
		borderRadius: 10,
		padding: 5,
		width: 200,
		margin: 15
	}
})
