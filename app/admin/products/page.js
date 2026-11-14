'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function ProductApproval() {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (data) setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const updateApproval = async (id, status) => {
    await supabase.from('products').update({ approval_status: status }).eq('id', id)
    alert(`প্রোডাক্ট ${status} করা হয়েছে!`)
    fetchProducts()
  }

  return (
    <div>
      <h2>📦 প্রোডাক্ট অ্যাপ্রুভাল ও ইনভেন্টরি কন্ট্রোল</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px', marginTop: '20px' }}>
        {products.map(p => (
          <div key={p.id} style={{ background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h4>{p.title}</h4>
            <p>ক্যাটাগরি: {p.category} | দাম: ৳{p.price} | স্টক: {p.stock}</p>
            <p>স্ট্যাটাস: <strong>{p.approval_status}</strong></p>
            {p.approval_status === 'pending' && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => updateApproval(p.id, 'approved')} style={{ padding: '6px 12px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Approve</button>
                <button onClick={() => updateApproval(p.id, 'rejected')} style={{ padding: '6px 12px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
