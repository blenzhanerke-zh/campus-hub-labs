import { StyleSheet } from 'react-native';
export const colors = { bg: '#F3F5FA', card: '#FFFFFF', ink: '#17233D', muted: '#65718A', primary: '#4259D8', soft: '#E9EDFF', border: '#DFE4EE', danger: '#BA3547', green: '#14755A' };
export const ui = StyleSheet.create({
 page: { flexGrow: 1, padding: 20, gap: 16, backgroundColor: colors.bg },
 title: { fontSize: 28, fontWeight: '800', color: colors.ink },
 heading: { fontSize: 19, fontWeight: '700', color: colors.ink },
 text: { fontSize: 16, lineHeight: 24, color: colors.ink },
 muted: { fontSize: 14, lineHeight: 21, color: colors.muted },
 card: { backgroundColor: colors.card, padding: 18, borderRadius: 20, gap: 10, borderWidth: 1, borderColor: colors.border },
 row: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
 input: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14, backgroundColor: 'white', color: colors.ink, fontSize: 16 },
 label: { fontSize: 14, fontWeight: '700', color: colors.ink },
 error: { color: colors.danger, fontSize: 15, lineHeight: 22 },
});
