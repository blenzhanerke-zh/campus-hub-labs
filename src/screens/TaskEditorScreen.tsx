import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Priority, RootStackParams } from '../types';
import { useTasks } from '../context/TasksContext';
import { Button } from '../components/Button';
import { ui } from '../theme';
export function TaskEditorScreen({ route, navigation }: NativeStackScreenProps<RootStackParams, 'TaskEditor'>) {
 const { tasks, save, busy, error } = useTasks();
 const id = route.params?.taskId;
 const task = tasks.find(t => t.id === id);
 const [title, setTitle] = useState(task?.title ?? '');
 const [subject, setSubject] = useState(task?.subject ?? '');
 const [priority, setPriority] = useState<Priority>(task?.priority ?? 'Обычный');
 const [validation, setValidation] = useState('');
 async function submit() {
  if (!title.trim()) { setValidation('Введите название задачи.'); return; }
  setValidation('');
  if (await save({ title, subject, priority }, id)) navigation.goBack();
 }
 if (id !== undefined && !task) return <View style={ui.page}><Text style={ui.error}>Задача не найдена.</Text></View>;
 return <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={100}>
  <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={ui.page}>
   <Text style={ui.title}>{id === undefined ? 'Новая задача' : 'Редактирование'}</Text>
   <Text style={ui.label}>Название *</Text><TextInput style={ui.input} accessibilityLabel="Название задачи" placeholder="Подготовить лабораторную №6" value={title} onChangeText={setTitle} maxLength={120} />
   <Text style={ui.label}>Предмет</Text><TextInput style={ui.input} accessibilityLabel="Предмет" placeholder="Мобильные приложения" value={subject} onChangeText={setSubject} maxLength={80} />
   <Text style={ui.label}>Приоритет</Text><View style={ui.row}>{(['Обычный', 'Высокий'] as const).map(p => <Button key={p} title={p} secondary={p !== priority} onPress={() => setPriority(p)} />)}</View>
   {!!validation && <Text style={ui.error}>{validation}</Text>}{!!error && <Text style={ui.error}>{error}</Text>}
   <Button title={busy ? 'Сохранение…' : 'Сохранить задачу'} disabled={busy} onPress={() => { void submit(); }} />
   <Text style={ui.muted}>Задача сохранится на этом устройстве и останется после перезапуска приложения.</Text>
  </ScrollView>
 </KeyboardAvoidingView>;
}
