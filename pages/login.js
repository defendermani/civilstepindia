import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function Login() {
  const router = useRouter();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.push('/');
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);
    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else router.push('/');
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setInfo('Account created. Check your email to confirm, then log in.');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)' }}>
      <div style={{ width: 380, padding: '40px 36px', border: '1px solid var(--rule)', background: 'var(--paper)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
          CivilStepIndia
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', marginBottom: 28 }}>
          {mode === 'login' ? 'Log in to continue your prep' : 'Create your free account'}
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          {error && <div style={{ color: '#a13f3f', fontSize: 13, fontFamily: 'var(--font-body)' }}>{error}</div>}
          {info && <div style={{ color: '#2f6b4f', fontSize: 13, fontFamily: 'var(--font-body)' }}>{info}</div>}
          <button
            type="submit"
            disabled={loading}
            style={{ background: 'var(--ink)', color: 'var(--paper)', border: 'none', padding: '12px 22px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, marginTop: 6 }}
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Sign up'}
          </button>
        </form>
        <div style={{ marginTop: 20, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text)' }}>
          {mode === 'login' ? (
            <>New here? <a href="#" onClick={(e) => { e.preventDefault(); setMode('signup'); setError(''); }}>Create an account</a></>
          ) : (
            <>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setMode('login'); setError(''); }}>Log in</a></>
          )}
        </div>
      </div>
    </div>
  );
}
