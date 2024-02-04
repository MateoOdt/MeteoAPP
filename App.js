import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider } from "react-native-paper";
import WeatherScreen from "./src/screen/WeatherScreen";
import HomeScreen from "./src/screen/Home.screen";
import { FeedBack } from "./src/screen/Feedback.screen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Weather" component={WeatherScreen} />
          <Stack.Screen name="Feedback" component={FeedBack} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
