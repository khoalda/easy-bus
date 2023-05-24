import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text, Platform } from "react-native";

import * as Location from "expo-location";
import { COLORS } from "../../../constants";
import styles from "./Tracking.style";

const Tracking = () => {
    const mapRef = React.useRef(null);

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [pin, setPin] = React.useState({
        latitude: 10.762622,
        longitude: 106.660172,
    });

    points = [{ latitude: 10.774031, longitude: 106.661346 },
    { latitude: 10.774031, longitude: 106.661346 },
    { latitude: 10.77403069, longitude: 106.66134644 },
    { latitude: 10.77383137, longitude: 106.66155243 },
    { latitude: 10.77328777, longitude: 106.6611557 },
    { latitude: 10.7733240127563, longitude: 106.661125183105 },
    { latitude: 10.7733240127563, longitude: 106.661125183105 },
    { latitude: 10.77332211, longitude: 106.66112518 },
    { latitude: 10.7732935, longitude: 106.66116333 },
    { latitude: 10.772645, longitude: 106.66065216 },
    { latitude: 10.77230835, longitude: 106.66030884 },
    { latitude: 10.77176762, longitude: 106.65971375 },
    { latitude: 10.77122784, longitude: 106.65911865 },
    { latitude: 10.7712259292603, longitude: 106.659118652344 },
    { latitude: 10.7712259292603, longitude: 106.659118652344 },
    { latitude: 10.770813945, longitude: 106.65865326 },
    { latitude: 10.77040005, longitude: 106.65818787 },
    { latitude: 10.7711184833333, longitude: 106.657992046667 },
    { latitude: 10.7718369166667, longitude: 106.657796223333 },
    { latitude: 10.77255535, longitude: 106.6576004 },
    { latitude: 10.77260303, longitude: 106.65769958 },
    { latitude: 10.7726030349731, longitude: 106.657699584961 },
    { latitude: 10.7726030349731, longitude: 106.657699584961 },
    { latitude: 10.77255058, longitude: 106.65757751 },
    { latitude: 10.773334692, longitude: 106.657357784 },
    { latitude: 10.774118804, longitude: 106.657138058 },
    { latitude: 10.774902916, longitude: 106.656918332 },
    { latitude: 10.775687028, longitude: 106.656698606 },
    { latitude: 10.77647114, longitude: 106.65647888 },
    { latitude: 10.77648735, longitude: 106.65662384 },
    { latitude: 10.7764863967896, longitude: 106.656623840332 },
    { latitude: 10.7764863967896, longitude: 106.656623840332 },
    { latitude: 10.77643967, longitude: 106.65649414 },
    { latitude: 10.7772194566667, longitude: 106.656277973333 },
    { latitude: 10.7779992433333, longitude: 106.656061806667 },
    { latitude: 10.77877903, longitude: 106.65584564 },
    { latitude: 10.7787990570068, longitude: 106.655914306641 },
    { latitude: 10.7787990570068, longitude: 106.655914306641 },
    { latitude: 10.77880001, longitude: 106.65591431 },
    { latitude: 10.77875805, longitude: 106.65583038 },
    { latitude: 10.77952385, longitude: 106.655614213333 },
    { latitude: 10.78028965, longitude: 106.655398046667 }
    ];

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
                            latitude: point.latitude,
                            longitude: point.longitude,
                        }}
                    />
                ))}

            </MapView>
        </View>
    );
};

export default Tracking;