import { AppRegistry } from 'react-native'
import Config from 'react-native-config'
import 'react-native-gesture-handler'
import App from './App'
import { name as appName } from './app.json'
import storybookUI from './storybook'

if (Config.IS_STORYBOOK === 'true') {
  AppRegistry.registerComponent(appName, storybookUI)
} else {
  AppRegistry.registerComponent(appName, () => App)
}
