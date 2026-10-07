import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../services/firebase';
type AuthState = { user: User | null; ready: boolean; refresh: () => Promise<void>; logout: () => Promise<void> };
const Context = createContext<AuthState | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
 const [user, setUser] = useState<User | null>(null);
 const [ready, setReady] = useState(false);
 const [, setRevision] = useState(0);
 useEffect(() => onAuthStateChanged(auth, value => { setUser(value); setReady(true); }), []);
 async function refresh() {
  if (auth.currentUser) await auth.currentUser.reload();
  setUser(auth.currentUser); setRevision(v => v + 1);
 }
 return <Context.Provider value={{ user, ready, refresh, logout: () => signOut(auth) }}>{children}</Context.Provider>;
}
export function useAuth() { const value = useContext(Context); if (!value) throw new Error('AuthProvider required'); return value; }
