import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native-paper";

export const FeedbackElement = ({ img, label }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image source={img} style={styles.img} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 100,
  },
  container: {
    backgroundColor: "rgba(1,1,1, 0.3)",
    height: 100,
    width: 100,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 80,
    height: 80,
  },
  label: {
    color: "#FFF",
    textAlign: "center",
    marginTop: 20,
    fontWeight: 500,
  },
});
