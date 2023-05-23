import { Image, TouchableOpacity } from "react-native";

import styles from "./Screenheader.style";

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress, margin }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode='cover'
        style={margin ? styles.btnImgWithMargin(dimension) : styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
