import { configure, getStorybookUI } from '@storybook/react-native'
import { addDecorator } from '@storybook/react-native/dist'
import React from 'react'
import { View } from 'react-native'
import { loadStories } from './storyLoader'

const storybookUIRoot = () => {
  configure(loadStories, module)
  addDecorator((story) => (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      {story()}
    </View>
  ))
  // Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
  // To find allowed options for getStorybookUI
  return getStorybookUI({
    asyncStorage: null,
  })
}

export default storybookUIRoot
