import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Task, TaskInput } from '../types';
import * as repository from '../database/tasks';
type State = { tasks: Task[]; loading: boolean; busy: boolean; error: string; reload: () => Promise<void>; save: (input: TaskInput, id?: number) => Promise<boolean>; toggle: (id: number) => Promise<boolean>; remove: (id: number) => Promise<boolean> };
const Context = createContext<State | undefined>(undefined);
export function TasksProvider({ children }: { children: ReactNode }) {
 const { user } = useAuth();
 const uid = user!.uid;
 const [tasks, setTasks] = useState<Task[]>([]);
 const [loading, setLoading] = useState(true);
 const [busy, setBusy] = useState(false);
 const [error, setError] = useState('');
 const locked = useRef(false);
 async function reload() {
  setLoading(true); setError('');
  try { setTasks(await repository.listTasks(uid)); }
  catch { setError('Не удалось прочитать базу данных. Попробуйте ещё раз.'); }
  finally { setLoading(false); }
 }
 useEffect(() => { void reload(); }, []);
 async function mutate(operation: () => Promise<void>): Promise<boolean> {
  if (locked.current) return false;
  locked.current = true; setBusy(true); setError('');
  try { await operation(); setTasks(await repository.listTasks(uid)); return true; }
  catch { setError('Не удалось обновить данные. Проверьте список и повторите действие.'); return false; }
  finally { locked.current = false; setBusy(false); }
 }
 return <Context.Provider value={{ tasks, loading, busy, error, reload, save: (data, id) => mutate(() => repository.saveTask(uid, data, id)), toggle: id => mutate(() => repository.toggleTask(uid, id)), remove: id => mutate(() => repository.deleteTask(uid, id)) }}>{children}</Context.Provider>;
}
export function useTasks() { const value = useContext(Context); if (!value) throw new Error('TasksProvider is required'); return value; }
