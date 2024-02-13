import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Home from './src/screens/Home';
import Insights from './src/screens/Insights';
import Settings from './src/screens/Settings';
import { ExpensesProvider } from './src/context/expensesContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ExpensesProvider>
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
    </ExpensesProvider>
  );
}