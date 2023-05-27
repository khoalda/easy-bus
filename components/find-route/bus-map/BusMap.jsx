import React, { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { View, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { COLORS } from "../../../constants";
import styles from "./BusMap.style";
import { MaterialIcons } from "@expo/vector-icons";

const BusMap = ({ points, path }) => {
  const mapRef = React.useRef(null);
  const [region, setRegion] = useState({
    latitude: 10.762622,
    longitude: 106.660172,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleFocusCurrentLocation = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 100);
    }
  };

  const handleFocusToLocation = (point) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: point.Lat,
          longitude: point.Lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        100
      );
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef}
        style={styles.mapContainer}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        ></Marker>

        {points?.map((point, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: point.Lat,
              longitude: point.Lng,
            }}
            pinColor={COLORS.primary}
            title={"Trạm"}
            description={point.Name}
            opacity={0.8}
          />
        ))}

        <Polyline
          coordinates={path}
          strokeWidth={8}
          strokeColor={COLORS.tertiary}
        />
      </MapView>

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          backgroundColor: COLORS.white,
          borderRadius: 20,
          padding: 10,
          elevation: 5,
        }}
        onPress={handleFocusCurrentLocation}
      >
        <MaterialIcons name="my-location" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default BusMap;
