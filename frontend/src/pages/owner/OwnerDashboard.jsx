import React, { useEffect, useState } from 'react'
import api from '../../api/axios'


export default function OwnerDashboard(){
const [stores, setStores] = useState([])
useEffect(()=>{ api.get('/owner/stores').then(r=>setStores(r.data.items)).catch(()=>{}) },[])
return (
<div>
<h2>Owner Dashboard</h2>
<ul>
{stores.map(s=> <li key={s.id}>{s.name} - <a href={`/owner/stores/${s.id}/ratings`}>View ratings</a></li>)}
</ul>
</div>
)
}