import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios'


const AuthContext = createContext(null)


export function AuthProvider({ children }) {
const [user, setUser] = useState(null)


useEffect(() => {
const token = localStorage.getItem('accessToken')
const userJson = localStorage.getItem('user')
if (token && userJson) setUser(JSON.parse(userJson))
}, [])


const login = (accessToken, user) => {
localStorage.setItem('accessToken', accessToken)
localStorage.setItem('user', JSON.stringify(user))
api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
setUser(user)
}


const logout = async () => {
try { await api.post('/auth/logout'); } catch (e) {}
localStorage.removeItem('accessToken')
localStorage.removeItem('user')
setUser(null)
}


return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}


export const useAuth = () => useContext(AuthContext)
export const useAuthValue = useAuth
export { AuthContext }