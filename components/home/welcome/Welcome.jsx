import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "./Welcome.style";
import { COLORS, SIZES, icons } from "../../../constants";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const Welcome = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const [currentLocation, setCurrentLocation] = useState({
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
    components: 'country:vn',
    location: `${currentLocation.latitude}, ${currentLocation.longitude}`,
  };

  const handleClick = () => {
    if (searchTerm) {
      router.push(`/find-route?search=${searchTerm}`);
      setSearchTerm("")
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeMessage}>Xin chào!</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          {/* <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => {
              setSearchTerm(text);
            }}
            placeholder="Bạn muốn đi đến đâu?"
          /> */}
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
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
