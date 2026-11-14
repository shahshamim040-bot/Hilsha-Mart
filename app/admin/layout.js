'use client'
import Link from 'next/link'

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* সাইডবার মেনু */}
      <aside style={{ width: '240px', backgroundColor: '#1e293b', color: '#fff', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2 style={{ color: '#ff6600', margin: '0 0 15px 0', fontSize: '20px' }}>🛡️ Super Admin</h2>
        <Link href="/admin" style={{ color: '#fff', textDecoration: 'none', padding: '10px', background: '#334155', borderRadius: '5px' }}>
          📊 ড্যাশবোর্ড ওভারভিউ
        </Link>
        <Link href="/admin/vendors" style={{ color: '#fff', textDecoration: 'none', padding: '10px', background: '#334155', borderRadius: '5px' }}>
          🏪 ভেন্ডর অ্যাপ্রুভাল
        </Link>
        <Link href="/admin/products" style={{ color: '#fff', textDecoration: 'none', padding: '10px', background: '#334155', borderRadius: '5px' }}>
          📦 প্রোডাক্ট অ্যাপ্রুভাল
        </Link>
        <Link href="/admin/orders" style={{ color: '#fff', textDecoration: 'none', padding: '10px', background: '#334155', borderRadius: '5px' }}>
          🚚 অর্ডার ও কুরিয়ার
        </Link>
        <Link href="/admin/settings" style={{ color: '#fff', textDecoration: 'none', padding: '10px', background: '#334155', borderRadius: '5px' }}>
          ⚙️ কমিশন ও ডেলিভারি চার্জ
        </Link>
        <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', marginTop: 'auto', fontSize: '14px' }}>
          ← মূল ওয়েবসাইটে ফিরুন
        </Link>
      </aside>

      {/* মেইন কন্টেন্ট এরিয়া */}
      <main style={{ flex: 1, padding: '30px', backgroundColor: '#f1f5f9' }}>
        {children}
      </main>
    </div>
  )
            }
