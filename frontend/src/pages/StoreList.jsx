import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import StoreCard from '../components/StoreCard'


export default function StoreList(){
const [stores, setStores] = useState([])
const [qName, setQName] = useState('')


const fetch = async () => {
const res = await api.get('/stores', { params: { name: qName } })
setStores(res.data.items)
}


useEffect(()=>{ fetch() }, [])


return (
<div className="stores-page">
<h2>Stores</h2>
<input placeholder="Search by name" value={qName} onChange={e=>setQName(e.target.value)} />
<button onClick={fetch}>Search</button>
<div className="store-grid">
{stores.map(s => <StoreCard key={s.id} store={s} />)}
</div>
</div>
)
}