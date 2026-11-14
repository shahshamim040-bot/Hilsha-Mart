'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*').eq('approval_status', 'approved')
      if (data) setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ff6600', paddingBottom: '15px' }}>
        <h1 style={{ color: '#ff6600', margin: 0 }}>🛒 Hilsha Mart BD</h1>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link href="/checkout"><button style={{ padding: '8px 15px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>কার্ট / চেকআউট</button></Link>
          <Link href="/signup"><button style={{ padding: '8px 15px', background: '#ff6600', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>ভেন্ডর হোন</button></Link>
          <Link href="/seller/dashboard"><button style={{ padding: '8px 15px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>সেলার প্যানেল</button></Link>
          <Link href="/admin"><button style={{ padding: '8px 15px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>অ্যাডমিন প্যানেল</button></Link>
        </div>
      </header>

      {/* হিরো ব্যানার */}
      <div style={{ textAlign: 'center', padding: '40px', background: 'linear-gradient(135deg, #ff6600, #ff9933)', color: '#fff', borderRadius: '8px', margin: '20px 0' }}>
        <h2>পদ্মার তাজা ইলিশ ও দারাজ স্টাইল অনলাইন শপিং!</h2>
        <p>সেরা দামে সেরা পণ্য, সরাসরি বিশ্বস্ত সেলারদের কাছ থেকে।</p>
      </div>

      {/* প্রোডাক্ট শোকেস */}
      <h3>আমাদের পণ্যসমূহ</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {products.map(p => (
          <div key={p.id} style={{ background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h4>{p.title}</h4>
            <p style={{ color: '#ff6600', fontWeight: 'bold' }}>৳ {p.price}</p>
            <p style={{ fontSize: '13px', color: '#666' }}>স্টক: {p.stock} টি</p>
          </div>
        ))}
      </div>
    </div>
  )
  }
