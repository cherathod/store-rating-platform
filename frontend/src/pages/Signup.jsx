import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup as signupApi } from '../../api/auth.api'


export default function Signup(){
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [address, setAddress] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState(null)
const navigate = useNavigate()


const submit = async e => {
e.preventDefault()
try{
await signupApi({ name, email, address, password })
navigate('/login')
}catch(err){ setError(err.response?.data?.message || 'Signup failed') }
}


return (
<div className="auth-container">
<h2>Signup</h2>
<form onSubmit={submit}>
<input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name (20-60 chars)" />
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
<input value={address} onChange={e=>setAddress(e.target.value)} placeholder="Address" />
<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
<button type="submit">Sign up</button>
</form>
{error && <div className="error">{error}</div>}
</div>
)
}