import React from 'react'
import { SafeAreaView, StyleSheet, StatusBar, ScrollView } from 'react-native'
import Scroll from './src/components/scroll/scroll'
import Timing from './src/components/timing/timing'

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Timing />
        <Scroll />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
  },
})

export default App
