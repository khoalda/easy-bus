import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import React, { useState } from "react";
import styles from "./SearchBusBox.style";
import { icons } from "../../../constants";

const SearchBusBox = () => {
  const handleClick = () => {};
  const [search, setSearch] = useState("");
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder="Nhập số tuyến"
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

export default SearchBusBox;
