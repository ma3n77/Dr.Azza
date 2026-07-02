import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
} from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { db, auth } from '../firebase';

function QAAdmin() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [filter, setFilter] = useState('unanswered'); // 'unanswered' | 'answered' | 'all'

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch questions when logged in
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(data);
    });
    return () => unsubscribe();
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setLoginError('Invalid email or password.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handlePublishAnswer = async (questionId) => {
    const answer = answers[questionId]?.trim();
    if (!answer) return;
    setSavingId(questionId);
    try {
      await updateDoc(doc(db, 'questions', questionId), {
        answer,
        isAnswered: true,
        answeredAt: serverTimestamp(),
      });
      setAnswers(prev => ({ ...prev, [questionId]: '' }));
    } catch (err) {
      alert('Failed to save answer. Try again.');
    } finally {
      setSavingId(null);
    }
  };

  const handleToggleVisibility = async (question) => {
    await updateDoc(doc(db, 'questions', question.id), {
      isVisible: !question.isVisible,
    });
  };

  const handleDelete = async (questionId) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    await deleteDoc(doc(db, 'questions', questionId));
  };

  const handleLogout = () => signOut(auth);

  const filtered = questions.filter(q => {
    if (filter === 'unanswered') return !q.isAnswered;
    if (filter === 'answered') return q.isAnswered;
    return true;
  });

  const unansweredCount = questions.filter(q => !q.isAnswered).length;

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-[100dvh] bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-muted animate-spin">autorenew</span>
      </div>
    );
  }

  // Login screen
  if (!user) {
    return (
      <div className="min-h-[100dvh] bg-surface flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-white text-3xl">lock</span>
            </div>
            <h1 className="font-display text-display-lg text-primary">Q&A Admin Panel</h1>
            <p className="text-body-sm text-text-secondary mt-2">Dr. Azza Baraka - Answer Management</p>
          </div>

          <form onSubmit={handleLogin} className="bg-surface-elevated border border-border rounded-2xl p-8 space-y-4 shadow-sm">
            <div>
              <label className="text-label text-muted uppercase tracking-wider block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-body-md text-text-primary placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="text-label text-muted uppercase tracking-wider block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-body-md text-text-primary placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
            </div>
            {loginError && (
              <p className="text-error text-body-sm">{loginError}</p>
            )}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-primary text-white font-display font-semibold text-body-md rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center mt-6">
            <Link to="/qa" className="text-body-sm text-accent hover:underline">View public Q&A page</Link>
          </p>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="bg-surface text-text-primary min-h-[100dvh]">
      {/* Top bar */}
      <header className="bg-primary text-white sticky top-0 z-50">
        <div className="max-w-page mx-auto px-grid-margin py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
            <span className="font-display text-body-md font-semibold">Q&A Admin Panel</span>
            {unansweredCount > 0 && (
              <span className="bg-white text-primary text-label font-bold rounded-full px-2.5 py-0.5">
                {unansweredCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Link to="/qa" className="text-white/70 hover:text-white text-body-sm transition-colors">
              View Public Page
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-white/70 hover:text-white text-body-sm transition-colors"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-page mx-auto px-grid-margin py-10">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { key: 'unanswered', label: `Unanswered (${questions.filter(q => !q.isAnswered).length})` },
            { key: 'answered', label: `Answered (${questions.filter(q => q.isAnswered).length})` },
            { key: 'all', label: `All (${questions.length})` },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-lg text-body-sm font-semibold transition-colors ${
                filter === tab.key
                  ? 'bg-primary text-white'
                  : 'bg-surface-alt text-text-secondary hover:bg-border'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Questions list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-text-secondary">
            <span className="material-symbols-outlined text-5xl text-border block mb-4">inbox</span>
            <p className="text-body-md">No questions here yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((q) => (
              <div
                key={q.id}
                className={`rounded-xl border p-6 ${
                  q.isAnswered ? 'border-border bg-surface-elevated' : 'border-accent/30 bg-accent-soft'
                }`}
              >
                {/* Question header */}
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display text-display-md text-primary">{q.name}</span>
                      {!q.isAnswered && (
                        <span className="text-label bg-accent text-white px-2 py-0.5 rounded-full">New</span>
                      )}
                      {!q.isVisible && (
                        <span className="text-label bg-border text-muted px-2 py-0.5 rounded-full">Hidden</span>
                      )}
                    </div>
                    <p className="text-body-sm text-muted">
                      {q.createdAt?.toDate
                        ? new Date(q.createdAt.toDate()).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                          })
                        : 'Just now'}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleVisibility(q)}
                      className="p-2 rounded-lg border border-border hover:bg-surface-alt transition-colors"
                      title={q.isVisible ? 'Hide question' : 'Show question'}
                    >
                      <span className="material-symbols-outlined text-muted text-base">
                        {q.isVisible ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="p-2 rounded-lg border border-border hover:bg-red-50 hover:border-red-200 transition-colors"
                      title="Delete question"
                    >
                      <span className="material-symbols-outlined text-muted text-base">delete</span>
                    </button>
                  </div>
                </div>

                {/* Question text */}
                <p className="text-body-md text-text-primary font-medium bg-surface rounded-lg px-4 py-3 mb-4">
                  {q.question}
                </p>

                {/* Answer area */}
                {q.isAnswered ? (
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-accent text-xl shrink-0 mt-0.5">check_circle</span>
                    <div>
                      <p className="text-label text-accent uppercase tracking-wider mb-1">Your answer</p>
                      <p className="text-body-md text-text-secondary">{q.answer}</p>
                      {/* Allow re-answering */}
                      <button
                        onClick={() => setAnswers(prev => ({ ...prev, [q.id]: q.answer }))}
                        className="mt-3 text-body-sm text-accent font-semibold hover:underline"
                      >
                        Edit answer
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-label text-muted uppercase tracking-wider block mb-2">Your answer</label>
                    <textarea
                      value={answers[q.id] || ''}
                      onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                      placeholder="Type your answer here..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-body-md text-text-primary placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none mb-3"
                    />
                    <button
                      onClick={() => handlePublishAnswer(q.id)}
                      disabled={savingId === q.id || !answers[q.id]?.trim()}
                      className="px-6 py-2.5 bg-primary text-white font-display text-body-sm font-semibold rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {savingId === q.id ? (
                        <>
                          <span className="material-symbols-outlined text-base animate-spin">autorenew</span>
                          Publishing...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-base">send</span>
                          Publish Answer
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default QAAdmin;
