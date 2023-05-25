import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    // width: 250,
    maxHeight: 200,
    padding: SIZES.xLarge,
    backgroundColor: COLORS.gray2,
    alignItems: "flex-start",
    borderRadius: SIZES.medium,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    marginTop: 10
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    // flex: 0,
    flexDirection: "row",
  },
  pathContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ticketContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: SIZES.small,
    backgroundColor: COLORS.tertiary,
    padding: SIZES.small,
  },
  nameContainer: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  image: {
    width: 160,
    resizeMode: "contain",
  },
  imageContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
  },
});

export default styles;
