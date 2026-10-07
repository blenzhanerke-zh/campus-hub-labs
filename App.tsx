import { Component, ErrorInfo, ReactNode } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TasksProvider } from './src/context/TasksContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { AuthScreen } from './src/screens/AuthScreen';
import { VerifyEmailScreen } from './src/screens/VerifyEmailScreen';
import { ui } from './src/theme';
class AppErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
 state = { failed: false };
 static getDerivedStateFromError() { return { failed: true }; }
 componentDidCatch(error: Error, info: ErrorInfo) { console.error(error, info.componentStack); }
 render() { return this.state.failed ? <View style={[ui.page, { justifyContent: 'center' }]}><Text style={ui.heading}>Не удалось открыть приложение</Text><Text style={ui.text}>Перезагрузите проект через Expo Go. Подробности ошибки доступны в терминале компьютера.</Text></View> : this.props.children; }
}
function Session() {
 const { user, ready } = useAuth();
 if (!ready) return <View style={[ui.page, { justifyContent: 'center' }]}><ActivityIndicator /><Text style={ui.text}>Проверка входа…</Text></View>;
 if (!user) return <SafeAreaView style={{ flex: 1 }}><AuthScreen /></SafeAreaView>;
 if (!user.emailVerified) return <SafeAreaView style={{ flex: 1 }}><VerifyEmailScreen /></SafeAreaView>;
 return <TasksProvider key={user.uid}><AppNavigator /></TasksProvider>;
}
export default function App() {
 return <SafeAreaProvider><AppErrorBoundary><AuthProvider><StatusBar style="dark" /><Session /></AuthProvider></AppErrorBoundary></SafeAreaProvider>;
}
