import { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TextInput, View } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams, TabParams } from '../types';
import { useTasks } from '../context/TasksContext';
import { Button } from '../components/Button';
import { TaskCard } from '../components/TaskCard';
import { ui } from '../theme';
type Props = CompositeScreenProps<BottomTabScreenProps<TabParams, 'Tasks'>, NativeStackScreenProps<RootStackParams>>;
export function TasksScreen({ navigation }: Props) {
 const { tasks, loading, busy, error, reload, toggle, remove } = useTasks();
 const [query, setQuery] = useState('');
 const [filter, setFilter] = useState<'Все' | 'В работе' | 'Готово'>('Все');
 const visible = tasks.filter(t => `${t.title} ${t.subject}`.toLowerCase().includes(query.toLowerCase()) && (filter === 'Все' || (filter === 'Готово' ? t.done === 1 : t.done === 0)));
 return <FlatList contentContainerStyle={ui.page} data={visible} keyExtractor={t => String(t.id)} keyboardShouldPersistTaps="handled"
  ListHeaderComponent={<View style={{ gap: 14 }}><Text style={ui.title}>Мои задачи</Text><Button title="+ Добавить задачу" disabled={loading || busy || !!error} onPress={() => navigation.navigate('TaskEditor')} />
   <TextInput accessibilityLabel="Поиск задач" style={ui.input} placeholder="Поиск по задаче или предмету" value={query} onChangeText={setQuery} />
   <View style={ui.row}>{(['Все', 'В работе', 'Готово'] as const).map(f => <Button key={f} title={f} secondary={filter !== f} onPress={() => setFilter(f)} />)}</View>
   {loading && <ActivityIndicator />}{!!error && <><Text style={ui.error}>{error}</Text><Button title="Повторить загрузку" disabled={busy} onPress={() => { void reload(); }} /></>}
  </View>}
  ListEmptyComponent={!loading ? <Text style={ui.muted}>{tasks.length ? 'По вашему запросу ничего не найдено.' : 'Задач пока нет. Добавьте первую.'}</Text> : null}
  renderItem={({ item }) => <TaskCard task={item} busy={busy || loading} onEdit={() => navigation.navigate('TaskEditor', { taskId: item.id })} onToggle={() => { void toggle(item.id); }} onDelete={() => Alert.alert('Удалить задачу?', item.title, [{ text: 'Отмена', style: 'cancel' }, { text: 'Удалить', style: 'destructive', onPress: () => { void remove(item.id); } }])} />}
 />;
}
