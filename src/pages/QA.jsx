import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

function QA() {
  const [questions, setQuestions] = useState([]);
  const [name, setName] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch all answered, visible questions in real time
  useEffect(() => {
    const q = query(
      collection(db, 'questions'),
      where('isAnswered', '==', true),
      where('isVisible', '==', true),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'questions'), {
        name: name.trim() || 'Anonymous',
        question: questionText.trim(),
        answer: '',
        isAnswered: false,
        isVisible: true,
        createdAt: serverTimestamp(),
        answeredAt: null,
      });
      setSubmitted(true);
      setName('');
      setQuestionText('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface text-text-primary min-h-[100dvh]">
      {/* Navigation */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-border-light sticky top-0 z-50">
        <nav className="flex justify-between items-center w-full max-w-page mx-auto px-grid-margin py-4">
          <Link to="/" className="font-display text-display-md text-primary hover:text-accent transition-colors">
            &larr; Back to Portfolio
          </Link>
        </nav>
      </header>

      <div className="max-w-page mx-auto px-grid-margin py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-16">

          {/* Left: Submit question */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <h1 className="font-display text-display-xl text-primary mb-4">Ask Dr. Azza</h1>
              <p className="text-body-md text-text-secondary mb-8">
                Have a question about clinical pharmacology, medication safety, or digital health? Submit it below and Dr. Azza will answer it publicly.
              </p>

              {submitted ? (
                <div className="bg-accent-soft border border-accent/20 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="material-symbols-outlined text-accent text-2xl">check_circle</span>
                    <h3 className="font-display text-display-md text-primary">Question submitted!</h3>
                  </div>
                  <p className="text-body-sm text-text-secondary">
                    Thank you! Dr. Azza will review and answer your question. Check back here to see the reply.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-accent text-body-sm font-semibold hover:underline"
                  >
                    Ask another question
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-label text-muted uppercase tracking-wider block mb-2">
                      Your name (optional)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ahmed Hassan"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-surface-elevated text-body-md text-text-primary placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-label text-muted uppercase tracking-wider block mb-2">
                      Your question <span className="text-error">*</span>
                    </label>
                    <textarea
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      placeholder="Type your question here..."
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-surface-elevated text-body-md text-text-primary placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                    />
                  </div>
                  {error && (
                    <p className="text-error text-body-sm">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting || !questionText.trim()}
                    className="w-full py-3 bg-primary text-white font-display font-semibold text-body-md rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <span className="material-symbols-outlined text-lg animate-spin">autorenew</span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-lg">send</span>
                        Submit Question
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Answered Q&As */}
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-primary mb-2">Answered Questions</h2>
            <p className="text-body-sm text-text-secondary mb-10">
              {questions.length > 0
                ? `${questions.length} question${questions.length !== 1 ? 's' : ''} answered so far.`
                : 'No answered questions yet. Be the first to ask!'}
            </p>

            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="rounded-xl bg-surface-alt animate-pulse h-32" />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {questions.map((q) => (
                  <div key={q.id} className="rounded-xl border border-border bg-surface-elevated p-6">
                    {/* Question */}
                    <div className="flex gap-4 mb-5">
                      <div className="shrink-0 w-9 h-9 rounded-full bg-surface-alt flex items-center justify-center">
                        <span className="material-symbols-outlined text-muted text-xl">person</span>
                      </div>
                      <div>
                        <p className="text-label text-muted uppercase tracking-wider mb-1">{q.name}</p>
                        <p className="text-body-md text-text-primary font-medium">{q.question}</p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border my-4" />

                    {/* Answer */}
                    <div className="flex gap-4">
                      <div className="shrink-0 w-9 h-9 rounded-full bg-accent-soft flex items-center justify-center">
                        <span className="material-symbols-outlined text-accent text-xl">medical_information</span>
                      </div>
                      <div>
                        <p className="text-label text-accent uppercase tracking-wider mb-1">Dr. Azza Baraka</p>
                        <p className="text-body-md text-text-secondary leading-relaxed">{q.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QA;
