import { ScrollView, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParams } from '../types';
import { useTasks } from '../context/TasksContext';
import { Button } from '../components/Button';
import { colors, ui } from '../theme';
export function HomeScreen({ navigation }: BottomTabScreenProps<TabParams, 'Home'>) {
 const { tasks, loading, error } = useTasks();
 const done = tasks.filter(task => task.done === 1).length;
 return <ScrollView contentContainerStyle={ui.page}>
  <Text style={ui.muted}>ТВОЙ УЧЕБНЫЙ ДЕНЬ</Text><Text style={ui.title}>Всё важное рядом</Text>
  <Text style={ui.text}>Планируй дела, следи за расписанием и читай объявления.</Text>
  <View style={[ui.card, { backgroundColor: colors.primary }]}>
   <Text style={{ color: 'white', fontSize: 18 }}>Мой прогресс</Text>
   <Text style={{ color: 'white', fontSize: 38, fontWeight: '800' }}>{loading ? '…' : `${done} / ${tasks.length}`}</Text>
   <Text style={{ color: '#E2E7FF' }}>задач выполнено</Text>
  </View>
  {!!error && <Text style={ui.error}>{error}</Text>}
  <View style={ui.card}><Text style={ui.heading}>Что нужно сделать?</Text><Text style={ui.muted}>Добавь первую задачу или продолжи начатое.</Text><Button title="Открыть задачи" onPress={() => navigation.navigate('Tasks')} /></View>
  <View style={ui.card}><Text style={ui.heading}>Учёба под рукой</Text><Button title="Расписание занятий" secondary onPress={() => navigation.navigate('Schedule')} /><Button title="Объявления" secondary onPress={() => navigation.navigate('News')} /></View>
 </ScrollView>;
}
