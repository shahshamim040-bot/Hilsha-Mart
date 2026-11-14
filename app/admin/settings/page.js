'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    default_commission_rate: 10,
    dhaka_delivery_charge: 60,
    outside_dhaka_charge: 120
  })

  useEffect(() => {
    async function loadSettings() {
      const { data } = await supabase.from('system_settings').select('*').eq('id', 1).single()
      if (data) setSettings(data)
    }
    loadSettings()
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('system_settings').update({
      default_commission_rate: settings.default_commission_rate,
      dhaka_delivery_charge: settings.dhaka_delivery_charge,
      outside_dhaka_charge: settings.outside_dhaka_charge,
      updated_at: new Date()
    }).eq('id', 1)

    if (!error) {
      alert('✅ কমিশন ও ডেলিভারি চার্জ সফলভাবে আপডেট হয়েছে!')
    } else {
      alert('আপডেট করতে সমস্যা হয়েছে।')
    }
  }

  return (
    <div style={{ maxWidth: '500px', background: '#fff', padding: '25px', borderRadius: '8px' }}>
      <h2>⚙️ প্ল্যাটফর্ম কমিশন ও ডেলিভারি চার্জ কন্ট্রোল</h2>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <div>
          <label>ভেন্ডর কমিশন রেট (%):</label>
          <input type="number" step="0.1" value={settings.default_commission_rate} onChange={e => setSettings({...settings, default_commission_rate: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '5px' }} required />
        </div>
        <div>
          <label>ঢাকার ভেতরে ডেলিভারি চার্জ (৳):</label>
          <input type="number" value={settings.dhaka_delivery_charge} onChange={e => setSettings({...settings, dhaka_delivery_charge: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '5px' }} required />
        </div>
        <div>
          <label>ঢাকার বাইরে ডেলিভারি চার্জ (৳):</label>
          <input type="number" value={settings.outside_dhaka_charge} onChange={e => setSettings({...settings, outside_dhaka_charge: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '5px' }} required />
        </div>
        <button type="submit" style={{ padding: '12px', background: '#ff6600', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
          সেটিংস সেভ করুন
        </button>
      </form>
    </div>
  )
  }
