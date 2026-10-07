import { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { sendEmailVerification } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { authError } from '../services/authErrors';
import { Button } from '../components/Button';
import { ui } from '../theme';
export function VerifyEmailScreen() {
 const { user, refresh, logout } = useAuth();
 const [busy, setBusy] = useState(false); const [message, setMessage] = useState('');
 const [sentAt, setSentAt] = useState(0);
 async function act(kind: 'send' | 'check' | 'logout') {
  if (busy) return; setBusy(true); setMessage('');
  try {
   if (kind === 'logout') await logout();
   else if (kind === 'check') { await refresh(); setMessage('Если адрес ещё не подтверждён, откройте ссылку в письме и проверьте снова.'); }
   else if (user) {
    if (Date.now() - sentAt < 60000) setMessage('Повторное письмо можно запросить через минуту.');
    else { await sendEmailVerification(user); setSentAt(Date.now()); setMessage('Письмо отправлено. Проверьте входящие и папку «Спам».'); }
   }
  } catch (e) { setMessage(authError(e)); } finally { setBusy(false); }
 }
 return <ScrollView contentContainerStyle={[ui.page, { justifyContent: 'center' }]}><Text style={ui.title}>Подтвердите email</Text><Text style={ui.text}>{user?.email}</Text><Text style={ui.muted}>Нажмите «Отправить письмо», откройте ссылку в почте, затем вернитесь и нажмите «Я подтвердил email».</Text>
 {!!message && <Text style={ui.text}>{message}</Text>}<Button disabled={busy} title="Отправить письмо" onPress={() => { void act('send'); }} /><Button disabled={busy} title="Я подтвердил email" onPress={() => { void act('check'); }} /><Button disabled={busy} secondary title="Выйти / другой аккаунт" onPress={() => { void act('logout'); }} /></ScrollView>;
}
