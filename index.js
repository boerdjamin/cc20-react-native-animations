import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import Config from 'react-native-config'
import storybookUI from './storybook'

console.log('CONFIG', Config)
if (Config.IS_STORYBOOK === 'true') {
  AppRegistry.registerComponent(appName, storybookUI)
} else {
  AppRegistry.registerComponent(appName, () => App)
}
