'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function VendorApproval() {
  const [vendors, setVendors] = useState([])

  const fetchVendors = async () => {
    const { data } = await supabase.from('vendor_applications').select('*').order('created_at', { ascending: false })
    if (data) setVendors(data)
  }

  useEffect(() => {
    fetchVendors()
  }, [])

  const handleStatusUpdate = async (id, userId, newStatus) => {
    await supabase.from('vendor_applications').update({ status: newStatus }).eq('id', id)
    if (newStatus === 'approved' && userId) {
      await supabase.from('profiles').update({ role: 'vendor' }).eq('id', userId)
    }
    alert(`ভেন্ডর স্ট্যাটাস ${newStatus} করা হয়েছে!`)
    fetchVendors()
  }

  return (
    <div>
      <h2>🏪 ভেন্ডর আবেদন ও ভেরিফিকেশন তালিকা</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {vendors.map(v => (
          <div key={v.id} style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
            <h3>{v.shop_name} <span style={{ fontSize: '13px', padding: '3px 8px', background: v.status === 'approved' ? '#dcfce7' : '#fef3c7', borderRadius: '4px' }}>{v.status}</span></h3>
            <p><strong>ক্যাটাগরি:</strong> {v.category} | <strong>মোবাইল:</strong> {v.phone} | <strong>WhatsApp:</strong> {v.whatsapp}</p>
            <p><strong>NID নাম:</strong> {v.nid_name} | <strong>NID নম্বর:</strong> {v.nid_number}</p>
            {v.status === 'pending' && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => handleStatusUpdate(v.id, v.user_id, 'approved')} style={{ padding: '8px 15px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Approve করুন</button>
                <button onClick={() => handleStatusUpdate(v.id, v.user_id, 'rejected')} style={{ padding: '8px 15px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Reject করুন</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
          }
