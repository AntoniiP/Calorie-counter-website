import { StyleSheet, Text, SafeAreaView } from 'react-native';
import Login from './components/login';

export default function App() {
  return (
		<SafeAreaView style={styles.container}>
			<Login/>
		</SafeAreaView>
  )
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#D3DBEF',
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    'overflow-x': 'hidden',
	}
})
