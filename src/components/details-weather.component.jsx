import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native-paper";
export const DetailWeather = ({ label, value, img, unit }) => {
  return (
    <View style={styles.container}>
      <Image source={img} style={styles.infoImage} />
      <Text style={styles.value}>
        {value} {unit}
      </Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 115,
    width: 115,
    backgroundColor: "rgba(102, 98, 185, 0.2)",
    alignItems: "center",
    marginBottom: 10,
  },
  infoImage: {
    width: 40,
    height: 40,
    marginBottom: 10,
    marginTop: 15,
  },
  value: {
    color: "#FFF",
    fontWeight: "700",
  },
  label: {
    color: "#FFF",
  },
});
