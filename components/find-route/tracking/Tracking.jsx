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
import { useFetch } from "../../../hook/useFetch";

const Tracking = ({ points, path }) => {
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

  const [region1, setRegion1] = useState({
    latitude: 10.762622,
    longitude: 106.660172,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [region2, setRegion2] = useState({
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
    location: `${region.latitude}, ${region.longitude}`,
  };

  const handleClick = () => {};

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
    })();
  }, []);

  useEffect(() => {
    console.log("start: ", region1);
  }, [region1]);

  useEffect(() => {
    console.log("end: ", region2);
  }, [region2]);

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
              setRegion1({
                latitude: parseFloat(details.geometry.location.lat),
                longitude: parseFloat(details.geometry.location.lng),
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
              setRegion2({
                latitude: parseFloat(details.geometry.location.lat),
                longitude: parseFloat(details.geometry.location.lng),
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
        initialRegion={region}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(region.latitude), // Parse the latitude value to a float
            longitude: parseFloat(region.longitude), // Parse the longitude value to a float
          }}
        ></Marker>

        {points.map((point, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(point.Lat), // Parse the latitude value to a float
              longitude: parseFloat(point.Lng), // Parse the longitude value to a float
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
    </View>
  );
};

export default Tracking;
