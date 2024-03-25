import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Home from './src/screens/Home';
import Insights from './src/screens/Insights';
import Settings from './src/screens/Settings';
import { ExpensesProvider } from './src/context/expensesContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfile from './src/components/EditProfile';

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const BottomTabScreen = () => {
    return (
      <ExpensesProvider>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => (
                <Entypo name="home" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Insights"
            component={Insights}
            options={{
              title: 'Insights',
              tabBarIcon: ({ color }) => (
                <Ionicons name="stats-chart" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              title: 'Settings',
              tabBarIcon: ({ color }) => (
                <Ionicons name="settings-sharp" size={24} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </ExpensesProvider>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Bottom" component={BottomTabScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{title:'Edit Profile'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
