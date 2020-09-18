import * as React from 'react'
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated'
import { CAP3_GREEN } from '../styles/colors'

const BOX_DIMENSIONS = 100
const WIDTH = Dimensions.get('window').width - BOX_DIMENSIONS
const HEIGHT = Dimensions.get('window').height - BOX_DIMENSIONS - 100

const clamp = (value: number, lowerBound: number, upperBound: number) => {
  'worklet'
  return Math.min(Math.max(lowerBound, value), upperBound)
}

export const MovableBox: React.FunctionComponent = () => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const onGestureEvent = useAnimatedGestureHandler<{
    offsetX: number
    offsetY: number
  }>({
    onStart: (_, context) => {
      context.offsetX = translateX.value
      context.offsetY = translateY.value
    },
    onActive: (event, context) => {
      translateX.value = clamp(context.offsetX + event.translationX, 0, WIDTH)
      translateY.value = clamp(context.offsetY + event.translationY, 0, HEIGHT)
    },
    onEnd: ({ velocityX, velocityY }) => {
      translateX.value = withDecay({
        velocity: velocityX,
        clamp: [0, WIDTH],
      })
      translateY.value = withDecay({
        velocity: velocityY,
        clamp: [0, HEIGHT],
      })
    },
  })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }))

  return (
    <SafeAreaView style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </PanGestureHandler>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: BOX_DIMENSIONS,
    height: BOX_DIMENSIONS,
    backgroundColor: CAP3_GREEN,
    borderRadius: 16,
  },
})
