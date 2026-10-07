import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Post } from '../types';
import { fetchAnnouncements } from '../services/api';
import { Button } from '../components/Button';
import { ui } from '../theme';
export function NewsScreen() {
 const [posts, setPosts] = useState<Post[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');
 const [attempt, setAttempt] = useState(0);
 useEffect(() => {
  const controller = new AbortController(); let active = true;
  const timer = setTimeout(() => controller.abort(), 15000);
  setLoading(true); setError('');
  fetchAnnouncements(controller.signal).then(data => { if (active) setPosts(data); })
   .catch(() => { if (active) setError('Не удалось загрузить объявления. Проверьте интернет и повторите.'); })
   .finally(() => { clearTimeout(timer); if (active) setLoading(false); });
  return () => { active = false; clearTimeout(timer); controller.abort(); };
 }, [attempt]);
 return <FlatList contentContainerStyle={ui.page} data={posts} keyExtractor={p => String(p.id)}
  ListHeaderComponent={<View style={{ gap: 14 }}><Text style={ui.title}>Объявления</Text><Text style={ui.muted}>Демонстрационные записи JSONPlaceholder. Это тестовые тексты API, не объявления университета.</Text><Button title={loading ? 'Загрузка…' : 'Обновить'} disabled={loading} onPress={() => setAttempt(a => a + 1)} />{loading && <ActivityIndicator />}{!!error && <Text style={ui.error}>{error}</Text>}{!!error && posts.length > 0 && <Text style={ui.muted}>Показаны ранее загруженные записи этой сессии.</Text>}</View>}
  ListEmptyComponent={!loading && !error ? <Text style={ui.muted}>Объявлений пока нет.</Text> : null}
  renderItem={({ item }) => <View style={ui.card}><Text style={ui.muted}>ЗАПИСЬ #{item.id}</Text><Text style={ui.heading}>{item.title}</Text><Text style={ui.text}>{item.body}</Text></View>} />;
}
