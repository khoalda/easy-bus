import { View, SafeAreaView } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants'
import BusList from '../../components/find-bus/bus-list/BusList'
import SearchBusBox from '../../components/find-bus/search-box/SearchBusBox'

const FindBus = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View
        style={{
          flex: 1,
          padding: SIZES.medium,
        }}
      >
        <SearchBusBox />
        <BusList />
      </View>
    </SafeAreaView>
  )
}

export default FindBus