'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminOverview() {
  const [stats, setStats] = useState({ totalOrders: 0, totalSales: 0, netCommission: 0, pendingVendors: 0 })

  useEffect(() => {
    async function loadStats() {
      const { data: subOrders } = await supabase.from('sub_orders').select('unit_price, quantity, commission_amount')
      const { count: vendorCount } = await supabase.from('vendor_applications').select('*', { count: 'exact', head: true }).eq('status', 'pending')

      let sales = 0
      let commission = 0
      if (subOrders) {
        subOrders.forEach(item => {
          sales += Number(item.unit_price) * Number(item.quantity)
          commission += Number(item.commission_amount)
        })
      }

      setStats({
        totalOrders: subOrders?.length || 0,
        totalSales: sales,
        netCommission: commission,
        pendingVendors: vendorCount || 0
      })
    }
    loadStats()
  }, [])

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>📊 সুপার অ্যাডমিন ড্যাশবোর্ড</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #0070f3' }}>
          <h4>মোট সাব-অর্ডার</h4>
          <h2>{stats.totalOrders} টি</h2>
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #28a745' }}>
          <h4>মোট বিক্রি (GMV)</h4>
          <h2>৳ {stats.totalSales.toFixed(2)}</h2>
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #ff6600' }}>
          <h4>প্ল্যাটফর্মের নিট কমিশন আয়</h4>
          <h2>৳ {stats.netCommission.toFixed(2)}</h2>
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #dc3545' }}>
          <h4>পেন্ডিং ভেন্ডর আবেদন</h4>
          <h2>{stats.pendingVendors} টি</h2>
        </div>
      </div>
    </div>
  )
                    }
