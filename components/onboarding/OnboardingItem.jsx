import React, { useRef, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  Animated,
} from "react-native";
import Paginator from "../../app/onboarding/Paginator";

export default Onboarding = ({ item, data, scrollX, currentIndex }) => {
  const { width } = useWindowDimensions();
  const opacity = new Animated.Value(0);
  const titleOpacity = new Animated.Value(0);
  const descriptionOpacity = new Animated.Value(0);
  const [animated, setAnimated] = useState(false);

  const fadeIn = (value) => {
    Animated.timing(value, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  React.useEffect(() => {
    if (currentIndex + 1 != parseInt(item.id)) {
      opacity.setValue(0);
      titleOpacity.setValue(0);
      descriptionOpacity.setValue(0);
    } else {
      fadeIn(opacity);
      fadeIn(titleOpacity);
      fadeIn(descriptionOpacity);
    }
  }, [currentIndex]);

  return (
    <View style={(styles.container, { width })}>
      <Animated.Image
        source={item.image}
        style={[styles.image, { resizeMode: "contain", opacity }]}
      />
      <View style={{ flex: 0.3 }}>
        <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
          {item.title}
        </Animated.Text>
        <Animated.Text
          style={[styles.description, { opacity: descriptionOpacity }]}
        >
          {item.description}
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
    alignSelf: "center",
    width: 300,
  },
  title: {
    fontWeight: "800",
    fontSize: 25,
    marginBottom: 10,
    color: "#F28624",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  description: {
    fontWeight: "300",
    fontSize: 18,
    color: "#62656b",
    textAlign: "center",
    paddingHorizontal: 64,
  },
});
