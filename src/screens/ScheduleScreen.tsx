import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { days, lessons } from '../data/schedule';
import { Button } from '../components/Button';
import { ui } from '../theme';
export function ScheduleScreen() {
 const [day, setDay] = useState<string>('Пн');
 const selected = lessons.filter(l => l.day === day);
 return <ScrollView contentContainerStyle={ui.page}><Text style={ui.title}>Расписание</Text><Text style={ui.muted}>Учебный пример расписания</Text>
  <View style={ui.row}>{days.map(d => <Button key={d} title={d} secondary={d !== day} onPress={() => setDay(d)} />)}</View>
  {selected.map(l => <View style={ui.card} key={l.time}><Text style={ui.heading}>{l.time} · {l.title}</Text><Text style={ui.text}>{l.kind}</Text><Text style={ui.muted}>{l.room}</Text></View>)}
  {!selected.length && <View style={ui.card}><Text style={ui.heading}>Свободный день</Text><Text style={ui.muted}>В примере на этот день занятий нет.</Text></View>}
 </ScrollView>;
}
