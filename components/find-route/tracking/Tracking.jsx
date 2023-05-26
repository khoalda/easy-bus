import React, { useState, useEffect, useRef } from "react";
import MapView, {
  Marker,
  Circle,
  PROVIDER_GOOGLE,
  Polyline,
} from "react-native-maps";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { COLORS, SIZES, icons } from "../../../constants";
import styles from "./Tracking.style";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';

const Tracking = () => {
  const mapRef = React.useRef(null);
  const router = useRouter();

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 10.762622,
    longitude: 106.660172,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [start, setStart] = useState({
    latitude: 10.762622,
    longitude: 106.660172,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [end, setEnd] = useState({
    latitude: 10.762622,
    longitude: 106.660172,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const query = {
    key: "AIzaSyA8ROCsmNXGSZBUce4DDh2QVFDmMVhmi4g",
    language: "vi",
    types: "establishment",
    radius: 30000,
    location: `${currentLocation.latitude}, ${currentLocation.longitude}`,
  };

  const handleClick = () =>
    router.push(
      `find-route/recommendation?query=${start.latitude},${start.longitude}/${end.latitude},${end.longitude}`
    );

  const handleFocusCurrentLocation = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(currentLocation, 100);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      console.log("current location: ", location);
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      if (mapRef.current) {
        mapRef.current.animateToRegion(currentLocation, 100);
      }
    })();
  }, []);

  return (
    <View style={styles.mapContainer}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: SIZES.small,
          marginBottom: SIZES.small,
          gap: "5px",
        }}
      >
        <View
          style={{
            width: "85%",
          }}
        >
          <GooglePlacesAutocomplete
            placeholder="Nhập điểm đi"
            fetchDetails={true}
            GooglePlacesSearchQuery={{
              rankby: "distance",
            }}
            onPress={(data, details = null) => {
              setStart({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }}
            query={query}
            styles={{
              textInput: {
                backgroundColor: COLORS.gray2,
              },
              container: {
                flex: 0,
                position: "absolute",
                width: "100%",
                zIndex: 1,
              },
              listView: { backgroundColor: "white" },
            }}
          />

          <GooglePlacesAutocomplete
            placeholder="Nhập điểm đến"
            fetchDetails={true}
            GooglePlacesSearchQuery={{
              rankby: "distance",
            }}
            onPress={(data, details = null) => {
              setEnd({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }}
            query={query}
            styles={{
              textInput: {
                backgroundColor: COLORS.gray2,
              },
              container: {
                flex: 0,
                position: "absolute",
                width: "100%",
                zIndex: 1,
                top: 50,
              },
              listView: { backgroundColor: "white" },
            }}
          />
        </View>

        <View
          style={{
            width: "15%",
          }}
        >
          <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
            <Image
              source={icons.search}
              resizeMode="contain"
              style={styles.searchBtnImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <MapView
        ref={mapRef}
        style={{
          marginTop: SIZES.small,
          flex: 1,
          zIndex: -1,
        }}
        provider={PROVIDER_GOOGLE}
        initialRegion={currentLocation}
      >
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
        ></Marker>
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

export default Tracking;
