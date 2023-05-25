import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: 250,
    maxHeight: 200,
    padding: SIZES.xLarge,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  heading: {
    fontSize: SIZES.large,
  },
});

export default styles;
