import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./Logo.style";
import { icons } from "../../../constants";
import { checkImageURL } from "../../../utils";

const Logo = ({ no }) => {
  return (
    <View style={styles.logoContainer}>
      <View style={styles.logoBox}>
        <Text style={styles.logImage}>{no}</Text>
      </View>
    </View>
  );
};

export default Logo;
