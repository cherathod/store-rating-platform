import React, { useState } from 'react'
import api from '../api/axios'


export default function RatingModal({ store, onClose }){
const [score, setScore] = useState(store.userRating || 5)
const [loading, setLoading] = useState(false)
const submit = async () => {
setLoading(true)
try {
if (store.userRating) await api.put(`/stores/${store.id}/rating`, { score })
else await api.post(`/stores/${store.id}/rating`, { score })
window.location.reload()
} catch (e) { alert('Failed') } finally { setLoading(false); onClose() }
}
return (
<div className="modal">
<h3>Rate {store.name}</h3>
<select value={score} onChange={e=>setScore(Number(e.target.value))}>
{[1,2,3,4,5].map(n=> <option key={n} value={n}>{n}</option>)}
</select>
<button onClick={submit} disabled={loading}>Submit</button>
<button onClick={onClose}>Close</button>
</div>
)
}