import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../lib/useAuth';
import { SUBJECTS, SUBJECT_COLORS, QUESTIONS, STUDY_NOTES } from '../lib/data';

const TEST_DURATION = 10 * 60;

function fmtTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

const btnPrimary = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  background: 'var(--ink)', color: 'var(--paper)', border: 'none',
  padding: '12px 22px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14,
};
const btnSecondary = {
  background: 'transparent', color: 'var(--ink)', border: '1.5px solid var(--ink)',
  padding: '12px 22px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14,
};

function SectionHeader({ eyebrow, title }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em', color: 'var(--accent)', marginBottom: 8 }}>{eyebrow}</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, margin: 0, color: 'var(--ink)' }}>{title}</h2>
    </div>
  );
}

function Nav({ view, setView, hasResult, onLogout }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'study', label: 'Study Notes' },
    { id: 'test', label: 'Mock Test' },
    { id: 'analysis', label: 'Analysis', disabled: !hasResult },
  ];
  return (
    <nav style={{ display: 'flex', gap: 4, borderBottom: '2px solid var(--rule)', marginBottom: 32, justifyContent: 'space-between' }}>
      <div style={{ display: 'flex' }}>
        {items.map(({ id, label, disabled }) => (
          <button
            key={id}
            disabled={disabled}
            onClick={() => setView(id)}
            style={{
              padding: '12px 18px', border: 'none', background: 'transparent',
              borderBottom: view === id ? '3px solid var(--accent)' : '3px solid transparent',
              color: disabled ? 'var(--muted)' : view === id ? 'var(--ink)' : 'var(--text)',
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: view === id ? 700 : 500,
              opacity: disabled ? 0.4 : 1,
            }}
          >{label}</button>
        ))}
      </div>
      <button onClick={onLogout} style={{ border: 'none', background: 'transparent', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>
        Log out
      </button>
    </nav>
  );
}

function Dashboard({ setView, history }) {
  const last = history[0];
  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em', color: 'var(--accent)', marginBottom: 10 }}>
          PRELIMS PRACTICE · GENERAL STUDIES
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, lineHeight: 1.1, margin: 0, color: 'var(--ink)', maxWidth: 640 }}>
          One account. One answer sheet. Every subject.
        </h1>
        <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
          <button onClick={() => setView('test')} style={btnPrimary}>Start Mock Test</button>
          <button onClick={() => setView('study')} style={btnSecondary}>Browse Study Notes</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--rule)', border: '1px solid var(--rule)' }}>
        {SUBJECTS.map((s) => (
          <div key={s} style={{ background: 'var(--paper)', padding: '20px 18px' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: SUBJECT_COLORS[s], marginBottom: 10 }} />
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--ink)' }}>{s}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
              {QUESTIONS.filter((q) => q.subject === s).length} questions
            </div>
          </div>
        ))}
      </div>

      {last && (
        <div style={{ marginTop: 32, padding: '18px 22px', border: '1px solid var(--rule)', background: 'var(--paper-alt)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>LAST ATTEMPT</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ink)' }}>{last.score} / {QUESTIONS.length} correct</div>
          <button onClick={() => setView('analysis')} style={{ ...btnSecondary, marginTop: 12, padding: '8px 16px', fontSize: 13 }}>View Analysis</button>
        </div>
      )}

      {history.length > 1 && (
        <div style={{ marginTop: 32 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>ATTEMPT HISTORY</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--rule)', border: '1px solid var(--rule)' }}>
            {history.map((h, i) => (
              <div key={i} style={{ background: 'var(--paper)', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-body)', fontSize: 13 }}>
                <span>{new Date(h.created_at).toLocaleString()}</span>
                <span>{h.score}/{QUESTIONS.length}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StudyNotes() {
  const [open, setOpen] = useState(SUBJECTS[0]);
  return (
    <div>
      <SectionHeader eyebrow="REVISION" title="Study Notes" />
      {SUBJECTS.map((s) => (
        <div key={s} style={{ borderBottom: '1px solid var(--rule)' }}>
          <button onClick={() => setOpen(open === s ? null : s)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 4px', background: 'transparent', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: SUBJECT_COLORS[s] }} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 21, color: 'var(--ink)' }}>{s}</span>
            </div>
            <span style={{ color: 'var(--muted)' }}>{open === s ? '−' : '+'}</span>
          </button>
          {open === s && (
            <ul style={{ margin: '0 0 22px 4px', padding: '0 0 0 20px', fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.8, color: 'var(--text)' }}>
              {STUDY_NOTES[s].map((n, i) => <li key={i} style={{ marginBottom: 6 }}>{n}</li>)}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function MockTest({ onSubmit }) {
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [flagged, setFlagged] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [seconds, setSeconds] = useState(TEST_DURATION);
  const expiredRef = useRef(false);

  const submit = () => {
    if (submitted) return;
    setSubmitted(true);
    onSubmit(answers);
  };

  useEffect(() => {
    if (submitted) return;
    if (seconds <= 0) {
      if (!expiredRef.current) { expiredRef.current = true; submit(); }
      return;
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, submitted]);

  const q = QUESTIONS[current];
  const attempted = Object.keys(answers).length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--rule)' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>GENERAL STUDIES · MOCK PAPER 01</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text)', marginTop: 2 }}>{attempted} / {QUESTIONS.length} attempted</div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: seconds < 60 ? '#a13f3f' : 'var(--ink)' }}>{fmtTime(seconds)}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 32 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: SUBJECT_COLORS[q.subject], marginBottom: 10 }}>Q{current + 1} · {q.subject.toUpperCase()}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 21, color: 'var(--ink)', lineHeight: 1.4, marginBottom: 24, minHeight: 80 }}>{q.q}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((opt, i) => {
              const selected = answers[q.id] === i;
              const letter = String.fromCharCode(65 + i);
              return (
                <button key={i} onClick={() => setAnswers({ ...answers, [q.id]: i })} style={{
                  display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
                  padding: '13px 16px', border: `1.5px solid ${selected ? 'var(--ink)' : 'var(--rule)'}`,
                  background: selected ? 'var(--paper-alt)' : 'transparent',
                  fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text)',
                }}>
                  <span style={{
                    width: 26, height: 26, borderRadius: '50%', border: `1.5px solid ${selected ? 'var(--ink)' : 'var(--muted)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    background: selected ? 'var(--ink)' : 'transparent', color: selected ? 'var(--paper)' : 'var(--muted)',
                    fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
                  }}>{letter}</span>
                  {opt}
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
            <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0} style={{ ...btnSecondary, opacity: current === 0 ? 0.4 : 1 }}>Previous</button>
            <button onClick={() => setFlagged({ ...flagged, [q.id]: !flagged[q.id] })} style={{ ...btnSecondary, borderColor: flagged[q.id] ? '#a13f3f' : 'var(--ink)', color: flagged[q.id] ? '#a13f3f' : 'var(--ink)' }}>
              {flagged[q.id] ? 'Flagged' : 'Flag for review'}
            </button>
            {current < QUESTIONS.length - 1 ? (
              <button onClick={() => setCurrent((c) => c + 1)} style={btnPrimary}>Next</button>
            ) : (
              <button onClick={submit} style={{ ...btnPrimary, background: '#2f6b4f' }}>Submit Paper</button>
            )}
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 10 }}>QUESTION GRID</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {QUESTIONS.map((qq, i) => {
              const isAns = answers[qq.id] !== undefined;
              const isFlag = flagged[qq.id];
              return (
                <button key={qq.id} onClick={() => setCurrent(i)} style={{
                  width: 34, height: 34, fontFamily: 'var(--font-mono)', fontSize: 12,
                  border: `1.5px solid ${i === current ? 'var(--ink)' : 'var(--rule)'}`,
                  background: isFlag ? '#f3d9c9' : isAns ? 'var(--ink)' : 'transparent',
                  color: isAns ? 'var(--paper)' : 'var(--text)',
                }}>{i + 1}</button>
              );
            })}
          </div>
          <button onClick={submit} style={{ ...btnPrimary, width: '100%', marginTop: 20, justifyContent: 'center', background: '#2f6b4f' }}>Submit Paper</button>
        </div>
      </div>
    </div>
  );
}

function Analysis({ result }) {
  if (!result) return null;
  const bySubject = SUBJECTS.map((s) => {
    const qs = QUESTIONS.filter((q) => q.subject === s);
    const correct = qs.filter((q) => result.answers[q.id] === q.correct).length;
    return { subject: s, correct, total: qs.length, pct: Math.round((correct / qs.length) * 100) };
  });
  const weakest = [...bySubject].sort((a, b) => a.pct - b.pct)[0];
  const score = QUESTIONS.filter((q) => result.answers[q.id] === q.correct).length;

  return (
    <div>
      <SectionHeader eyebrow="RESULT" title="Performance Analysis" />
      <div style={{ display: 'flex', gap: 40, marginBottom: 36 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>SCORE</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--ink)' }}>{score}/{QUESTIONS.length}</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>ATTEMPTED</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--ink)' }}>{Object.keys(result.answers).length}/{QUESTIONS.length}</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>NEEDS WORK</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: '#a13f3f' }}>{weakest.subject}</div>
        </div>
      </div>

      <div style={{ height: 220, marginBottom: 40 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bySubject} margin={{ left: -20 }}>
            <CartesianGrid strokeDasharray="2 4" stroke="#e4ddd0" vertical={false} />
            <XAxis dataKey="subject" tick={{ fontFamily: 'IBM Plex Mono', fontSize: 12, fill: '#6b6455' }} axisLine={{ stroke: '#e4ddd0' }} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontFamily: 'IBM Plex Mono', fontSize: 11, fill: '#6b6455' }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v) => `${v}%`} contentStyle={{ fontFamily: 'Inter', fontSize: 13, border: '1px solid #e4ddd0' }} />
            <Bar dataKey="pct" radius={[3, 3, 0, 0]}>
              {bySubject.map((d, i) => <Cell key={i} fill={SUBJECT_COLORS[d.subject]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', marginBottom: 14 }}>QUESTION-WISE REVIEW</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--rule)', border: '1px solid var(--rule)' }}>
        {QUESTIONS.map((q) => {
          const given = result.answers[q.id];
          const isCorrect = given === q.correct;
          const attempted = given !== undefined;
          return (
            <div key={q.id} style={{ background: 'var(--paper)', padding: '16px 18px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: isCorrect ? '#2f6b4f' : attempted ? '#a13f3f' : 'var(--muted)', fontWeight: 600, marginBottom: 4 }}>
                {q.q}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text)' }}>
                Correct answer: <b>{q.options[q.correct]}</b>
                {attempted && !isCorrect && <span style={{ color: '#a13f3f' }}> · Your answer: {q.options[given]}</span>}
                {!attempted && <span style={{ color: 'var(--muted)' }}> · Not attempted</span>}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--muted)', marginTop: 4, fontStyle: 'italic' }}>{q.note}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [view, setView] = useState('dashboard');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user) loadHistory();
  }, [user]);

  const loadHistory = async () => {
    const { data } = await supabase
      .from('attempts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    if (data) setHistory(data);
  };

  const handleSubmit = async (answers) => {
    const score = QUESTIONS.filter((q) => answers[q.id] === q.correct).length;
    setResult({ answers, score });
    setView('analysis');
    await supabase.from('attempts').insert({
      user_id: user.id,
      score,
      total: QUESTIONS.length,
      answers,
    });
    loadHistory();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading || !user) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)' }}>Loading...</div>;
  }

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh', padding: '40px 5vw' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 32 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>CivilStepIndia</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>· UPSC PREP DESK</span>
        </div>
        <Nav view={view} setView={setView} hasResult={!!result || history.length > 0} onLogout={handleLogout} />
        {view === 'dashboard' && <Dashboard setView={setView} history={history} />}
        {view === 'study' && <StudyNotes />}
        {view === 'test' && <MockTest onSubmit={handleSubmit} />}
        {view === 'analysis' && <Analysis result={result || (history[0] && { answers: history[0].answers, score: history[0].score })} />}
      </div>
    </div>
  );
}
