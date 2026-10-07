import * as SQLite from 'expo-sqlite';
import { Task, TaskInput } from '../types';
const connections = new Map<string, Promise<SQLite.SQLiteDatabase>>();
async function database(uid: string) {
 if (!uid) throw new Error("Account required");
 if (!connections.has(uid)) {
  const connection = (async () => {
   const db = await SQLite.openDatabaseAsync('campushub-user-' + Array.from(uid).map(c => c.codePointAt(0)!.toString(16)).join('-') + '.db');
   await db.execAsync(`PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS tasks (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     title TEXT NOT NULL CHECK(length(trim(title)) > 0),
     subject TEXT NOT NULL DEFAULT '',
     priority TEXT NOT NULL CHECK(priority IN ('Обычный', 'Высокий')),
     done INTEGER NOT NULL DEFAULT 0 CHECK(done IN (0, 1)),
     createdAt TEXT NOT NULL
    );`);
   return db;
  })().catch(error => { connections.delete(uid); throw error; });
  connections.set(uid, connection);
 }
 return connections.get(uid)!;
}
export async function listTasks(uid: string): Promise<Task[]> {
 const db = await database(uid);
 return db.getAllAsync<Task>('SELECT * FROM tasks ORDER BY done ASC, id DESC');
}
export async function saveTask(uid: string, input: TaskInput, id?: number) {
 const title = input.title.trim();
 if (!title) throw new Error('Введите название задачи');
 const db = await database(uid);
 // Значения пользователя передаются параметрами, а не вставляются в SQL-строку.
 if (id !== undefined) await db.runAsync('UPDATE tasks SET title = ?, subject = ?, priority = ? WHERE id = ?', title, input.subject.trim(), input.priority, id);
 else await db.runAsync('INSERT INTO tasks (title, subject, priority, createdAt) VALUES (?, ?, ?, ?)', title, input.subject.trim(), input.priority, new Date().toISOString());
}
export async function toggleTask(uid: string, id: number) { const db = await database(uid); await db.runAsync('UPDATE tasks SET done = 1 - done WHERE id = ?', id); }
export async function deleteTask(uid: string, id: number) { const db = await database(uid); await db.runAsync('DELETE FROM tasks WHERE id = ?', id); }
