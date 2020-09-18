import * as React from 'react'
import {
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { CAP3_GREEN } from '../../styles/colors'

const BOX_DIMENSIONS = 100

const TestComponent: React.FunctionComponent = () => {
  const offset = useSharedValue(0)
  const maxTranslateX = Dimensions.get('window').width - BOX_DIMENSIONS

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * maxTranslateX }],
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
    width: BOX_DIMENSIONS,
    height: BOX_DIMENSIONS,
    backgroundColor: CAP3_GREEN,
    borderRadius: 16,
    marginVertical: 32,
  },
})
