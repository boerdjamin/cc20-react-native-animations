import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Test from './test-component'

const normal = () => <Test />

storiesOf('Test', module).add('normal', normal)
