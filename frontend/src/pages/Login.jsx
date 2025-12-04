import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as loginApi } from '../../api/auth.api'
import { useAuth } from '../../context/AuthContext'


export default function Login(){
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState(null)
const navigate = useNavigate()
const { login } = useAuth()


const submit = async e => {
e.preventDefault()
try{
const res = await loginApi({ email, password })
login(res.data.accessToken, res.data.user)
navigate('/')
}catch(err){ setError(err.response?.data?.message || 'Login failed') }
}


return (
<div className="auth-container">
<h2>Login</h2>
<form onSubmit={submit}>
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
<button type="submit">Login</button>
</form>
{error && <div className="error">{error}</div>}
</div>
)
}