import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getBlogBySlug } from '../utils/markdownParser';

function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const foundBlog = getBlogBySlug(slug);
    setBlog(foundBlog);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center">
        <h1 className="font-display text-display-md text-primary mb-4">Article not found</h1>
        <Link to="/blogs" className="text-accent hover:underline">Return to articles</Link>
      </div>
    );
  }

  return (
    <div className="bg-surface text-text-primary min-h-screen">
      <header className="bg-surface/90 backdrop-blur-md border-b border-border-light sticky top-0 z-50">
        <nav className="flex justify-between items-center w-full max-w-page mx-auto px-grid-margin py-4">
          <Link to="/blogs" className="font-display text-display-md text-primary hover:text-accent transition-colors">
            &larr; Back to Insights
          </Link>
        </nav>
      </header>

      <article className="max-w-[800px] mx-auto px-grid-margin py-16 md:py-24">
        {blog.thumbnail && (
          <div className="w-full aspect-[21/9] overflow-hidden rounded-2xl mb-12 bg-surface-alt">
            <img 
              src={blog.thumbnail.startsWith('/') ? `${import.meta.env.BASE_URL}${blog.thumbnail.slice(1)}` : blog.thumbnail} 
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="mb-12">
          <p className="text-label text-muted mb-4 uppercase tracking-wider">
            {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <h1 className="font-display text-display-xl text-primary mb-6 leading-tight">
            {blog.title}
          </h1>
          {blog.summary && (
            <p className="text-body-lg text-text-secondary leading-relaxed border-l-4 border-accent pl-6 py-1">
              {blog.summary}
            </p>
          )}
        </div>

        <div className="prose prose-lg prose-blue max-w-none prose-headings:font-display prose-headings:text-primary prose-p:text-text-secondary prose-p:font-body prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-li:text-text-secondary">
          <ReactMarkdown>{blog.body}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}

export default BlogPost;
