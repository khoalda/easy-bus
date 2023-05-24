import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker, Circle } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";

import * as Location from "expo-location";
import { COLORS } from "../../../constants";
import styles from "./Map.style";

const Map = () => {
  const mapRef = React.useRef(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [pin, setPin] = React.useState({
    latitude: 10.762622,
    longitude: 106.660172,
  });

  const [region, setRegion] = useState({
    latitude: 10.762622,
    longitude: 106.660172,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      if (mapRef.current) {
        mapRef.current.animateToRegion(region, 100); // 100 là thời gian (ms) để di chuyển đến vùng
      }
      console.log(location);
      console.log(region);
    })();
  }, []);

  return (
    <View style={styles.mapContainer}>
      <MapView ref={mapRef} style={styles.mapContainer} provider="google" initialRegion={region}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        ></Marker>
        <Circle
          center={pin}
          radius={1000}
          strokeWidth={2}
          strokeColor={COLORS.lightBlue}
          fillColor={COLORS.lightBlue}
          lineCap="square"
          lineJoin="bevel">
        </Circle>
      </MapView>
    </View>
  );
};

export default Map;
