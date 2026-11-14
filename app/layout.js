export const metadata = {
  title: 'Hilsha Mart BD - মাল্টি-ভেন্ডর অনলাইন মার্কেটপ্লেস',
  description: 'টাটকা ইলিশ মাছ এবং বহুমুখী পণ্যের নির্ভরযোগ্য মার্কেটপ্লেস',
}

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body style={{ margin: 0, fontFamily: 'sans-serif', backgroundColor: '#f9f9f9' }}>
        {children}
      </body>
    </html>
  )
}
