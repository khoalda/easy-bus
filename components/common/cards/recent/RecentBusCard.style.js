import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: (selectedBus, item) => ({
    width: 250,
    padding: SIZES.xLarge,
    backgroundColor: selectedBus === item.id ? COLORS.primary : "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  logoContainer: (selectedBus, item) => ({
    width: 50,
    height: 50,
    backgroundColor: selectedBus === item.id ? "#FFF" : COLORS.white,
    borderRadius: SIZES.medium,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }),
  logImage: {
    fontWeight: 900,
    fontSize: 20,
    color: COLORS.tertiary
  },
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  jobName: (selectedBus, item) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: selectedBus === item.id ? COLORS.white : COLORS.primary,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (selectedBus, item) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: selectedBus === item.id ? COLORS.white : COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;
