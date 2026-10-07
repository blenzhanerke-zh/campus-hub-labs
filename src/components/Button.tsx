import { Pressable, Text } from 'react-native';
import { colors } from '../theme';
type Props = { title: string; onPress: () => void; secondary?: boolean; danger?: boolean; disabled?: boolean };
export function Button({ title, onPress, secondary, danger, disabled }: Props) {
 return <Pressable accessibilityRole="button" accessibilityState={{ disabled: !!disabled }} disabled={disabled} onPress={onPress}
  style={({ pressed }) => ({ paddingVertical: 13, paddingHorizontal: 16, borderRadius: 12, alignItems: 'center', opacity: disabled ? 0.45 : pressed ? 0.7 : 1, backgroundColor: secondary ? colors.soft : danger ? colors.danger : colors.primary })}>
  <Text style={{ color: secondary ? colors.primary : 'white', fontWeight: '700', fontSize: 15 }}>{title}</Text>
 </Pressable>;
}
