import React, { useState, useEffect, useRef } from "react";
import MapView, {
    Marker,
    Circle,
    PROVIDER_GOOGLE,
    Polyline,
} from "react-native-maps";
import { StyleSheet, View, Text, Platform } from "react-native";
import * as Location from "expo-location";
import { COLORS } from "../../../constants";
import styles from "./Tracking.style";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"

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
            <GooglePlacesAutocomplete
                placeholder="Search"
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                    rankby: "distance"
                }}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details)
                    setRegion({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    })
                }}
                query={{
                    key: "AIzaSyA8ROCsmNXGSZBUce4DDh2QVFDmMVhmi4g",
                    language: "vi",
                    types: "establishment",
                    radius: 30000,
                    location: `${region.latitude}, ${region.longitude}`
                }}
                styles={{
                    container: {
                        flex: 0,
                        position: "absolute",
                        width: "100%",
                        zIndex: 1
                    },
                    listView: { backgroundColor: "white" }
                }}
            />

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

                {points.map((point, index) => (
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
        </View>
    );
};

export default Tracking;
