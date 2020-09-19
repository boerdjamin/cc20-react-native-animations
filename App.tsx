import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { BottomSheet } from './src/bottom-sheet/bottom-sheet'
import TestComponent from './src/components/test-component/test-component'
import { HomeScreen } from './src/home/home-screen'
import { MovableBox } from './src/moveable-box/movable-box'

const Stack = createStackNavigator()

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Jumping Box" component={TestComponent} />
          <Stack.Screen name="Moveable Box" component={MovableBox} />
          <Stack.Screen name="Bottom Sheet" component={BottomSheet} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App
