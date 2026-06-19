import React from 'react';
import { Link } from 'react-router-dom';
import { getAllBlogs } from '../utils/markdownParser';

function Blogs() {
  const blogs = getAllBlogs();

  return (
    <div className="bg-surface text-text-primary min-h-screen">
      {/* Navigation - Same as Home */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-border-light sticky top-0 z-50">
        <nav className="flex justify-between items-center w-full max-w-page mx-auto px-grid-margin py-4">
          <Link to="/" className="font-display text-display-md text-primary hover:text-accent transition-colors">
            &larr; Back to Portfolio
          </Link>
        </nav>
      </header>

      <section className="py-16 md:py-24 max-w-page mx-auto px-grid-margin">
        <div className="max-w-3xl mb-16">
          <h1 className="font-display text-display-xl text-primary mb-6">Insights & Articles</h1>
          <p className="text-body-lg text-text-secondary">
            Thoughts, publications, and updates on clinical pharmacology, medication safety, and digital health transformation.
          </p>
        </div>

        {blogs.length === 0 ? (
          <p className="text-body-md text-text-secondary">No articles published yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <Link 
                key={blog.slug} 
                to={`/blogs/${blog.slug}`}
                className="group flex flex-col bg-surface-elevated rounded-xl border border-border overflow-hidden hover:border-accent hover:shadow-lg transition-all duration-300"
              >
                {blog.thumbnail && (
                  <div className="aspect-[16/9] overflow-hidden bg-surface-alt">
                    <img 
                      src={blog.thumbnail.startsWith('/') ? `${import.meta.env.BASE_URL}${blog.thumbnail.slice(1)}` : blog.thumbnail} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                {!blog.thumbnail && (
                  <div className="aspect-[16/9] bg-accent-soft flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-accent opacity-50">article</span>
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-label text-muted mb-3 uppercase tracking-wider">
                    {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <h2 className="font-display text-display-md text-primary mb-3 group-hover:text-accent transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-body-sm text-text-secondary line-clamp-3 mb-6 flex-1">
                    {blog.summary}
                  </p>
                  <span className="text-accent text-body-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read article <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Blogs;
