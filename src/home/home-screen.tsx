import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

interface HomeScreenButton {
  readonly onPress: () => void
  readonly text: string
}

export const HomeScreen: React.FunctionComponent = () => {
  const { navigate } = useNavigation()
  const buttons: HomeScreenButton[] = [
    {
      onPress: () => navigate('Jumping Box'),
      text: 'Jumping Box',
    },
    {
      onPress: () => undefined,
      text: 'Moveable Box',
    },
  ]

  const renderItem: ListRenderItem<HomeScreenButton> = ({ item }) => (
    <TouchableOpacity style={styles.listItem} onPress={item.onPress}>
      <Text style={styles.listItemText}>{item.text}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList style={styles.list} data={buttons} renderItem={renderItem} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    // backgroundColor: 'white',
  },
  listItem: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderTopColor: 'grey',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  listItemText: {
    fontSize: 16,
  },
})
