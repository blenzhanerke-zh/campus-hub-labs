export function authError(error: unknown): string {
 const code = (error as { code?: string })?.code;
 switch (code) {
  case 'auth/invalid-email': return 'Проверьте формат email.';
  case 'auth/invalid-credential': case 'auth/wrong-password': case 'auth/user-not-found': return 'Неверный email или пароль. Можно восстановить пароль или зарегистрироваться.';
  case 'auth/email-already-in-use': return 'Регистрация не завершена. Попробуйте войти или восстановить пароль.';
  case 'auth/weak-password': case 'auth/password-does-not-meet-requirements': return 'Пароль не соответствует требованиям. Используйте не менее 8 символов, заглавную и строчную буквы и цифру.';
  case 'auth/too-many-requests': return 'Слишком много попыток. Подождите и попробуйте позже.';
  case 'auth/network-request-failed': return 'Нет соединения с сервером. Проверьте интернет.';
  case 'auth/user-disabled': return 'Доступ к аккаунту отключён. Обратитесь к администратору.';
  case 'auth/operation-not-allowed': return 'В Firebase нужно включить вход Email/Password.';
  default: return 'Не удалось выполнить действие. Проверьте интернет и повторите.';
 }
}
export function validEmail(value: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()); }
export function validPassword(value: string) { return value.length >= 8 && /[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value); }
