import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./Welcome.style";
import { icons, SIZES } from "../../../constants";
import { allStops } from "../../../constants/mockData";

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const [matchingStops, setMatchingStops] = useState([]);
  const [showMatchingStops, setShowMatchingStops] = useState(false);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeMessage}>Xin chào!</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => {
              setSearchTerm(text);
              // setMatchingStops(
              //   allStops.filter((stop) =>
              //     stop.toLowerCase().includes(text.toLowerCase())
              //   )
              // );
              // setShowMatchingStops(text !== "" && matchingStops.length > 0);
            }}
            placeholder="Bạn muốn đi đến đâu?"
          />

          {/* {showMatchingStops && (
            <FlatList
              data={matchingStops}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.matchingStopItem}
                  onPress={() => {
                    setSearchTerm(item);
                    setMatchingStops([]);
                    setShowMatchingStops(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.ID}
              style={styles.matchingStopsList}
            />
          )} */}
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
