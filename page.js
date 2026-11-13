'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }
    checkUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    window.location.reload()
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      {/* হেডার অংশ */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', paddingBottom: '15px', marginBottom: '20px' }}>
        <div>
          <h1 style={{ color: '#ff6600', margin: '0' }}>🛒 Hilsha Mart BD</h1>
          <p style={{ fontSize: '12px', color: '#6600cc', margin: '2px 0 0 0' }}>মাল্টি-ভেন্ডর অনলাইন মার্কেটপ্লেস</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {loading ? (
            <span>লোড হচ্ছে...</span>
          ) : user ? (
            <>
              <span style={{ alignSelf: 'center', fontSize: '14px' }}>{user.email}</span>
              <button 
                onClick={handleLogout}
                style={{ padding: '8px 12px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                লগআউট
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button style={{ padding: '8px 12px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  লগইন
                </button>
              </Link>
              <Link href="/signup">
                <button style={{ padding: '8px 12px', background: '#ff6600', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  সাইন আপ
                </button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* হিরো ব্যানার */}
      <div style={{ textAlign: 'center', padding: '40px 20px', background: 'linear-gradient(135deg, #ff6600, #ff9933)', color: '#fff', borderRadius: '8px', marginBottom: '30px' }}>
        <h2>আপনার পছন্দের সবকিছু এক ঠিকানায়!</h2>
        <p>টাটকা ইলিশ মাছ থেকে শুরু করে ইলেকট্রনিক্স, ফ্যাশন ও ঘরের প্রয়োজনীয় সকল পণ্য—সবই পাবেন আমাদের ভেন্ডরদের কাছে।</p>
      </div>

      {/* ক্যাটাগরি সেকশন (দারাজের মতো বিভিন্ন ক্যাটাগরি) */}
      <h3 style={{ marginBottom: '15px' }}>জনপ্রিয় ক্যাটাগরি সমূহ</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center', background: '#fdfdfd' }}>
          <h4>🐟 তাজা মাছ ও বাজার</h4>
          <p style={{ fontSize: '13px', color: '#555' }}>পদ্মার ইলিশ ও সামুদ্রিক মাছ</p>
        </div>
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center', background: '#fdfdfd' }}>
          <h4>📱 ইলেকট্রনিক্স</h4>
          <p style={{ fontSize: '13px', color: '#555' }}>গ্যাজেট ও মোবাইল অ্যাক্সেসরিজ</p>
        </div>
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center', background: '#fdfdfd' }}>
          <h4>👕 ফ্যাশন ও ক্লথিং</h4>
          <p style={{ fontSize: '13px', color: '#555' }}>ছেলে ও মেয়েদের পোশাক</p>
        </div>
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center', background: '#fdfdfd' }}>
          <h4>🏡 হোম ও লিভিং</h4>
          <p style={{ fontSize: '13px', color: '#555' }}>গৃহস্থালী প্রয়োজনীয় পণ্য</p>
        </div>
      </div>

      {/* কাস্টমার ও ভেন্ডর সেকশন */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center', background: '#f8f9fa' }}>
          <h3>🛍️ ক্রেতা (Customer) হোন</h3>
          <p>আপনার পছন্দের পণ্যটি অর্ডার করুন ঘরে বসেই ক্যাশ অন ডেলিভারিতে।</p>
          <Link href="/signup">
            <button style={{ padding: '8px 15px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              অ্যাকাউন্ট খুলুন
            </button>
          </Link>
        </div>

        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center', background: '#f8f9fa' }}>
          <h3>🏪 বিক্রেতা (Vendor) হোন</h3>
          <p>আপনার দোকান বা শপ খুলে আমাদের প্ল্যাটফর্মে হাজার হাজার ক্রেতার কাছে পণ্য বিক্রি করুন।</p>
          <Link href="/signup">
            <button style={{ padding: '8px 15px', background: '#ff6600', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              ভেন্ডর হিসেবে যোগ দিন
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}