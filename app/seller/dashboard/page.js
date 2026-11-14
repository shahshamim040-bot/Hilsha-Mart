'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function VendorDashboard() {
  const [subOrders, setSubOrders] = useState([])
  const [wallet, setWallet] = useState({ totalSales: 0, netEarnings: 0 })

  useEffect(() => {
    async function loadVendorData() {
      const { data } = await supabase.from('sub_orders').select('*, products(title)')
      if (data) {
        setSubOrders(data)
        let sales = 0
        let net = 0
        data.forEach(item => {
          sales += Number(item.unit_price) * Number(item.quantity)
          net += Number(item.vendor_net_amount)
        })
        setWallet({ totalSales: sales, netEarnings: net })
      }
    }
    loadVendorData()
  }, [])

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ff6600', paddingBottom: '15px' }}>
        <h1 style={{ color: '#ff6600', margin: 0 }}>🏪 ভেন্ডর ড্যাশবোর্ড পোর্টাল</h1>
        <Link href="/seller/dashboard/products">
          <button style={{ padding: '8px 15px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            + নতুন প্রোডাক্ট আপলোড করুন
          </button>
        </Link>
      </header>

      {/* ওয়ালেট সামারি */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '20px 0' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #28a745', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <h4>মোট পণ্যের বিক্রি</h4>
          <h2>৳ {wallet.totalSales.toFixed(2)}</h2>
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #ff6600', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <h4>নিট ওয়ালেট ব্যালেন্স (কমিশন বাদ দিয়ে)</h4>
          <h2>৳ {wallet.netEarnings.toFixed(2)}</h2>
        </div>
      </div>

      {/* অর্ডারের তালিকা */}
      <h3>আপনার শপের অর্ডারসমূহ</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {subOrders.map(item => (
          <div key={item.id} style={{ background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h4>পণ্য: {item.products?.title} (পরিমাণ: {item.quantity})</h4>
            <p>মূল্য: ৳{item.unit_price * item.quantity} | আপনার নিট আয়: ৳{item.vendor_net_amount}</p>
            <p>অর্ডার স্ট্যাটাস: <strong style={{ color: '#ff6600' }}>{item.status}</strong></p>
          </div>
        ))}
      </div>
    </div>
  )
                }
