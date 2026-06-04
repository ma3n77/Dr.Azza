import React from 'react';
import { Link } from 'react-router-dom';

function Blogs() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="bg-surface/90 backdrop-blur-lg border-b border-outline-variant/20 z-50 sticky top-0">
        <nav className="flex justify-between items-center w-full px-grid-margin py-5 max-w-container-max-width mx-auto">
          <Link to="/" className="font-headline-md text-headline-md font-bold text-primary">
            Prof. Dr. Azza Baraka
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <Link to="/" className="text-on-surface-variant hover:text-primary font-label-lg transition-colors">Home</Link>
            <Link to="/blogs" className="text-secondary border-b-2 border-secondary pb-1 font-label-lg transition-all">Blogs</Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex items-center justify-center py-20 px-4 text-center">
        <div>
          <h1 className="font-headline-xl text-4xl text-primary mb-6">Insights & Blogs</h1>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-10">
            Welcome to the insights hub. Articles, research summaries, and expert commentary on clinical pharmacology and digital health will be published here soon.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-on-primary font-label-lg rounded-xl hover:shadow-xl transition-all">
            <span className="material-symbols-outlined">arrow_back</span> Return to Homepage
          </Link>
        </div>
      </main>

      <footer className="bg-primary text-on-primary py-10 text-center">
         <p className="text-primary-fixed/40 text-sm">© 2026 Prof. Dr. Azza Baraka. All Rights Reserved. </p>
      </footer>
    </div>
  );
}

export default Blogs;
