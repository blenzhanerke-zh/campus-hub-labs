export type Priority = 'Обычный' | 'Высокий';
export type Task = { id: number; title: string; subject: string; priority: Priority; done: number; createdAt: string };
export type TaskInput = Pick<Task, 'title' | 'subject' | 'priority'>;
export type Post = { id: number; userId: number; title: string; body: string };
export type RootStackParams = { Tabs: undefined; TaskEditor: { taskId?: number } | undefined };
export type TabParams = { Home: undefined; Tasks: undefined; Schedule: undefined; News: undefined };
