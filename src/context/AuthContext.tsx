import { createContext, useContext, useState, useCallback } from 'react'
import { adminUsers } from '@/data/users'

interface SessionUser {
  name: string
  role: string
  email: string
  avatar: string | null
}

interface AuthContextValue {
  user: SessionUser | null
  login: (credentials: { email: string; password: string }) => Promise<SessionUser>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = 'teamlead_session'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as SessionUser) : null
  })

  // TODO integration point: replace with real auth endpoint, e.g. POST /api/auth/login
  const login = useCallback(({ email, password }: { email: string; password: string }) => {
    return new Promise<SessionUser>((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject(new Error('Email and password are required'))
          return
        }
        const found = adminUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
        const sessionUser: SessionUser = {
          name: found ? found.name : 'Aarav Mehta',
          role: found ? found.role : (email.includes('admin') ? 'Super Admin' : 'Team Lead'),
          email,
          avatar: null,
        }
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser))
        setUser(sessionUser)
        resolve(sessionUser)
      }, 600)
    })
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
