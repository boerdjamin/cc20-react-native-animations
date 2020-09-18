import * as React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'
import { CAP3_GREEN } from '../../styles/colors'

const {
  Clock,
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  debug,
  stopClock,
  block,
} = Animated

const runTiming = (clock: Animated.Clock, value: number, dest: number) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  }

  const config = {
    duration: 5000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  }

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest),
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ],
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, debug('stop clock', stopClock(clock))),
    // we made the block return the updated position
    state.position,
  ])
}

const Timing = () => {
  const clock = new Clock()
  // and use runTiming method defined above to create a node that is going to be mapped
  // to the translateX transform.
  const translateX = runTiming(clock, -120, 120)

  return (
    <Animated.View style={[styles.box, { transform: [{ translateX }] }]}>
      <Image
        style={{ height: 80, width: 80 }}
        source={{
          uri: 'https://media.giphy.com/media/26AHG5KGFxSkUWw1i/giphy.gif',
        }}
      />
    </Animated.View>
  )
}

export default Timing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  box: {
    height: 120,
    width: 120,
    padding: 20,
    backgroundColor: CAP3_GREEN,
  },
})
