import { Post } from '../types';
export async function fetchAnnouncements(signal: AbortSignal): Promise<Post[]> {
 const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', { signal });
 if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);
 const data: unknown = await response.json();
 if (!Array.isArray(data) || !data.every(item => typeof item === 'object' && item !== null && typeof item.id === 'number' && typeof item.userId === 'number' && typeof item.title === 'string' && typeof item.body === 'string')) throw new Error('Сервер вернул данные неизвестного формата');
 return data as Post[];
}
