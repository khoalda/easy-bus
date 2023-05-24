import { View, Text } from "react-native";
import styles from "./Specifics.style";
import useFetch from "../../../hook/useFetch";

const Specifics = ({ title, varId, routeVarId }) => {
  const { data, isLoading, error, refetch } = useFetch(
    `stops/${varId}/${routeVarId}`
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}:</Text>

      {/* TODO: add loadings */}
      {title === "Các trạm đi qua" ? (
        <View style={styles.pointsContainer}>
          {data?.map((item, index) => (
            <View style={styles.pointWrapper} key={index}>
              <View style={styles.pointDot} />
              <Text style={styles.pointText}>{item.Name}</Text>
            </View>
          ))}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default Specifics;
