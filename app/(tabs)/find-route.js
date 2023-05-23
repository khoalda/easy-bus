import { View, SafeAreaView } from 'react-native'
import React from 'react'
import SearchBox from '../../components/find-route/search-box/SearchBox'
import Map from '../../components/find-route/map/Map'
import { COLORS, SIZES } from '../../constants'

const FindRoute = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View
        style={{
          flex: 1,
          padding: SIZES.medium,
        }}
      >
        <SearchBox />
        <Map />
      </View>
    </SafeAreaView>
  )
}

export default FindRoute