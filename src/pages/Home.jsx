import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    // Reveal animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-8');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section > div, .award-shine, [class*="pillar-card"]').forEach(el => {
        el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-8');
        observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-surface text-on-surface">
      {/* Header */}
      <header className="bg-surface/90 backdrop-blur-lg border-b border-outline-variant/20 z-50 sticky top-0">
        <nav className="flex justify-between items-center w-full px-grid-margin py-5 max-w-container-max-width mx-auto relative">
          <div className="font-headline-md text-headline-md font-bold text-primary">
            Prof. Dr. Azza Baraka
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <a className="text-secondary border-b-2 border-secondary pb-1 font-label-lg transition-all" href="#about">Home</a>
            <a className="text-on-surface-variant hover:text-primary font-label-lg transition-colors" href="#research">Research</a>
            <a className="text-on-surface-variant hover:text-primary font-label-lg transition-colors" href="#pillars">Pillars</a>
            <a className="text-on-surface-variant hover:text-primary font-label-lg transition-colors" href="#contact">Contact</a>
            <Link to="/blogs" className="text-on-surface-variant hover:text-primary font-label-lg transition-colors">Blogs</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center justify-center p-2 text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </nav>

        {/* Mobile Nav Dropdown */}
        <div 
          className={`md:hidden absolute top-full left-0 w-full bg-surface shadow-lg flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-[400px] border-b border-outline-variant/20 opacity-100" : "max-h-0 border-b-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="py-4 px-grid-margin flex flex-col gap-4">
            <a onClick={() => setIsMobileMenuOpen(false)} className="text-secondary font-label-lg py-2" href="#about">Home</a>
            <a onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface-variant hover:text-primary font-label-lg py-2" href="#research">Research</a>
            <a onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface-variant hover:text-primary font-label-lg py-2" href="#pillars">Pillars</a>
            <a onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface-variant hover:text-primary font-label-lg py-2" href="#contact">Contact</a>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/blogs" className="text-on-surface-variant hover:text-primary font-label-lg py-2">Blogs</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="relative bg-surface-container-lowest py-16 md:py-40 overflow-hidden">
        <div className="max-w-container-max-width mx-auto px-grid-margin grid lg:grid-cols-12 items-center gap-10 md:gap-16">
          <div className="lg:col-span-7 relative z-10">
            <h1 className="font-headline-xl text-5xl md:text-6xl text-primary mb-8 leading-[1.1] tracking-tight">
              Redefining the Future of <br/> Clinical Pharmacology
            </h1>
            <p className="font-body-lg text-xl text-on-surface-variant mb-12 max-w-xl leading-relaxed">
              An authoritative perspective on pharmaceutical safety, global healthcare innovation, and the transformative integration of AI in modern medical education.
            </p>
            <div className="flex flex-wrap gap-5">
              <a href="https://linktr.ee/Prof.AzzaBaraka" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-on-primary font-label-lg rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Visit Linktree <span className="material-symbols-outlined">open_in_new</span>
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-4 bg-primary-fixed/30 rounded-[2rem] blur-2xl group-hover:bg-primary-fixed/40 transition-colors"></div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
              <img alt="Portrait of Prof. Dr. Azza Baraka" className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" src={`${import.meta.env.BASE_URL}dr.azza.jpg`} onError={(e) => { e.target.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuA70UEdzSHw0w9kdXYyTRwNesHOGB_p5ll3FPTrGBy1ssK9JISH5FKvPZlljUSkTdxuSN8ENhgXHYW5qWSdoyAwBi2MKj95J_nHplqRCHa1pzR2GUdq2HvaoAj1RhQasHQLTTn1jWf5uLCurRKF7hfBwHDb1UsWCBdDzt18CJmszA94EgDQ-kMBuW9-dKKWzIZeK0g89KeOcYxRgwuYkSM0oyH3OCf15fx2XAbNnFtdGZx0PEJJ5IDp_2fk9X_ik1UVbcBVWnh9Rk4" }}/>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            </div>
            <div className="absolute -bottom-4 left-4 md:-bottom-8 md:-left-8 bg-white/95 backdrop-blur-sm p-4 md:p-6 shadow-2xl rounded-2xl border border-outline-variant/30 max-w-[240px]">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-secondary-container text-on-secondary-container rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">verified_user</span>
                </div>
                <div>
                  <p className="font-headline-md text-lg text-primary leading-tight">40+ Years</p>
                  <p className="text-sm text-on-surface-variant mt-1">Clinical Leadership & Global Education</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 400Q0 300 100 300T200 200T300 100T400 0" fill="none" stroke="currentColor" strokeWidth="1"></path>
            <path d="M0 350Q50 350 150 250T250 150T350 50T400 50" fill="none" stroke="currentColor" strokeWidth="1"></path>
            <path d="M0 450Q50 350 150 350T250 250T350 150T400 150" fill="none" stroke="currentColor" strokeWidth="1"></path>
          </svg>
        </div>
      </section>

      {/* Blogs & Insights Overview */}
      <section className="py-section-gap bg-surface border-b border-outline-variant/10 text-center">
         <div className="max-w-container-max-width mx-auto px-grid-margin">
            <h2 className="font-headline-lg text-3xl md:text-4xl text-primary mb-6">Insights & Articles</h2>
            <p className="text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto mb-10 px-4 md:px-0">
              Explore recent publications, professional thoughts, and articles covering clinical pharmacology, digital transformation, and medical education.
            </p>
            <Link to="/blogs" className="inline-flex items-center gap-2 px-10 py-5 bg-secondary-container text-on-secondary-container font-label-lg rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Explore All Blogs <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
         </div>
      </section>

      {/* Awards Showcase Enhancement */}
      <section id="awards" className="py-section-gap bg-surface border-y border-outline-variant/10 overflow-hidden">
        <div className="max-w-container-max-width mx-auto px-grid-margin">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="font-headline-lg text-4xl text-primary mb-6">Distinguished Global Recognition</h2>
            <p className="text-on-surface-variant text-lg">Honored for pioneering contributions to digital health transformation and AI-enabled healthcare systems across the African continent.</p>
            <div className="w-20 h-1 bg-secondary-container mx-auto mt-8 rounded-full"></div>
          </div>
          <div className="flex flex-col gap-12">
            {/* Featured Large Award */}
            <div 
              className="grid md:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-8 md:p-12 border border-outline-variant/30 shadow-sm hover:shadow-md transition-all cursor-pointer group/card"
              onClick={() => setSelectedImage(`${import.meta.env.BASE_URL}awards/award-0.jpg`)}
            >
              <div className="md:col-span-5 award-shine rounded-xl overflow-hidden bg-surface-container-highest p-4 flex items-center justify-center group-hover/card:opacity-90 transition-opacity">
                <img alt="Africa Digital Health Innovation Award" className="w-full h-auto object-contain max-h-[400px]" src={`${import.meta.env.BASE_URL}awards/award-0.jpg`} />
              </div>
              <div className="md:col-span-7 pl-0 md:pl-8">
                <span className="text-secondary font-label-lg tracking-widest uppercase text-xs mb-4 block">Key Achievement</span>
                <h3 className="font-headline-md text-3xl text-primary mb-4">Africa Digital Health Innovation Award</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-6">Recognized for shaping the future of healthcare across Africa through innovative digital frameworks and strategic technology implementation.</p>
                <div className="flex items-center gap-2 text-primary font-label-lg">
                  <span className="material-symbols-outlined">event_available</span>
                  <span>Official Recognition of Digital Transformation</span>
                </div>
              </div>
            </div>

            {/* Grid for other awards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div 
                className="bg-white rounded-2xl p-4 border border-outline-variant/30 flex flex-col group hover:border-secondary transition-colors cursor-pointer hover:shadow-md"
                onClick={() => setSelectedImage(`${import.meta.env.BASE_URL}awards/award-1.jpg`)}
              >
                <div className="mb-4 overflow-hidden rounded-xl shadow-sm award-shine bg-surface-container-highest p-2 group-hover:opacity-90 transition-opacity">
                  <img alt="Rising Digital Transformer Award" className="w-full h-auto object-contain" src={`${import.meta.env.BASE_URL}awards/award-1.jpg`} />
                </div>
                <h4 className="font-headline-md text-xl text-primary mb-2">Rising Digital Transformer</h4>
                <span className="text-xs font-label-lg text-secondary uppercase tracking-wider mt-auto">Africa Health 1st Award</span>
              </div>
              
              <div 
                className="bg-white rounded-2xl p-4 border border-outline-variant/30 flex flex-col group hover:border-secondary transition-colors cursor-pointer hover:shadow-md"
                onClick={() => setSelectedImage(`${import.meta.env.BASE_URL}awards/award-2.jpg`)}
              >
                <div className="mb-4 overflow-hidden rounded-xl shadow-sm award-shine bg-surface-container-highest p-2 group-hover:opacity-90 transition-opacity">
                  <img alt="AI-Enabled Healthcare Transformation" className="w-full h-auto object-contain" src={`${import.meta.env.BASE_URL}awards/award-2.jpg`} />
                </div>
                <h4 className="font-headline-md text-xl text-primary mb-2">Healthcare AI Transformation</h4>
                <span className="text-xs font-label-lg text-secondary uppercase tracking-wider mt-auto">Africa Health 2nd Award</span>
              </div>

              <div 
                className="bg-white rounded-2xl p-4 border border-outline-variant/30 flex flex-col group hover:border-secondary transition-colors cursor-pointer hover:shadow-md"
                onClick={() => setSelectedImage(`${import.meta.env.BASE_URL}awards/award-3.jpg`)}
              >
                <div className="mb-4 overflow-hidden rounded-xl shadow-sm award-shine bg-surface-container-highest p-2 group-hover:opacity-90 transition-opacity">
                  <img alt="Operational AI & Tech Excellence" className="w-full h-auto object-contain" src={`${import.meta.env.BASE_URL}awards/award-3.jpg`} />
                </div>
                <h4 className="font-headline-md text-xl text-primary mb-2">Operational Excellence</h4>
                <span className="text-xs font-label-lg text-secondary uppercase tracking-wider mt-auto">Africa Health 3rd Award</span>
              </div>
              
              <div 
                className="bg-white rounded-2xl p-4 border border-outline-variant/30 flex flex-col group hover:border-secondary transition-colors cursor-pointer hover:shadow-md"
                onClick={() => setSelectedImage(`${import.meta.env.BASE_URL}awards/award-4.jpg`)}
              >
                <div className="mb-4 overflow-hidden rounded-xl shadow-sm award-shine bg-surface-container-highest p-2 group-hover:opacity-90 transition-opacity">
                  <img alt="Social Health Impact Award" className="w-full h-auto object-contain" src={`${import.meta.env.BASE_URL}awards/award-4.jpg`} />
                </div>
                <h4 className="font-headline-md text-xl text-primary mb-2">Social Health Impact</h4>
                <span className="text-xs font-label-lg text-secondary uppercase tracking-wider mt-auto">Africa Health 4th Award</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars Redesign */}
      <section id="pillars" className="py-section-gap bg-surface-container-lowest">
        <div className="max-w-container-max-width mx-auto px-grid-margin">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-headline-lg text-3xl md:text-4xl text-primary mb-6">Strategic Academic Pillars</h2>
              <p className="font-body-md text-lg text-on-surface-variant leading-relaxed">Our methodology bridges foundational clinical pharmacology with avant-garde digital transformation to create a sustainable, global healthcare framework.</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 group">
              <div className="relative h-full bg-primary p-8 md:p-14 rounded-[2rem] md:rounded-[2.5rem] text-on-primary overflow-hidden pillar-card-hover transition-transform duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 -translate-y-1/2 translate-x-1/2 rounded-full"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-4xl text-secondary-fixed">medication</span>
                  </div>
                  <h3 className="font-headline-md text-3xl mb-6">Medication Safety Protocols</h3>
                  <p className="font-body-md text-lg text-primary-fixed/80 leading-relaxed mb-10">Implementing global standard frameworks designed to eliminate pharmaceutical errors and maximize clinical outcomes through rigorous monitoring systems.</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/20 pillar-card-hover transition-transform duration-500">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm">
                  <span className="material-symbols-outlined text-primary">school</span>
                </div>
                <h3 className="font-headline-md text-xl text-primary mb-4">Medical Education</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">Advancing pedagogical methods in clinical pharmacology for digital-native healthcare professionals.</p>
              </div>
              <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/20 pillar-card-hover transition-transform duration-500">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm">
                  <span className="material-symbols-outlined text-primary">science</span>
                </div>
                <h3 className="font-headline-md text-xl text-primary mb-4">Evidence-Based Practice</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">Rooting all clinical transformation in rigorous, peer-reviewed data and scientific validation.</p>
              </div>
              <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/20 md:col-span-2 pillar-card-hover transition-transform duration-500">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-primary">health_and_safety</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-xl text-primary mb-2">Global Healthcare Quality</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">Systemic quality control standards to ensure global equity in medical treatment and safety outcomes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Human-Centered Research Section */}
      <section id="research" className="py-section-gap relative overflow-hidden bg-surface-bright">
        <div className="max-w-container-max-width mx-auto px-grid-margin">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl group">
                <img className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdGlNtEm_3UhNQOuQj6B1kR3KjwyWIwwQAoMtT17thOuByiaRnw3U84879sTvsy6ZwAgOV9HnxvkCagOjJs1Qwuh4F_fgwInPq35ci2fPsqp351m5QSmnR3X_Hq3ThNUVy7UJgf6I7ObTnGD1qL4sLBL1Nk6YvO5cbbIyLY6vM5nI96u-pbcIaiVqq0cf94E_H-xHXT6mNSEhr2ToPvadiLHwFJ-bwKHZfnJm_Z4hdT_ceaSBTgzfXifS0OFS7fvthOvOx_Kp1TT4" />
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
              </div>
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-secondary-fixed/50 rounded-full blur-3xl -z-10"></div>
            </div>
            <div className="lg:col-span-7">
              <div className="max-w-2xl">
                <h2 className="font-headline-lg text-4xl lg:text-5xl text-primary mb-10 leading-tight">Pioneering Clinical Pharmacology & Human-Centric Innovation</h2>
                <div className="space-y-12">
                  <div className="flex gap-8 group">
                    <div className="shrink-0 w-14 h-14 bg-white rounded-2xl border border-outline-variant/30 flex items-center justify-center group-hover:border-secondary transition-colors shadow-sm">
                      <span className="material-symbols-outlined text-primary">analytics</span>
                    </div>
                    <div>
                      <h4 className="font-headline-md text-xl text-primary mb-3">Analytical Frameworks</h4>
                      <p className="font-body-md text-on-surface-variant leading-relaxed">Developing sophisticated drug interaction modeling systems that prioritize patient-specific physiological nuances.</p>
                    </div>
                  </div>
                  <div className="flex gap-8 group">
                    <div className="shrink-0 w-14 h-14 bg-white rounded-2xl border border-outline-variant/30 flex items-center justify-center group-hover:border-secondary transition-colors shadow-sm">
                      <span className="material-symbols-outlined text-primary">psychology</span>
                    </div>
                    <div>
                      <h4 className="font-headline-md text-xl text-primary mb-3">Ethical AI Integration</h4>
                      <p className="font-body-md text-on-surface-variant leading-relaxed">Guiding the integration of machine learning in healthcare to serve as a supportive tool for clinical decision makers, not a replacement.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-16 relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-secondary-fixed rounded-full"></div>
                  <blockquote className="pl-8 py-2">
                    <p className="font-headline-md text-2xl text-primary italic leading-relaxed mb-6">"Our mission is to translate complex pharmaceutical data into safe, actionable healthcare outcomes that empower both doctors and patients."</p>
                    <cite className="not-italic flex items-center gap-3">
                      <span className="w-10 h-[1px] bg-outline"></span>
                      <span className="font-label-lg text-on-surface-variant">Prof. Dr. Azza Baraka</span>
                    </cite>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer id="contact" className="bg-primary text-on-primary">
        <div className="max-w-container-max-width mx-auto px-grid-margin py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-5">
              <div className="font-headline-md text-3xl mb-8">Prof. Dr. Azza Baraka</div>
              <p className="text-primary-fixed/70 text-lg leading-relaxed mb-10 max-w-sm">
                A legacy of academic authority, dedicated to elevating global healthcare through clinical safety and digital excellence.
              </p>
              <div className="flex flex-wrap gap-4">
                <a aria-label="Facebook" className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-white hover:text-primary-fixed" href="https://www.facebook.com/azza.baraka.5" target="_blank" rel="noopener noreferrer">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                </a>
                <a aria-label="Instagram" className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-white hover:text-primary-fixed" href="https://instagram.com/azzabaraka1" target="_blank" rel="noopener noreferrer">
                  <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-6 h-6"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a aria-label="YouTube" className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-white hover:text-primary-fixed" href="https://www.youtube.com/@dr.azzabaraka784" target="_blank" rel="noopener noreferrer">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
                <a aria-label="LinkedIn" className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-white hover:text-primary-fixed" href="https://www.linkedin.com/in/azza-baraka-233aa92a8/" target="_blank" rel="noopener noreferrer">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </div>
            </div>
            <div className="md:col-span-7 grid grid-cols-2 gap-8">
              <div>
                <h5 className="font-label-lg text-white mb-8 tracking-widest uppercase text-xs">Resources</h5>
                <ul className="space-y-5 text-primary-fixed/80">
                  <li><a className="hover:text-white transition-colors" href="#">Academic Affiliations</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Research Publications</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Clinical Protocols</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-label-lg text-white mb-8 tracking-widest uppercase text-xs">Expertise</h5>
                <ul className="space-y-5 text-primary-fixed/80">
                  <li><a className="hover:text-white transition-colors" href="#">Clinical Pharmacology</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Digital Health AI</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Medication Adherence</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Pedagogical Innovation</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-primary-fixed/40 text-sm">© 2026 Prof. Dr. Azza Baraka. All Rights Reserved. </p>
            <div className="flex gap-8 text-xs font-label-lg text-primary-fixed/40 uppercase tracking-widest">
              <a className="hover:text-white" href="#">Terms</a>
              <a className="hover:text-white" href="#">Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full text-white flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
          <img 
            src={selectedImage} 
            alt="Award Full View" 
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
