export function parseMarkdown(rawContent) {
  // Simple regex to match YAML frontmatter
  const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  
  if (!match) {
    return { attributes: {}, body: rawContent };
  }
  
  const yamlString = match[1];
  const body = match[2];
  const attributes = {};
  
  // Basic YAML parsing (handles key: "value" or key: value)
  yamlString.split(/\r?\n/).forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Remove surrounding quotes if they exist
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.substring(1, value.length - 1);
      }
      
      attributes[key] = value;
    }
  });
  
  return { attributes, body };
}

export function getAllBlogs() {
  // Vite's import.meta.glob to dynamically import all markdown files as raw strings
  const files = import.meta.glob('../content/blogs/*.md', { query: '?raw', import: 'default', eager: true });
  
  const blogs = [];
  
  for (const path in files) {
    const rawContent = files[path];
    const { attributes, body } = parseMarkdown(rawContent);
    
    // Extract slug from filename
    const slug = path.split('/').pop().replace('.md', '');
    
    blogs.push({
      slug,
      ...attributes,
      body
    });
  }
  
  // Sort by date descending
  return blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getBlogBySlug(slug) {
  const blogs = getAllBlogs();
  return blogs.find(blog => blog.slug === slug);
}
