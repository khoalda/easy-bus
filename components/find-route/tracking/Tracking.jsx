import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { View, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { COLORS, SIZES, icons } from "../../../constants";
import styles from "./Tracking.style";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const Tracking = ({ initialEnd }) => {
  const mapRef = useRef(null);
  const router = useRouter();
  const endAutocompleteRef = useRef(null);
  const startAutocompleteRef = useRef(null);

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

  useEffect(() => {
    startAutocompleteRef.current?.setAddressText('[Vị trí hiện tại]');
    setStart({
      latitude: parseFloat(currentLocation.latitude),
      longitude: parseFloat(currentLocation.longitude),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  }, [currentLocation])

  useEffect(() => {
    if (initialEnd) {
      endAutocompleteRef.current?.setAddressText(initialEnd);
      endAutocompleteRef.current?.focus();
    }
  }, [initialEnd]);

  const query = {
    key: "AIzaSyA8ROCsmNXGSZBUce4DDh2QVFDmMVhmi4g",
    language: "vi",
    types: "establishment",
    radius: 30000,
    components: 'country:vn',
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
      setCurrentLocation({
        latitude: parseFloat(location.coords.latitude),
        longitude: parseFloat(location.coords.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const [predefinedStart, setPredefinedStart] = useState([]);

  useEffect(() => {
    setPredefinedStart([
      {
        description: "[Vị trí hiện tại]",
        geometry: {
          location: { lat: parseFloat(currentLocation.latitude), lng: parseFloat(currentLocation.longitude) },
        },
      },
    ]);
  }, [currentLocation]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(currentLocation, 100);
    }
  }, [currentLocation]);

  return (
    <View style={styles.mapContainer}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: SIZES.small,
          marginBottom: SIZES.small,
          gap: 5,
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
                latitude: parseFloat(details.geometry.location.lat),
                longitude: parseFloat(details.geometry.location.lng),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }}
            query={query}
            ref={startAutocompleteRef}
            predefinedPlaces={predefinedStart}
            predefinedPlacesAlwaysVisible={true}
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
              listView: { backgroundColor: "white", top: 50 },
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
                latitude: parseFloat(details.geometry.location.lat),
                longitude: parseFloat(details.geometry.location.lng),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }}
            query={query}
            ref={endAutocompleteRef}
            predefinedPlaces={predefinedStart}
            // predefinedPlacesAlwaysVisible={true}
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
            latitude: parseFloat(currentLocation.latitude),
            longitude: parseFloat(currentLocation.longitude),
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
