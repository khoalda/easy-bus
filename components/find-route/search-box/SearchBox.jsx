import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import React, { useState } from "react";
import styles from "./SearchBox.style";
import { useRouter, Link } from "expo-router";
import { icons } from "../../../constants";

const SearchBox = () => {
  const router = useRouter();

  const handleClick = () => router.push(`find-route/recommendation`)

  const [destination, setDestination] = useState("");
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          value={destination}
          onChangeText={(text) => setDestination(text)}
          placeholder="Bạn muốn đi đến đâu?"
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
  );
};

export default SearchBox;
