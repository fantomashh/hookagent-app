'use client';
import { useState } from 'react';

export default function HomePage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHook = async () => {
    setLoading(true);
    setResponse('');
    const res = await fetch('/api/hookagent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hook: input })
    });
    const data = await res.json();
    setResponse(data.result || 'Keine Antwort.');
    setLoading(false);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🎯 HookAgent</h1>
      <p>Gib deinen TikTok-/Reels-Hook ein:</p>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
        placeholder="z.B. Diese 3 Dinge haben mein Leben verändert..."
      />
      <button
        onClick={submitHook}
        disabled={loading || !input}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
      >
        {loading ? 'Analysiere...' : 'Senden'}
      </button>
      {response && (
        <pre style={{ marginTop: '2rem', background: '#f4f4f4', padding: '1rem' }}>{response}</pre>
      )}
    </main>
  );
}
