import React, { useState } from 'react'
import RatingModal from './RatingModal'


export default function StoreCard({ store }){
const [open, setOpen] = useState(false)
return (
<div className="card">
<h3>{store.name}</h3>
<p>{store.address}</p>
<p>Average: {store.overallRating ?? '—'}</p>
<p>Your rating: {store.userRating ?? 'Not rated'}</p>
<button onClick={()=>setOpen(true)}>{store.userRating ? 'Edit rating' : 'Rate'}</button>
{open && <RatingModal store={store} onClose={()=>setOpen(false)} />}
</div>
)
}