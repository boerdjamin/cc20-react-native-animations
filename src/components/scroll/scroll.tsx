import * as React from 'react'
import { Text, ScrollView, StyleSheet } from 'react-native'
import { loremIpsum } from './text'

const Scroll = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>{loremIpsum}</Text>
    </ScrollView>
  )
}

export default Scroll

const styles = StyleSheet.create({
  container: { marginTop: 16, padding: 16 },
  text: {
    fontFamily: 'Cochin',
    fontSize: 16,
  },
})
