import { Text } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams, TabParams } from '../types';
import { HomeScreen } from '../screens/HomeScreen';
import { TasksScreen } from '../screens/TasksScreen';
import { ScheduleScreen } from '../screens/ScheduleScreen';
import { NewsScreen } from '../screens/NewsScreen';
import { TaskEditorScreen } from '../screens/TaskEditorScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { colors } from '../theme';
const Tab = createBottomTabNavigator<TabParams>();
const Stack = createNativeStackNavigator<RootStackParams>();
const symbols: Record<keyof TabParams, string> = { Home: '⌂', Tasks: '✓', Schedule: '▦', News: '≡', Profile: '○' };
function Tabs() {
 return <Tab.Navigator screenOptions={({ route }) => ({ headerTitle: 'Campus Hub', headerTitleStyle: { fontWeight: '800' }, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.muted, tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 25 }}>{symbols[route.name]}</Text>, tabBarLabelStyle: { fontSize: 11 }, sceneStyle: { backgroundColor: colors.bg } })}>
  <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Главная' }} />
  <Tab.Screen name="Tasks" component={TasksScreen} options={{ title: 'Задачи' }} />
  <Tab.Screen name="Schedule" component={ScheduleScreen} options={{ title: 'Расписание' }} />
  <Tab.Screen name="News" component={NewsScreen} options={{ title: 'Объявления' }} />
 <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Профиль" }} />
 </Tab.Navigator>;
}
export function AppNavigator() {
 return <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, primary: colors.primary, background: colors.bg, text: colors.ink } }}>
  <Stack.Navigator><Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} /><Stack.Screen name="TaskEditor" component={TaskEditorScreen} options={{ title: 'Задача', headerBackTitle: 'Назад' }} /></Stack.Navigator>
 </NavigationContainer>;
}
