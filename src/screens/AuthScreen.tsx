import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';
import { authError, validEmail, validPassword } from '../services/authErrors';
import { Button } from '../components/Button';
import { ui } from '../theme';
export function AuthScreen() {
 const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login');
 const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
 const [repeat, setRepeat] = useState(''); const [name, setName] = useState('');
 const [show, setShow] = useState(false); const [busy, setBusy] = useState(false);
 const [message, setMessage] = useState(''); const [error, setError] = useState('');
 const locked = useRef(false);
 function switchMode(next: typeof mode) { setMode(next); setError(''); setMessage(''); setPassword(''); setRepeat(''); }
 async function submit() {
  if (locked.current) return;
  setError(''); setMessage('');
  if (!validEmail(email)) { setError('Введите корректный email.'); return; }
  if (mode !== 'reset' && !password) { setError('Введите пароль.'); return; }
  if (mode === 'register') {
   if (name.trim().length < 2) { setError('Введите имя: минимум 2 символа.'); return; }
   if (!validPassword(password)) { setError('Пароль: минимум 8 символов, латинские заглавная и строчная буквы и цифра.'); return; }
   if (password !== repeat) { setError('Пароли не совпадают.'); return; }
  }
  locked.current = true; setBusy(true);
  try {
   if (mode === 'reset') {
    await sendPasswordResetEmail(auth, email.trim());
    setMessage('Если для этого email доступно восстановление, письмо будет отправлено. Проверьте входящие и спам.');
   } else if (mode === 'login') await signInWithEmailAndPassword(auth, email.trim(), password);
   else {
    const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
    // Имя можно также изменить в профиле, если этот запрос прервётся.
    await updateProfile(result.user, { displayName: name.trim() });
   }
  } catch (e) { setError(authError(e)); }
  finally { locked.current = false; setBusy(false); }
 }
 return <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
 <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[ui.page, { paddingTop: 32 }]}>
  <Text style={ui.muted}>CAMPUS HUB</Text><Text style={ui.title}>{mode === 'login' ? 'Добро пожаловать' : mode === 'register' ? 'Создать аккаунт' : 'Восстановить пароль'}</Text>
  {mode === 'register' && <><Text style={ui.label}>Имя студента</Text><TextInput editable={!busy} style={ui.input} value={name} onChangeText={setName} placeholder="Имя и фамилия" maxLength={80} /></>}
  <Text style={ui.label}>Email</Text><TextInput editable={!busy} style={ui.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} placeholder="student@example.com" maxLength={254} />
  {mode !== 'reset' && <><Text style={ui.label}>Пароль</Text><TextInput editable={!busy} style={ui.input} value={password} onChangeText={setPassword} secureTextEntry={!show} autoCapitalize="none" autoCorrect={false} maxLength={128} placeholder="Введите пароль" />
   <Button disabled={busy} title={show ? 'Скрыть пароль' : 'Показать пароль'} secondary onPress={() => setShow(!show)} /></>}
  {mode === 'register' && <><Text style={ui.muted}>Минимум 8 символов: латинские заглавная и строчная буквы, цифра.</Text><Text style={ui.label}>Повтор пароля</Text><TextInput editable={!busy} style={ui.input} value={repeat} onChangeText={setRepeat} secureTextEntry={!show} autoCapitalize="none" autoCorrect={false} maxLength={128} /></>}
  {!!error && <Text accessibilityRole="alert" style={ui.error}>{error}</Text>}{!!message && <Text style={ui.text}>{message}</Text>}
  <Button disabled={busy} title={busy ? 'Подождите…' : mode === 'login' ? 'Войти' : mode === 'register' ? 'Зарегистрироваться' : 'Отправить письмо'} onPress={() => { void submit(); }} />
  <View style={{ gap: 10 }}>
   <Button disabled={busy} secondary title={mode === 'login' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'} onPress={() => switchMode(mode === 'login' ? 'register' : 'login')} />
   {mode === 'login' && <Button disabled={busy} secondary title="Забыли пароль?" onPress={() => switchMode('reset')} />}
  </View>
 </ScrollView></KeyboardAvoidingView>;
}
