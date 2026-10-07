import { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, View } from 'react-native';
import { sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TasksContext';
import { auth } from '../services/firebase';
import { authError } from '../services/authErrors';
import { Button } from '../components/Button';
import { ui } from '../theme';
export function ProfileScreen() {
 const { user, refresh, logout } = useAuth(); const { tasks, busy: taskBusy } = useTasks();
 const [name, setName] = useState(user?.displayName ?? '');
 const [busy, setBusy] = useState(false); const [message, setMessage] = useState('');
 async function act(kind: 'save' | 'reset' | 'logout') {
  if (!user || busy) return;
  if (kind === 'save' && name.trim().length < 2) { setMessage('Введите имя: минимум 2 символа.'); return; }
  setBusy(true); setMessage('');
  try {
   if (kind === 'logout') await logout();
   else if (kind === 'save') { await updateProfile(user, { displayName: name.trim() }); await refresh(); setMessage('Имя сохранено.'); }
   else if (user.email) { await sendPasswordResetEmail(auth, user.email); setMessage('Проверьте почту: отправлена ссылка для смены пароля.'); }
  } catch (e) { setMessage(authError(e)); } finally { setBusy(false); }
 }
 return <ScrollView contentContainerStyle={ui.page} keyboardShouldPersistTaps="handled"><Text style={ui.title}>Профиль студента</Text>
 <View style={ui.card}><Text style={ui.label}>Email</Text><Text style={ui.text}>{user?.email}</Text><Text style={ui.muted}>Email подтверждён</Text><Text style={ui.label}>Имя</Text><TextInput editable={!busy} style={ui.input} value={name} onChangeText={setName} maxLength={80} /><Button disabled={busy} title="Сохранить имя" onPress={() => { void act('save'); }} /></View>
 <Text style={ui.text}>Мои задачи: {tasks.length}. Выполнено: {tasks.filter(t => t.done === 1).length}.</Text>
 <Text style={ui.muted}>Задачи этого аккаунта хранятся на текущем устройстве. Синхронизация между телефонами не включена.</Text>
 {!!message && <Text style={ui.text}>{message}</Text>}
 <Button disabled={busy} secondary title="Сменить пароль через почту" onPress={() => { void act('reset'); }} />
 <Button disabled={busy || taskBusy} danger title="Выйти из аккаунта" onPress={() => Alert.alert('Выйти?', 'Локальные задачи сохранятся для следующего входа.', [{ text: 'Отмена', style: 'cancel' }, { text: 'Выйти', onPress: () => { void act('logout'); } }])} />
 </ScrollView>;
}
