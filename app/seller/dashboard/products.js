'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function VendorProducts() {
  const [product, setProduct] = useState({
    title: '', price: '', stock: '', category: 'ইলিশ ও সামুদ্রিক মাছ', description: ''
  })
  const [loading, setLoading] = useState(false)

  const handleProductSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('products').insert([{
      title: product.title,
      price: product.price,
      stock: product.stock,
      category: product.category,
      description: product.description,
      approval_status: 'pending'
    }])

    setLoading(false)
    if (!error) {
      alert('✅ প্রোডাক্ট সফলভাবে আপলোড হয়েছে! অ্যাডমিন যাচাই করার পর এটি লাইভ হবে।')
      setProduct({ title: '', price: '', stock: '', category: 'ইলিশ ও সামুদ্রিক মাছ', description: '' })
    } else {
      alert('প্রোডাক্ট আপলোড করতে সমস্যা হয়েছে।')
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '25px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h2>📦 নতুন পণ্য লিস্টিং ও স্টক ম্যানেজমেন্ট</h2>
      <form onSubmit={handleProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input type="text" placeholder="পণ্যের নাম (যেমন: তাজা পদ্মার ইলিশ ১ কেজি)" required value={product.title} onChange={e => setProduct({...product, title: e.target.value})} style={{ padding: '10px' }} />
        <select value={product.category} onChange={e => setProduct({...product, category: e.target.value})} style={{ padding: '10px' }}>
          <option value="ইলিশ ও সামুদ্রিক মাছ">ইলিশ ও সামুদ্রিক মাছ</option>
          <option value="ইলেকট্রনিক্স">ইলেকট্রনিক্স</option>
          <option value="ফ্যাশন">ফ্যাশন ও ক্লথিং</option>
        </select>
        <input type="number" placeholder="মূল্য (টাকা)" required value={product.price} onChange={e => setProduct({...product, price: e.target.value})} style={{ padding: '10px' }} />
        <input type="number" placeholder="স্টক পরিমাণ (Stock Quantity)" required value={product.stock} onChange={e => setProduct({...product, stock: e.target.value})} style={{ padding: '10px' }} />
        <textarea placeholder="পণ্যের বিবরণ বা সাইজ/ওজন অপশন..." rows="4" value={product.description} onChange={e => setProduct({...product, description: e.target.value})} style={{ padding: '10px' }} />
        
        <button type="submit" disabled={loading} style={{ padding: '12px', background: '#ff6600', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
          {loading ? 'আপলোড হচ্ছে...' : 'প্রোডাক্ট সাবমিট করুন'}
        </button>
      </form>
    </div>
  )
  }
