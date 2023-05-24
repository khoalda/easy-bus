import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  logoContainer: {
    marginVertical: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoBox: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: SIZES.large,
  },
  logImage: {
    fontWeight: 900,
    fontSize: 42,
    color: COLORS.tertiary
  },
});

export default styles;
