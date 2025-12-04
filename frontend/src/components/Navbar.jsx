import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function Navbar(){
const { user, logout } = useAuth()
return (
<nav className="nav">
<Link to="/">Home</Link>
{!user && <><Link to="/login">Login</Link> <Link to="/signup">Signup</Link></>}
{user && <>
{user.role === 'admin' && <Link to="/admin">Admin</Link>}
{user.role === 'store_owner' && <Link to="/owner">Owner</Link>}
<button onClick={logout}>Logout</button>
</>}
</nav>
)
}