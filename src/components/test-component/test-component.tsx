import * as React from 'react'
import { Button, SafeAreaView, StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { CAP3_GREEN } from '../../styles/colors'

const TestComponent = () => {
  const offset = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * 255 }],
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Animated.View style={[styles.box, animatedStyles]} />
        <Button
          onPress={() => {
            offset.value = withSpring(Math.random())
          }}
          title={'Press me'}
        />
      </View>
    </SafeAreaView>
  )
}

export default TestComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: CAP3_GREEN,
  },
})
