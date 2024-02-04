import { View } from "react-native";
import { Text } from "react-native-paper";
import { ImageBackground } from "react-native";
import { StyleSheet } from "react-native";
import { FeedbackElement } from "../components/feedback-element.component";

export const FeedBack = () => {
  const feedBackElements = [
    {
      label: "Suuny",
      img: require("../assets/01d.png"),
    },
    {
      label: "Few Clouds",
      img: require("../assets/02d.png"),
    },
    {
      label: "Scattered Clouds",
      img: require("../assets/03d.png"),
    },
    {
      label: "Broken Clouds",
      img: require("../assets/04d.png"),
    },
    {
      label: "Drizzle Rain",
      img: require("../assets/09d.png"),
    },
    {
      label: "Light Intensity Drizzle",
      img: require("../assets/10d.png"),
    },
    {
      label: "Thunderstorm",
      img: require("../assets/11d.png"),
    },
    {
      label: "Snow",
      img: require("../assets/13d.png"),
    },
    {
      label: "Mist / Smoke",
      img: require("../assets/50d.png"),
    },
  ];

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={styles.container}
    >
      <View>
        <Text style={styles.title}>
          Your feedback can help everyone see more accurate weather conditions!
        </Text>
        <View style={styles.elementContainer}>
          {feedBackElements.map((element) => (
            <FeedbackElement
              img={element.img}
              label={element.label}
              key={element.label}
            />
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    paddingLeft: 20,
  },
  title: {
    color: "#FFF",
    marginTop: 20,
    fontWeight: 600,
    fontSize: 16,
  },
  elementContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
    marginTop: 30,
  },
});

export default FeedBack;
