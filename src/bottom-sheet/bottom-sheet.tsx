import * as React from 'react'
import { Button, SafeAreaView } from 'react-native'
import { Sheet } from './components/sheet'

export const BottomSheet: React.FunctionComponent = () => {
  const [showModal, updateShowModal] = React.useState(false)

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Button title={'Open Modal'} onPress={() => updateShowModal(true)} />
      {showModal && <Sheet onClose={() => updateShowModal(false)} />}
    </SafeAreaView>
  )
}
