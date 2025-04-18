'use client'

import { useState } from 'react'

export default function Page() {
  const [hook, setHook] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult('')

    const res = await fetch('/api/hookagent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hook }),
    })

    const data = await res.json()
    setResult(data.result)
    setLoading(false)
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Hook Analyzer</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <textarea
          value={hook}
          onChange={(e) => setHook(e.target.value)}
          placeholder="Dein Hook hier..."
          rows={4}
          cols={60}
          style={{ width: '100%', padding: '1rem' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
        >
          {loading ? 'Analysiere...' : 'Analysieren'}
        </button>
      </form>

      {result && (
        <div
          style={{
            whiteSpace: 'pre-wrap',
            background: '#f9f9f9',
            padding: '1rem',
          }}
        >
          <strong>Ergebnis:</strong>
          <br />
          {result}
        </div>
      )}
    </main>
  )
}

