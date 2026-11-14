'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminOrders() {
  const [subOrders, setSubOrders] = useState([])

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('sub_orders')
      .select('*, orders(*), products(title)')
      .order('created_at', { ascending: false })
    if (data) setSubOrders(data)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const changeStatus = async (subOrderId, newStatus) => {
    await supabase.from('sub_orders').update({ status: newStatus }).eq('id', subOrderId)
    alert('অর্ডার স্ট্যাটাস আপডেট হয়েছে!')
    fetchOrders()
  }

  return (
    <div>
      <h2>🚚 সব অর্ডার ও ডেলিভারি ম্যানেজমেন্ট</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {subOrders.map(item => (
          <div key={item.id} style={{ background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h4>পণ্য: {item.products?.title} (পরিমাণ: {item.quantity})</h4>
            <p>কাস্টমার: {item.orders?.customer_name} ({item.orders?.customer_phone})</p>
            <p>ঠিকানা: {item.orders?.village_address}, {item.orders?.upazila}, {item.orders?.district}, {item.orders?.division}</p>
            <p>মোট দাম: ৳{item.unit_price * item.quantity} | প্ল্যাটফর্ম কমিশন: ৳{item.commission_amount} | ভেন্ডর পাবে: ৳{item.vendor_net_amount}</p>
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>বর্তমান স্ট্যাটাস: <strong>{item.status}</strong></span>
              <select value={item.status} onChange={e => changeStatus(item.id, e.target.value)} style={{ padding: '6px' }}>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="ready_to_ship">Ready to Ship</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="returned">Returned</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
          }
