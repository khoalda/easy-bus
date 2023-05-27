import { View, SafeAreaView } from 'react-native'
import React from 'react'
import Tracking from '../../components/find-route/tracking/Tracking'
import { COLORS, SIZES } from '../../constants'
import { useSearchParams } from "expo-router";


const FindRoute = () => {
  const params = useSearchParams();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View
        style={{
          flex: 1,
          padding: SIZES.medium,
        }}
      >
        <Tracking initialEnd={params.search} />
      </View>
    </SafeAreaView>
  )
}

export default FindRoute