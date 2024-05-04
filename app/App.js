import { StyleSheet, Text, SafeAreaView, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useState, useEffect} from 'react'
import Login from './components/login';
import Nav from './components/Nav'
export default function App() {
  
  const [count, setCount] = useState([])

  const [user, setUser] = useState({})

  useEffect(() => {
    async function update() {
      await updateDailyGoal()
    }
    update()
  }, [])

  async function updateDailyGoal(newGoal) {
    if (!newGoal) return
    console.log('updating daily goal', newGoal)
		if (newGoal) await AsyncStorage.setItem('dailyGoal', JSON.stringify(newGoal))
    const allData = {}
    
    let keys = await AsyncStorage.getAllKeys()
    let items = (await AsyncStorage.multiGet(keys))
    items.forEach(item => allData[item[0]] = item[1].match(/\[|\(/) ? JSON.parse(item[1]) : item[1]
    )
		setUser(allData)
		setCount(newGoal)
  }

  return (
		<SafeAreaView style={styles.container}>
			{user.dailyGoal ? (
				<View>
					<Text>test</Text>
					<Nav />
				</View>
			) : (
				<Login onSetGoal={updateDailyGoal} />
			)}
		</SafeAreaView>
  )
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#D3DBEF',
    margin: 0,
    padding: 0,
    width: '100%',
    flex: 0,
    height: '100%',
	}
})
