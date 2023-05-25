import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 200,
    padding: SIZES.xLarge,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    flex: 1,
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  heading: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  text: {
    fontSize: SIZES.small,
    color: "#FFF",
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  jobName: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  infoWrapper: {
    flexDirection: "column",
    marginTop: 5,
    justifyContent: "flex-start",
  },
  publisher: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: COLORS.primary,
  },
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;
