import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "./Welcome.style";
import { icons } from "../../../constants";
import { useRouter } from "expo-router";

const Welcome = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
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
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => {
              setSearchTerm(text);
            }}
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
    </View>
  );
};

export default Welcome;
