import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { ExpensesProvider } from './src/context/expensesContext';
import { ThemeProvider, ThemeContext } from './src/context/themeContext';
import Home from './src/screens/Home';
import Insights from './src/screens/Insights';
import Settings from './src/screens/Settings';
import EditProfile from './src/components/EditProfile';

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const BottomTabScreen = () => {
    const { theme, isDarkMode } = useContext(ThemeContext);

    return (
      <ExpensesProvider>
        <Tab.Navigator
          screenOptions={{
            tabBarInactiveTintColor: theme.color,
            tabBarStyle: isDarkMode ? { backgroundColor: theme.backgroundColor } : undefined,
            tabBarLabelStyle: isDarkMode && { fontWeight: 'bold' },
            headerTintColor: theme.color,
            headerStyle: {
              backgroundColor: theme.backgroundColor,
            }
          }}
        >
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
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Bottom" component={BottomTabScreen} />
          <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: 'Edit Profile' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
