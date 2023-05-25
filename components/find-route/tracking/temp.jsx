import React, { useState, useEffect, useRef } from "react";
import MapView, {
  Marker,
  Circle,
  PROVIDER_GOOGLE,
  Polyline,
} from "react-native-maps";
import { View, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { COLORS, icons, FONT, SIZES } from "../../../constants";
import styles from "./Tracking.style";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Image } from "react-native";

const API_KEY = "AIzaSyA8ROCsmNXGSZBUce4DDh2QVFDmMVhmi4g";

const Tracking = () => {
  const mapRef = React.useRef(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [pin, setPin] = React.useState({
    latitude: 10.762622,
    longitude: 106.660172,
  });

  const [currentRegion, setCurrentRegion] = useState({
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
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setCurrentRegion({
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
        mapRef.current.animateToRegion(currentRegion, 100); // 100 là thời gian (ms) để di chuyển đến vùng
      }
      console.log(location);
      console.log(currentRegion);
    })();
  }, []);

  const handleClick = () => {};

  return (
    <View
      style={{
        marginTop: SIZES.small,
        flex: 1,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginTop: SIZES.small,
          marginBottom: SIZES.small,
          height: 80,
        }}
      >
        <View
          style={{
            flex: 1,
            marginRight: SIZES.small,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: SIZES.medium,
            height: "100%",
          }}
        >
          <GooglePlacesAutocomplete
            placeholder="Nhập điểm đi"
            fetchDetails={true}
            GooglePlacesSearchQuery={{
              rankby: "distance",
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
              setStart({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }}
            query={{
              key: API_KEY,
              language: "vi",
              types: "establishment",
              radius: 30000,
              location: `${currentRegion.latitude}, ${currentRegion.longitude}`,
            }}
            styles={{
              container: {
                flex: 1,
              },
              textInputContainer: {
                backgroundColor: "#fff",
                borderTopWidth: 0,
                borderBottomWidth: 0,
                width: "100%",
              },
              textInput: {
                backgroundColor: "#eee",
                color: "#000",
                height: 38,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0,
                paddingLeft: 15,
                paddingRight: 15,
                fontSize: 16,
                zIndex: 1,
              },
              listView: {
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#ddd",
                marginHorizontal: 0,
                elevation: 1,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowOffset: { x: 0, y: 0 },
                shadowRadius: 15,
                marginTop: 10,
                zIndex: 9999,
                position: "absolute",
                top: 38,
              },
              description: {
                fontSize: 16,
              },
              row: {
                padding: 20,
                height: 58,
              },
            }}
          />
          <GooglePlacesAutocomplete
            placeholder="Nhập điểm đến"
            fetchDetails={true}
            GooglePlacesSearchQuery={{
              rankby: "distance",
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
              setEnd({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }}
            query={{
              key: API_KEY,
              language: "vi",
              types: "establishment",
              radius: 30000,
              location: `${currentRegion.latitude}, ${currentRegion.longitude}`,
            }}
            styles={{
              container: {
                flex: 1,
              },
              textInputContainer: {
                backgroundColor: "#fff",
                borderTopWidth: 0,
                borderBottomWidth: 0,
                width: "100%",
              },
              textInput: {
                backgroundColor: "#eee",
                color: "#000",
                height: 38,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0,
                paddingLeft: 15,
                paddingRight: 15,
                fontSize: 16,
              },
              listView: {
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#ddd",
                marginHorizontal: 0,
                elevation: 1,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowOffset: { x: 0, y: 0 },
                shadowRadius: 15,
                marginTop: 10,
                zIndex: 9999,
                position: "absolute",
                top: 38,
              },
              description: {
                fontSize: 16,
              },
              row: {
                padding: 20,
                height: 58,
              },
            }}
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <MapView
        ref={mapRef}
        style={{
          marginTop: SIZES.small,
          flex: 1,
          zIndex: 0,
          //   position: "absolute"
        }}
        provider={PROVIDER_GOOGLE}
        initialRegion={currentRegion}
      >
        <Marker
          coordinate={{
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude,
          }}
        ></Marker>
      </MapView>
    </View>
  );
};

export default Tracking;
