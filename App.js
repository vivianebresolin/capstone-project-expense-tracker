import { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import Home from './src/screens/Home';
import Insights from './src/screens/Insights';
import Settings from './src/screens/Settings';

SplashScreen.preventAutoHideAsync();
const Tab = createBottomTabNavigator();

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDataLoaded(true)
    }, 4000)
    SplashScreen.hideAsync();
  }, []);

  if (!isDataLoaded) {
    return (
      <View style={styles.loadingIndicatorContainer}>
        <ActivityIndicator size="large" color="#0076FF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => {
              return (
                <Entypo name="home" size={24} color={color} />
              );
            }
          }}
        />
        <Tab.Screen
          name="Insights"
          component={Insights}
          options={{
            title: 'Insights',
            tabBarIcon: ({ color }) => {
              return (
                <Ionicons name="stats-chart" size={24} color={color} />
              );
            }
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => {
              return (
                <Ionicons name="settings-sharp" size={24} color={color} />
              );
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});