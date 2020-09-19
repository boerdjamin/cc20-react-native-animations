import * as React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

interface SheetProps {
  readonly onClose: () => void
}

const ANIMATION_DURATION = 300
const HEIGHT = Dimensions.get('window').height

const clamp = (value: number, lowerBound: number, upperBound: number) => {
  'worklet'
  return Math.min(Math.max(lowerBound, value), upperBound)
}

export const Sheet: React.FunctionComponent<SheetProps> = ({ onClose }) => {
  const backgroundOpacity = useSharedValue(0)
  const translateY = useSharedValue(HEIGHT)
  const [contentHeight, setContentHeight] = React.useState<number>()
  const [isAnimationReady, setIsAnimationReady] = React.useState(false)

  const handleClose = () => {
    if (contentHeight) {
      backgroundOpacity.value = withTiming(0, { duration: ANIMATION_DURATION })
      translateY.value = withTiming(
        contentHeight,
        { duration: ANIMATION_DURATION },
        onClose,
      )
    }
  }

  const onGestureEvent = useAnimatedGestureHandler<{
    offsetY: number
  }>({
    onStart: (_, context) => {
      context.offsetY = translateY.value
    },
    onActive: (event, context) => {
      translateY.value = clamp(context.offsetY + event.translationY, 0, HEIGHT)
    },
    onEnd: ({ translationY }) => {
      if (contentHeight && translationY > contentHeight * 0.33) {
        handleClose()
      } else {
        translateY.value = withSpring(0)
      }
    },
  })

  React.useEffect(() => {
    if (contentHeight) {
      translateY.value = isAnimationReady
        ? withTiming(contentHeight, { duration: ANIMATION_DURATION })
        : contentHeight
      setIsAnimationReady(true)
    }
  }, [contentHeight])

  React.useEffect(() => {
    if (isAnimationReady) {
      backgroundOpacity.value = withTiming(0.4, {
        duration: ANIMATION_DURATION,
      })
      translateY.value = withTiming(0, { duration: ANIMATION_DURATION })
    }
  }, [isAnimationReady])

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
  }))

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View style={[{ flex: 1 }, backgroundStyle]} />
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            {
              backgroundColor: 'white',
              paddingVertical: 32,
              paddingHorizontal: 16,
            },
            modalStyle,
          ]}
          onLayout={(event) =>
            setContentHeight(event.nativeEvent.layout.height)
          }
        >
          <Text style={styles.heading}>Headline</Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            cupiditate repellat adipisci eveniet possimus laudantium laborum aut
            necessitatibus iusto aliquid, tenetur reprehenderit eaque odit minus
            tempore id voluptate reiciendis iure?
          </Text>
          <Text style={styles.paragraph}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus eius
            omnis porro ullam harum asperiores sit sunt, hic neque modi dolorum
            vitae! Aliquam deserunt reiciendis voluptate magnam, voluptatibus
            repudiandae enim.
          </Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: '300',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 8,
  },
})
