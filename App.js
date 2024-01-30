import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import HomeScreen from "./screen/Home.screen";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <HomeScreen />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
