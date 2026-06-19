import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFullTimeline, setShowFullTimeline] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-4');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-4');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-surface text-text-primary">
      {/* Navigation */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-border-light sticky top-0 z-50">
        <nav className="flex justify-between items-center w-full max-w-page mx-auto px-grid-margin py-4">
          <a href="#about" className="font-display text-display-md text-primary">
            Dr. Azza Baraka
          </a>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "About", href: "#about" },
              { label: "Research", href: "#research" },
              { label: "Recognition", href: "#awards" },
              { label: "Career", href: "#career" },
              { label: "Contact", href: "#contact" },
            ].map(link => (
              <a key={link.href} href={link.href} className="text-body-sm text-text-secondary hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
            <Link to="/blogs" className="text-body-sm text-text-secondary hover:text-primary transition-colors">
              Insights
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </nav>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}>
          <div className="px-grid-margin pb-6 flex flex-col gap-3">
            {[
              { label: "About", href: "#about" },
              { label: "Research", href: "#research" },
              { label: "Recognition", href: "#awards" },
              { label: "Career", href: "#career" },
              { label: "Contact", href: "#contact" },
            ].map(link => (
              <a key={link.href} onClick={() => setIsMobileMenuOpen(false)} href={link.href} className="text-body-md text-text-secondary hover:text-primary py-2 transition-colors">
                {link.label}
              </a>
            ))}
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/blogs" className="text-body-md text-text-secondary hover:text-primary py-2 transition-colors">
              Insights
            </Link>
          </div>
        </div>
      </header>

      {/* Hero - Asymmetric Split */}
      <section id="about" className="relative bg-surface py-16 md:py-24 overflow-hidden">
        <div className="max-w-page mx-auto px-grid-margin grid lg:grid-cols-12 items-center gap-12 lg:gap-16">
          <div className="lg:col-span-7 relative z-10" data-reveal>
            <h1 className="font-display text-display-xl text-primary mb-6">
              Clinical Pharmacology,<br/>
              Medication Safety, and<br/>
              Digital Health Innovation
            </h1>
            <p className="text-body-lg text-text-secondary max-w-[55ch] mb-8">
              Professor at the University of Alexandria with 50+ peer-reviewed publications and 1,414 citations advancing pharmaceutical safety and AI-enabled healthcare systems.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="https://scholar.google.com.eg/citations?user=EzktP3AAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-display text-body-sm font-semibold rounded-lg hover:bg-primary-light transition-colors">
                Google Scholar
                <span className="material-symbols-outlined text-lg">open_in_new</span>
              </a>
              <a href="https://linktr.ee/Prof.AzzaBaraka" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-border text-primary font-display text-body-sm font-semibold rounded-lg hover:bg-surface-alt transition-colors">
                All Links
              </a>
            </div>
          </div>

          <div className="lg:col-span-5" data-reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <img
                alt="Prof. Dr. Azza Baraka"
                className="w-full h-full object-cover"
                src={`${import.meta.env.BASE_URL}dr.azza.jpg`}
                onError={(e) => { e.target.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuA70UEdzSHw0w9kdXYyTRwNesHOGB_p5ll3FPTrGBy1ssK9JISH5FKvPZlljUSkTdxuSN8ENhgXHYW5qWSdoyAwBi2MKj95J_nHplqRCHa1pzR2GUdq2HvaoAj1RhQasHQLTTn1jWf5uLCurRKF7hfBwHDb1UsWCBdDzt18CJmszA94EgDQ-kMBuW9-dKKWzIZeK0g89KeOcYxRgwuYkSM0oyH3OCf15fx2XAbNnFtdGZx0PEJJ5IDp_2fk9X_ik1UVbcBVWnh9Rk4" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Insights CTA - Minimal */}
      <section className="py-section-gap bg-surface-alt">
        <div className="max-w-page mx-auto px-grid-margin text-center" data-reveal>
          <h2 className="font-display text-display-lg text-primary mb-4">Insights and Articles</h2>
          <p className="text-body-md text-text-secondary max-w-lg mx-auto mb-8">
            Publications on clinical pharmacology, digital transformation, and medical education.
          </p>
          <Link to="/blogs" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-display text-body-sm font-semibold rounded-lg hover:bg-primary-light transition-colors">
            Read Articles
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Awards - Asymmetric Grid */}
      <section id="awards" className="py-section-gap bg-surface overflow-hidden">
        <div className="max-w-page mx-auto px-grid-margin">
          <h2 className="font-display text-display-lg text-primary mb-4" data-reveal>Global Recognition</h2>
          <p className="text-body-md text-text-secondary max-w-xl mb-12" data-reveal>
            Honored for contributions to digital health transformation and AI-enabled healthcare across Africa.
          </p>

          <div className="grid md:grid-cols-12 gap-6" data-reveal>
            {/* Large featured award */}
            <div
              className="md:col-span-7 group cursor-pointer rounded-xl overflow-hidden bg-surface-alt relative"
              onClick={() => setSelectedImage(`${import.meta.env.BASE_URL}awards/award-0.jpg`)}
            >
              <div className="p-6 md:p-8 flex flex-col h-full">
                <div className="flex-1 flex items-center justify-center mb-6">
                  <img alt="Africa Digital Health Innovation Award" className="max-h-[320px] w-auto object-contain group-hover:scale-[1.02] transition-transform duration-500" src={`${import.meta.env.BASE_URL}awards/award-0.jpg`} />
                </div>
                <h3 className="font-display text-display-md text-primary">Africa Digital Health Innovation Award</h3>
                <p className="text-body-sm text-text-secondary mt-2">Recognized for shaping digital healthcare frameworks across the African continent.</p>
              </div>
            </div>

            {/* Stacked smaller awards */}
            <div className="md:col-span-5 grid grid-cols-2 gap-6">
              {[
                { img: "award-1.jpg", title: "Rising Digital Transformer" },
                { img: "award-2.jpg", title: "Healthcare AI Transformation" },
                { img: "award-3.jpg", title: "Operational Excellence" },
                { img: "award-4.jpg", title: "Social Health Impact" },
              ].map((award, i) => (
                <div
                  key={i}
                  className="group cursor-pointer rounded-xl bg-surface-alt p-4 flex flex-col"
                  onClick={() => setSelectedImage(`${import.meta.env.BASE_URL}awards/${award.img}`)}
                >
                  <div className="flex-1 flex items-center justify-center mb-3">
                    <img alt={award.title} className="max-h-[140px] w-auto object-contain group-hover:scale-[1.02] transition-transform duration-500" src={`${import.meta.env.BASE_URL}awards/${award.img}`} />
                  </div>
                  <p className="font-display text-body-sm font-semibold text-primary leading-tight">{award.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars - Clean Vertical Stack */}
      <section id="pillars" className="py-section-gap bg-primary text-white">
        <div className="max-w-page mx-auto px-grid-margin">
          <h2 className="font-display text-display-lg mb-4" data-reveal>Strategic Academic Pillars</h2>
          <p className="text-white/70 text-body-md max-w-xl mb-16" data-reveal>
            Bridging clinical pharmacology with digital transformation for sustainable global healthcare.
          </p>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12" data-reveal>
            {[
              {
                icon: "medication",
                title: "Medication Safety",
                desc: "Implementing global frameworks to eliminate pharmaceutical errors through rigorous clinical monitoring systems."
              },
              {
                icon: "school",
                title: "Medical Education",
                desc: "Advancing pedagogical methods in clinical pharmacology for digital-native healthcare professionals."
              },
              {
                icon: "science",
                title: "Evidence-Based Practice",
                desc: "Rooting clinical transformation in rigorous, peer-reviewed data and scientific validation."
              },
              {
                icon: "health_and_safety",
                title: "Healthcare Quality",
                desc: "Systemic quality control standards ensuring global equity in medical treatment and safety outcomes."
              },
            ].map((pillar, i) => (
              <div key={i} className="flex gap-5">
                <div className="shrink-0 w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">{pillar.icon}</span>
                </div>
                <div>
                  <h3 className="font-display text-display-md text-white mb-2">{pillar.title}</h3>
                  <p className="text-white/60 text-body-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research - Left-aligned, no split header */}
      <section id="research" className="py-section-gap bg-surface">
        <div className="max-w-page mx-auto px-grid-margin">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5" data-reveal>
              <div className="rounded-xl overflow-hidden">
                <img
                  className="w-full aspect-[4/3] object-cover"
                  alt="Clinical pharmacology research"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdGlNtEm_3UhNQOuQj6B1kR3KjwyWIwwQAoMtT17thOuByiaRnw3U84879sTvsy6ZwAgOV9HnxvkCagOjJs1Qwuh4F_fgwInPq35ci2fPsqp351m5QSmnR3X_Hq3ThNUVy7UJgf6I7ObTnGD1qL4sLBL1Nk6YvO5cbbIyLY6vM5nI96u-pbcIaiVqq0cf94E_H-xHXT6mNSEhr2ToPvadiLHwFJ-bwKHZfnJm_Z4hdT_ceaSBTgzfXifS0OFS7fvthOvOx_Kp1TT4"
                />
              </div>
            </div>

            <div className="lg:col-span-7" data-reveal>
              <h2 className="font-display text-display-lg text-primary mb-6">Pioneering Clinical Pharmacology</h2>
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center">
                    <span className="material-symbols-outlined text-accent text-xl">analytics</span>
                  </div>
                  <div>
                    <h3 className="font-display text-display-md text-primary mb-2">Analytical Frameworks</h3>
                    <p className="text-body-sm text-text-secondary leading-relaxed">Developing drug interaction modeling systems that prioritize patient-specific physiological variables.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center">
                    <span className="material-symbols-outlined text-accent text-xl">psychology</span>
                  </div>
                  <div>
                    <h3 className="font-display text-display-md text-primary mb-2">Ethical AI Integration</h3>
                    <p className="text-body-sm text-text-secondary leading-relaxed">Guiding the integration of machine learning in healthcare as a supportive tool, not a replacement for clinical judgment.</p>
                  </div>
                </div>
              </div>

              <blockquote className="mt-12 pl-5 border-l-2 border-accent">
                <p className="font-display text-display-md text-primary italic leading-snug">"Translating complex pharmaceutical data into safe, actionable outcomes for doctors and patients."</p>
                <cite className="not-italic text-body-sm text-muted mt-3 block">Prof. Dr. Azza Baraka</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Timeline - Single Column, Clean */}
      <section id="career" className="py-section-gap bg-surface-alt">
        <div className="max-w-page mx-auto px-grid-margin">
          <h2 className="font-display text-display-lg text-primary mb-4" data-reveal>Academic Journey</h2>
          <p className="text-body-md text-text-secondary max-w-xl mb-12" data-reveal>
            Three decades at the Faculty of Medicine, University of Alexandria.
          </p>

          <div className="max-w-2xl" data-reveal>
            <div className="border-l-2 border-border pl-8 space-y-10">
              {[
                { year: "2020 - Present", title: "Head of Quality Assurance Unit", sub: "Faculty of Medicine, Alexandria University" },
                { year: "2020 - Present", title: "Coordinator, House Officers Training Board", sub: "Faculty of Medicine, Alexandria University" },
                { year: "2011 - Present", title: "Professor of Clinical Pharmacology", sub: "Faculty of Medicine, University of Alexandria" },
                { year: "2006 - 2011", title: "Assistant Professor", sub: "Faculty of Medicine, University of Alexandria" },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[calc(2rem+5px)] top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-surface-alt"></div>
                  <p className="text-label text-accent uppercase mb-1">{item.year}</p>
                  <h3 className="font-display text-display-md text-primary">{item.title}</h3>
                  <p className="text-body-sm text-text-secondary mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>

            {!showFullTimeline && (
              <button
                onClick={() => setShowFullTimeline(true)}
                className="mt-8 text-body-sm text-accent font-semibold hover:underline transition-colors"
              >
                View earlier positions
              </button>
            )}

            {showFullTimeline && (
              <div className="border-l-2 border-border pl-8 space-y-10 mt-10">
                {[
                  { year: "2012 - 2020", title: "Deputy Head, Quality Assurance Unit", sub: "Faculty of Medicine, Alexandria University" },
                  { year: "2001 - 2006", title: "Lecturer of Clinical Pharmacology", sub: "Faculty of Medicine, University of Alexandria" },
                  { year: "1996 - 2001", title: "Assistant Lecturer", sub: "Faculty of Medicine, University of Alexandria" },
                  { year: "1991 - 1996", title: "Demonstrator of Clinical Pharmacology", sub: "Faculty of Medicine, University of Alexandria" },
                ].map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[calc(2rem+5px)] top-1.5 w-3 h-3 rounded-full bg-border border-2 border-surface-alt"></div>
                    <p className="text-label text-muted uppercase mb-1">{item.year}</p>
                    <h3 className="font-display text-display-md text-primary">{item.title}</h3>
                    <p className="text-body-sm text-text-secondary mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Publications and Roles - 2-column */}
      <section className="py-section-gap bg-surface">
        <div className="max-w-page mx-auto px-grid-margin">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7" data-reveal>
              <h2 className="font-display text-display-lg text-primary mb-4">Publications and Research</h2>
              <p className="text-body-md text-text-secondary mb-8">
                50 articles in international peer-reviewed journals with <strong className="text-primary font-semibold">1,414 total citations</strong>. Supervised 6 Master theses, 5 MD theses, and 1 PhD thesis.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://scholar.google.com.eg/citations?user=EzktP3AAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-body-sm font-semibold rounded-lg hover:bg-primary-light transition-colors">
                  <span className="material-symbols-outlined text-lg">school</span>Google Scholar
                </a>
                <a href="https://orcid.org/0000-0002-3437-6669" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-primary text-body-sm font-semibold rounded-lg hover:bg-surface-alt transition-colors">
                  <span className="material-symbols-outlined text-lg">badge</span>ORCID
                </a>
              </div>
            </div>

            <div className="lg:col-span-5" data-reveal>
              <h3 className="font-display text-display-md text-primary mb-4">Journal Reviewer</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-10">
                {[
                  "Biochemical Pharmacology",
                  "European J. of Pharmacology",
                  "American J. of Medical Sciences",
                  "Archives of Medical Research",
                  "Complementary Medicine",
                  "Neurological Research",
                  "CNS Neuroscience",
                  "PNAS Biological Sciences",
                ].map((j, i) => (
                  <p key={i} className="text-body-sm text-text-secondary py-1">{j}</p>
                ))}
              </div>

              <h3 className="font-display text-display-md text-primary mb-4">Memberships</h3>
              <div className="grid grid-cols-1 gap-y-2">
                {[
                  "Egyptian Pharmacological Society",
                  "General Egyptian Syndicate of Doctors",
                  "Scientific Society, Faculty of Pharmacy",
                  "Scientific Society, Students Hospital",
                ].map((m, i) => (
                  <p key={i} className="text-body-sm text-text-secondary py-1">{m}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-primary text-white">
        <div className="max-w-page mx-auto px-grid-margin py-16 md:py-20">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-6" data-reveal>
              <h2 className="font-display text-display-lg mb-6">Prof. Dr. Azza Baraka</h2>
              <div className="text-white/60 text-body-sm space-y-1 mb-8">
                <p>Department of Clinical Pharmacology</p>
                <p>Faculty of Medicine, University of Alexandria</p>
                <p>Alexandria 21521, Egypt</p>
              </div>
              <div className="space-y-2 mb-8">
                <a href="mailto:azzabarakamnh@gmail.com" className="flex items-center gap-2 text-white/70 hover:text-white text-body-sm transition-colors">
                  <span className="material-symbols-outlined text-base">mail</span>azzabarakamnh@gmail.com
                </a>
                <a href="mailto:azza.baraka@alexmed.edu.eg" className="flex items-center gap-2 text-white/70 hover:text-white text-body-sm transition-colors">
                  <span className="material-symbols-outlined text-base">mail</span>azza.baraka@alexmed.edu.eg
                </a>
              </div>
              <div className="flex gap-3">
                <a aria-label="Facebook" className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors" href="https://www.facebook.com/azza.baraka.5" target="_blank" rel="noopener noreferrer">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                </a>
                <a aria-label="Instagram" className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors" href="https://instagram.com/azzabaraka1" target="_blank" rel="noopener noreferrer">
                  <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a aria-label="YouTube" className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors" href="https://www.youtube.com/@dr.azzabaraka784" target="_blank" rel="noopener noreferrer">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
                <a aria-label="LinkedIn" className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors" href="https://www.linkedin.com/in/azza-baraka-233aa92a8/" target="_blank" rel="noopener noreferrer">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </div>
            </div>

            <div className="md:col-span-6 grid grid-cols-2 gap-8" data-reveal>
              <div>
                <h3 className="text-label text-white uppercase tracking-wider mb-6">Navigate</h3>
                <ul className="space-y-3 text-white/60 text-body-sm">
                  <li><a className="hover:text-white transition-colors" href="#about">About</a></li>
                  <li><a className="hover:text-white transition-colors" href="#research">Research</a></li>
                  <li><a className="hover:text-white transition-colors" href="#awards">Recognition</a></li>
                  <li><a className="hover:text-white transition-colors" href="#career">Career</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-label text-white uppercase tracking-wider mb-6">Academic</h3>
                <ul className="space-y-3 text-white/60 text-body-sm">
                  <li><a className="hover:text-white transition-colors" href="https://scholar.google.com.eg/citations?user=EzktP3AAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Google Scholar</a></li>
                  <li><a className="hover:text-white transition-colors" href="https://orcid.org/0000-0002-3437-6669" target="_blank" rel="noopener noreferrer">ORCID</a></li>
                  <li><a className="hover:text-white transition-colors" href="https://linktr.ee/Prof.AzzaBaraka" target="_blank" rel="noopener noreferrer">Linktree</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-6 border-t border-white/10 text-white/30 text-body-sm">
            <p>2026 Prof. Dr. Azza Baraka. University of Alexandria.</p>
          </div>
        </div>
      </footer>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full text-white flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
          <img
            src={selectedImage}
            alt="Award detail"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
