import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Timing from './timing'

const normal = () => <Timing />

storiesOf('Timing', module).add('normal', normal)
