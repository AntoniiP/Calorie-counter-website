import {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Settings from './navigationScreens/settings'
import Home from './navigationScreens/home'

export default function Nav() {


	return (
		<View style={ styles.nav }>
			<View><Text>Home</Text></View>
			<View><Text>Settings</Text></View>
        </View>
	)
}


const styles = StyleSheet.create({
	nav: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10,
		width: '100%',
		height: 40,
		backgroundColor: '#fff',
		position: 'fixed',
	},
	navItem: {

	}

})