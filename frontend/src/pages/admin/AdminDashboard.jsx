import React, { useEffect, useState } from 'react'
import api from '../../api/axios'


export default function AdminDashboard(){
const [stats, setStats] = useState(null)
useEffect(()=>{
api.get('/admin/dashboard').then(r=>setStats(r.data)).catch(()=>{})
},[])


if (!stats) return <div>Loading...</div>
return (
<div>
<h2>Admin Dashboard</h2>
<ul>
<li>Total users: {stats.totalUsers}</li>
<li>Total stores: {stats.totalStores}</li>
<li>Total ratings: {stats.totalRatings}</li>
</ul>
</div>
)
}