import { Text, View } from 'react-native';
import { Task } from '../types';
import { colors, ui } from '../theme';
import { Button } from './Button';
export function TaskCard({ task, busy, onEdit, onToggle, onDelete }: { task: Task; busy: boolean; onEdit: () => void; onToggle: () => void; onDelete: () => void }) {
 return <View style={ui.card}>
  <Text style={[ui.heading, task.done === 1 && { textDecorationLine: 'line-through', color: colors.muted }]}>{task.title}</Text>
  <Text style={ui.muted}>{task.subject || 'Без предмета'} · {task.priority} приоритет</Text>
  <Text style={{ color: task.done ? colors.green : colors.primary }}>{task.done ? 'Выполнено' : 'В работе'}</Text>
  <View style={ui.row}>
   <Button disabled={busy} title={task.done ? 'Вернуть' : 'Готово'} onPress={onToggle} />
   <Button disabled={busy} title="Изменить" secondary onPress={onEdit} />
   <Button disabled={busy} title="Удалить" secondary onPress={onDelete} />
  </View>
 </View>;
}
