import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import StoreList from '../pages/StoreList'
import AdminDashboard from '../pages/admin/AdminDashboard'
import OwnerDashboard from '../pages/owner/OwnerDashboard'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'


function Protected({ children, roles }) {
const { user } = useAuth();
if (!user) return <Navigate to="/login" />;
if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
return children;
}


export default function AppRouter() {
return (
<>
<Navbar />
<Routes>
<Route path="/" element={<StoreList />} />
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/admin" element={<Protected roles={["admin"]}><AdminDashboard /></Protected>} />
<Route path="/owner" element={<Protected roles={["store_owner"]}><OwnerDashboard /></Protected>} />
<Route path="*" element={<div>Not Found</div>} />
</Routes>
</>
)
}