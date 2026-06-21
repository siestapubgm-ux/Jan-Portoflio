'use client';

import { useEffect, useRef, useState } from 'react';


const PROFILE = {
  name: 'Jan Cornelius Miguel Alcaide',
  role: 'Full-Stack Developer & AI/ML',
  location: 'Tuguegarao City, Cagayan, Philippines',
  tagline: 'I build web and AI-powered systems that real teams depend on every day.',
  status: 'available for work',
  email: 'jan.alcaide0501@gmail.com',
  phone: '+63 968 715 1176',
  socials: [
    { label: 'GitHub', href: 'https://github.com/siestapubgm-ux' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jan-cornelius-miguel-alcaide-619a07393/' },
    { label: 'Email', href: 'mailto:jan.alcaide0501@gmail.com' },
  ],
};

const STACK = [
  'TypeScript', 'React', 'Next.js', 'Laravel',
  'Python', 'Java', 'C++', 'SQL',
  'Artificial Intelligence', 'Machine Learning',
];

const PROJECTS = [
  {
    name: 'SDO Budget Monitoring System',
    path: '/projects/sdo-budget-monitoring',
    description:
      'A role-based budget monitoring and tracking system built for DepEd SDO Cagayan, serving over ten distinct user roles including Budget Officer, Accountant, SDS, Program Owner, and PMIS Coordinator. Features live budget sync via Supabase Realtime, a notifications system with database-level triggers, and dedicated dashboards with quick-action workflows for each role.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    href: 'https://sdo-budget-monitoring-qk39cvjoq-siestapubgm-uxs-projects.vercel.app/login',
    status: 'live',
    modalMessage: null,
  },
  {
    name: 'DICT Supplier Management System',
    path: '/projects/dict-supplier-management',
    description:
      'A centralized platform built for the Department of Information and Communications Technology to streamline procurement and internal record-keeping. Optimized data architecture and navigation so administrative staff can efficiently manage, track, and retrieve supplier information.',
    stack: ['React', 'Laravel', 'SQL'],
    href: '#',
    status: 'archived',
    modalMessage: 'This project has been successfully delivered and handed over to the Department of Information and Communications Technology (DICT) for ongoing maintenance and operations. The system is now actively in use by their internal team.',
  },
  {
    name: 'Language Learning Client Interaction with AI Application',
    path: '/projects/language-learning-ai',
    description:
      'A real-time AI interaction module for a language learning platform, delivering instant feedback on grammar and pronunciation. Designed responsive interfaces to support interactive vocabulary exercises and natural-language simulation.',
    stack: ['AI', 'Machine Learning', 'React'],
    href: '#',
    status: 'in-progress',
    modalMessage: 'This project has been developed and delivered to Saint Paul University (SPUP) as part of an internship collaboration. The system continues to support interactive language learning experiences for their students and faculty.',
  },
  {
    name: 'Library Management System with AI Application',
    path: '/projects/library-management-ai',
    description:
      'A comprehensive web and mobile library management platform integrated with artificial intelligence to automate labor-intensive manual workflows and maximize overall operational efficiency.',
    stack: ['AI', 'React', 'SQL'],
    href: '#',
    status: 'in-progress',
    modalMessage: 'This project has been developed and delivered to Saint Paul University (SPUP). The system leverages AI to provide comprehensive library management solutions, enabling efficient operations and improved user experience for the institution.',
  },
];

const ABOUT_LINES = [
  "I'm a BS Information Technology graduate from Saint Paul University",
  'Philippines, based in Tuguegarao City, Cagayan. I focus on building',
  'practical systems — from procurement platforms to AI-powered learning',
  'and library tools — that solve real operational problems.',
  '',
  'I completed a Full-Stack Developer and Agentic AI industry internship',
  'with the Education Centre of Australia, interned with the Department of',
  'Information and Communications Technology, and I am Microsoft Certified',
  'in Azure AI Fundamentals (AI-900). I am an active member of the Junior',
  'Philippine Computer Society at Saint Paul University.',
];

const EXPERIENCE = [
  {
    role: 'Intern — Department of Information and Communications Technology',
    period: 'Feb 2026 – May 2026',
    points: [
      'Provided on-site technical support during departmental events and handled equipment setup.',
      'Contributed to the development of an internal system, implementing assigned components and features.',
    ],
  },
  {
    role: 'Full Stack Developer & Agentic AI Industry Project Internship — Education Centre of Australia',
    period: 'Sept 2025 – Dec 2025',
    points: [],
  },
];

const JOURNEY = [
  {
    year: '2022',
    title: 'Began BS Information Technology',
    org: 'Saint Paul University Philippines',
    detail: 'Started the journey — School of Information Technology and Engineering.',
  },
  {
    year: '2025',
    title: 'Full-Stack Developer & Agentic AI Internship',
    org: 'Education Centre of Australia',
    detail: 'Shipped production features across the stack while building agentic AI workflows.',
  },
  {
    year: '2026',
    title: 'Earned AI-900 Certification',
    org: 'Microsoft',
    detail: 'Certified in Azure AI Fundamentals — services, responsible AI, and ML basics.',
  },
  {
    year: '2026',
    title: 'DICT Internship',
    org: 'Department of Information and Communications Technology',
    detail: 'Delivered an internal supplier management system end to end.',
  },
  {
    year: 'Now',
    title: 'Leading SDO Budget Monitoring System',
    org: 'DepEd SDO Cagayan',
    detail: 'Building a multi-role, real-time budget platform serving ten+ user roles.',
  },
];

const RESUME = {
  education: [
    {
      school: 'Saint Paul University Philippines',
      credential: 'BS in Information Technology',
      period: '2022 – 2026',
      note: 'School of Information Technology and Engineering · Active member, Junior Philippine Computer Society',
    },
  ],
  certifications: [
    {
      name: 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
      issuer: 'Microsoft',
    },
  ],
  skills: {
    languages: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C++', 'SQL'],
    frameworks: ['React', 'Next.js', 'Laravel', 'Tailwind CSS'],
    platforms: ['Supabase', 'PostgreSQL', 'Vercel', 'Git'],
    focus: ['Artificial Intelligence', 'Machine Learning', 'Role-based system design'],
  },
};

type ResumeTab = 'experience' | 'skills' | 'education';

type ChatMessage = { role: 'bot' | 'user'; text: string };

const CHAT_SUGGESTIONS: { label: string; prompt: string }[] = [
  {
    label: 'Tell me about yourself',
    prompt:
      "Give me a friendly introduction to Jan — who he is, what he's focused on, and what kind of work he's looking for.",
  },
  {
    label: 'Your projects',
    prompt:
      "What are Jan's main projects? Give a quick rundown of each one and the tech stack used.",
  },
  {
    label: 'Contact info',
    prompt: "How can I get in touch with Jan? Share his contact details.",
  },
  {
    label: 'Skills & experience',
    prompt:
      "What are Jan's technical skills and work experience? Summarize his background.",
  },
];


async function getBotReply(
  message: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error ?? 'Something went wrong.');
  }

  return data.reply as string;
}


function useTypewriter(lines: string[], speed = 28, startDelay = 200) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let lineIdx = 0;
    let charIdx = 0;
    const out: string[] = [''];

    const tick = () => {
      if (cancelled) return;
      if (lineIdx >= lines.length) {
        setDone(true);
        return;
      }
      const currentLine = lines[lineIdx];
      if (charIdx < currentLine.length) {
        out[lineIdx] = currentLine.slice(0, charIdx + 1);
        setDisplayed([...out]);
        charIdx++;
        setTimeout(tick, speed);
      } else {
        lineIdx++;
        charIdx = 0;
        out[lineIdx] = '';
        setTimeout(tick, speed * 4);
      }
    };

    const t = setTimeout(tick, startDelay);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  return { displayed, done };
}

function Cursor({ blink = true }: { blink?: boolean }) {
  return <span className={`cursor ${blink ? 'blink' : ''}`}>▍</span>;
}

function useReveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!('IntersectionObserver' in window) || targets.length === 0) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function SectionLabel({ path, title }: { path: string; title: string }) {
  return (
    <div className="section-label">
      <span className="path">{path}</span>
      <span className="rule" />
      <span className="title">{title}</span>
    </div>
  );
}

type Theme = 'dark' | 'light';

function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const saved = window.localStorage.getItem('theme') as Theme | null;
    const resolved: Theme =
      saved ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(resolved);
    document.documentElement.setAttribute('data-theme', resolved);
  }, []);

  const toggle = () => {
    setTheme((t) => {
      const next: Theme = t === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      window.localStorage.setItem('theme', next);
      return next;
    });
  };

  return { theme, toggle };
}

function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="theme-toggle-flag">--{theme}</span>
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-thumb">{theme === 'dark' ? '●' : '○'}</span>
      </span>
    </button>
  );
}

const GHIBLI_CLOUDS = [
  { id: 0, top: '6%', width: 340, height: 130, duration: 85, delay: 0 },
  { id: 1, top: '18%', width: 220, height: 90, duration: 110, delay: -30 },
  { id: 2, top: '40%', width: 280, height: 110, duration: 95, delay: -55 },
  { id: 3, top: '64%', width: 200, height: 80, duration: 120, delay: -15 },
];

const BIRDS = [
  { id: 0, top: '14%', size: 14, duration: 46, delay: -4 },
  { id: 1, top: '22%', size: 11, duration: 58, delay: -28 },
  { id: 2, top: '10%', size: 10, duration: 64, delay: -46 },
];

type Star = { id: number; left: number; top: number; size: number; duration: number; delay: number };

function useStars(count: number) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 55,
        size: 1 + Math.random() * 1.6,
        duration: 2.5 + Math.random() * 3.5,
        delay: -Math.random() * 6,
      }))
    );
  }, [count]);

  return stars;
}

function useParallax() {
  const farRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 1600);
        if (farRef.current) farRef.current.style.transform = `translateY(${y * 0.02}px)`;
        if (midRef.current) midRef.current.style.transform = `translateY(${y * 0.045}px)`;
        if (nearRef.current) nearRef.current.style.transform = `translateY(${y * 0.08}px)`;
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { farRef, midRef, nearRef };
}

function GhibliAtmosphere() {
  const { farRef, midRef, nearRef } = useParallax();
  const stars = useStars(60);

  return (
    <div className="ghibli-atmosphere" aria-hidden="true">
      <div className="stars-layer">
        {stars.map((s) => (
          <span
            key={s.id}
            className="star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="celestial-body" />
      <div className="ghibli-glow" />
      <div className="ghibli-clouds">
        {GHIBLI_CLOUDS.map((c) => (
          <span
            key={c.id}
            className="ghibli-cloud"
            style={{
              top: c.top,
              width: c.width,
              height: c.height,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="birds-layer">
        {BIRDS.map((b) => (
          <span
            key={b.id}
            className="bird-fly"
            style={{
              top: b.top,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
          >
            <span className="bird" style={{ width: b.size, height: b.size * 0.4 }} />
          </span>
        ))}
      </div>
      <div className="horizon-glow" />
      <div ref={farRef} className="mountain-layer mountain-far" />
      <div ref={midRef} className="mountain-layer mountain-mid" />
      <div ref={nearRef} className="mountain-layer mountain-near" />
    </div>
  );
}

export default function Home() {
  const { theme, toggle } = useTheme();
  useReveal();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [resumeTab, setResumeTab] = useState<ResumeTab>('experience');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'bot', text: "Hi! I'm Jan's AI assistant. How can I help you today?" },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages, chatLoading]);

  useEffect(() => {
    if (chatOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [chatOpen]);

  const handleProjectClick = (e: React.MouseEvent<HTMLElement>, project: typeof PROJECTS[0]) => {
    if (project.modalMessage) {
      e.preventDefault();
      setModalMessage(project.modalMessage);
      setModalOpen(true);
    }
  };

  const handleAvatarClick = () => {
    setResumeTab('experience');
    setResumeModalOpen(true);
  };

  const handleChatClick = () => {
    setChatOpen(!chatOpen);
  };

  const sendChatMessage = async (prompt: string, displayText?: string) => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || chatLoading) return;

    const shownText = (displayText ?? prompt).trim();
    const updatedMessages: ChatMessage[] = [...chatMessages, { role: 'user', text: shownText }];
    setChatMessages(updatedMessages);
    setChatInput('');
    setChatLoading(true);

    const history = chatMessages
      .slice(1)
      .map((m) => ({ role: m.role === 'bot' ? ('model' as const) : ('user' as const), text: m.text }));

    try {
      const reply = await getBotReply(trimmedPrompt, history);
      setChatMessages((prev) => [...prev, { role: 'bot', text: reply }]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { role: 'bot', text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendChatMessage(chatInput);
  };

  const heroLines = [
    `> whoami`,
    PROFILE.name,
    `> role`,
    PROFILE.role,
    `> status`,
    PROFILE.status,
  ];
  const { displayed, done } = useTypewriter(heroLines, 22, 300);

  const RESUME_TABS: { key: ResumeTab; label: string }[] = [
    { key: 'experience', label: 'experience' },
    { key: 'skills', label: 'skills' },
    { key: 'education', label: 'education' },
  ];

  return (
    <>
      <nav className="nav">

        <span className="nav-brand">
          {PROFILE.name.split(' ')[0].toLowerCase()}
        </span>
        <div className="nav-center">
          <a href="#work">work</a>
          <a href="#experience">experience</a>
          <a href="#journey">journey</a>
          <a href="#about">about</a>
          <a href="#contact">contact</a>
        </div>
        <div className="nav-right">
          <ThemeToggle theme={theme} onToggle={toggle} />
        </div>
      </nav>
      <main className="page">
      <GhibliAtmosphere />

      <section className="hero">
        <div className="terminal">
          <div className="terminal-bar">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="terminal-title">{PROFILE.name.toLowerCase().replace(/\s+/g, '-')}.sh</span>
          </div>
          <div className="terminal-body">
            {heroLines.map((line, i) => {
              const text = displayed[i] ?? '';
              const isCommand = line.startsWith('>');
              const isLast = i === heroLines.length - 1;
              return (
                <div className="term-line" key={i}>
                  <span className={isCommand ? 'cmd' : 'val'}>{text}</span>
                  {isLast && <Cursor blink={done} />}
                </div>
              );
            })}
          </div>
        </div>

        <h1 className="hero-tagline">{PROFILE.tagline}</h1>

        <div className="stack-row">
          {STACK.map((s) => (
            <span className="stack-pill" key={s}>{s}</span>
          ))}
        </div>
      </section>

      <section id="work" className="section">
        <SectionLabel path="/work" title="selected projects" />
        <div className="projects">
          {PROJECTS.map((p, i) => (
            <a
              className="project-card reveal"
              href={p.href}
              key={p.name}
              data-reveal
              style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}
              onClick={(e) => handleProjectClick(e, p)}
            >
              <div className="project-head">
                <span className="project-path">{p.path}</span>
                <span className={`status-tag ${p.status}`}>{p.status}</span>
              </div>
              <h3 className="project-name">{p.name}</h3>
              <p className="project-desc">{p.description}</p>
              <div className="project-stack">
                {p.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="experience" className="section">
        <SectionLabel path="/experience" title="work history" />
        <div className="experience-list">
          {EXPERIENCE.map((e, i) => (
            <div
              className="experience-item"
              key={e.role}
              data-reveal
              style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}
            >
              <div className="experience-head">
                <h3 className="experience-role">{e.role}</h3>
                <span className="experience-period">{e.period}</span>
              </div>
              {e.points.length > 0 && (
                <ul className="experience-points">
                  {e.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="journey" className="section">
        <SectionLabel path="/journey" title="quest log" />
        <div className="journey-timeline">
          {JOURNEY.map((j, i) => (
            <div
              className="journey-node"
              key={`${j.year}-${j.title}`}
              data-reveal
              style={{ ['--reveal-delay' as string]: `${i * 110}ms` }}
            >
              <div className="journey-marker">
                <span className="journey-marker-dot" />
              </div>
              <div className="journey-content">
                <span className="journey-year">{j.year}</span>
                <h3 className="journey-title">{j.title}</h3>
                <span className="journey-org">{j.org}</span>
                <p className="journey-detail">{j.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="section">
        <SectionLabel path="/about" title="readme" />
        <div className="about-block">
          <div className="avatar-wrapper">
            <img
              src="/6aaabb51-1339-4d91-8b43-115bcfb71134.jpg"
              alt="Jan Cornelius Miguel Alcaide"
              className="avatar-image"
              onClick={handleAvatarClick}
              style={{ cursor: 'pointer' }}
            />
            <div className="click-me-text">
              <span>view resume</span>
              <span className="arrow">↑</span>
            </div>
          </div>
          <div className="about-text">
            {ABOUT_LINES.map((line, i) =>
              line === '' ? <br key={i} /> : <p key={i}>{line}</p>
            )}
          </div>
        </div>
      </section>

      <section id="contact" className="section contact">
        <SectionLabel path="/contact" title="get in touch" />
        <div className="contact-block">
          <p className="contact-line">
            Currently {PROFILE.status} — based in {PROFILE.location}.
          </p>
          <a className="contact-email" href={`mailto:${PROFILE.email}`}>
            {PROFILE.email}
          </a>
          <p className="contact-phone">{PROFILE.phone}</p>
          <div className="social-row">
            {PROFILE.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>{PROFILE.name} — built with Next.js</span>
      </footer>

      {/* Project Info Modal */}
      {modalOpen && (
        <>
          <div className="modal-overlay" onClick={() => setModalOpen(false)} />
          <div className="modal">
            <div className="modal-header">
              <div className="modal-controls">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="modal-title">project-info.md</span>
            </div>
            <div className="modal-content">
              <div className="modal-line">
                <span className="modal-line-num">01</span>
                <span className="modal-line-text">## Project Status</span>
              </div>
              <div className="modal-line-empty">
                <span className="modal-line-num">02</span>
              </div>
              <div className="modal-line">
                <span className="modal-line-num">03</span>
                <span className="modal-line-text">{modalMessage}</span>
              </div>
            </div>
            <button
              className="modal-close"
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </>
      )}

      {/* Resume Modal */}
      {resumeModalOpen && (
        <>
          <div className="modal-overlay" onClick={() => setResumeModalOpen(false)} />
          <div className="modal resume-modal">
            <div className="modal-header">
              <div className="modal-controls">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="modal-title">resume.config.ts</span>
              <a
                className="resume-download"
                href="/Jan Resume.pdf"
                download
                onClick={(e) => e.stopPropagation()}
              >
                ↓ pdf
              </a>
              <span className="modal-close-spacer" aria-hidden="true" />
            </div>

            <div className="resume-body">
              <div className="resume-identity">
                <img
                  src="/6aaabb51-1339-4d91-8b43-115bcfb71134.jpg"
                  alt={PROFILE.name}
                  className="resume-avatar"
                />
                <div>
                  <h2 className="resume-name">{PROFILE.name}</h2>
                  <p className="resume-role">{PROFILE.role}</p>
                  <p className="resume-location">{PROFILE.location}</p>
                </div>
              </div>

              <div className="resume-tabs">
                {RESUME_TABS.map((t) => (
                  <button
                    key={t.key}
                    className={`resume-tab ${resumeTab === t.key ? 'active' : ''}`}
                    onClick={() => setResumeTab(t.key)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="resume-panel">
                {resumeTab === 'experience' && (
                  <div className="resume-experience">
                    {EXPERIENCE.map((e) => (
                      <div className="resume-exp-item" key={e.role}>
                        <div className="resume-exp-head">
                          <span className="resume-exp-role">{e.role}</span>
                          <span className="resume-exp-period">{e.period}</span>
                        </div>
                        {e.points.length > 0 && (
                          <ul className="resume-exp-points">
                            {e.points.map((pt) => (
                              <li key={pt}>{pt}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {resumeTab === 'skills' && (
                  <div className="resume-skills">
                    {Object.entries(RESUME.skills).map(([group, items]) => (
                      <div className="resume-skill-group" key={group}>
                        <span className="resume-skill-label">{group}</span>
                        <div className="resume-skill-pills">
                          {items.map((item) => (
                            <span key={item}>{item}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {resumeTab === 'education' && (
                  <div className="resume-education">
                    {RESUME.education.map((ed) => (
                      <div className="resume-edu-item" key={ed.school}>
                        <div className="resume-exp-head">
                          <span className="resume-exp-role">{ed.credential}</span>
                          <span className="resume-exp-period">{ed.period}</span>
                        </div>
                        <p className="resume-edu-school">{ed.school}</p>
                        <p className="resume-edu-note">{ed.note}</p>
                      </div>
                    ))}
                    <div className="resume-cert-divider">
                      <span className="resume-cert-label">certifications</span>
                    </div>
                    {RESUME.certifications.map((c) => (
                      <div className="resume-cert-item" key={c.name}>
                        <span className="resume-cert-name">{c.name}</span>
                        <span className="resume-cert-issuer">{c.issuer}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              className="modal-close"
              onClick={() => setResumeModalOpen(false)}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </>
      )}

      <button
        className="chat-button"
        onClick={handleChatClick}
        aria-label="Open chat"
        title="Chat with me"
      >
        💬
      </button>

      {chatOpen && (
        <>
          <div className="chat-overlay" onClick={() => setChatOpen(false)} />
          <div className="chat-modal">
            <div className="chat-header">
              <h3>Chat with Jan</h3>
              <button
                className="chat-close"
                onClick={() => setChatOpen(false)}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
            <div className="chat-body" ref={chatBodyRef}>
              {chatMessages.map((m, i) => (
                <div className={`chat-message ${m.role}`} key={i}>
                  <p>{m.text}</p>
                </div>
              ))}
              {chatLoading && (
                <div className="chat-message bot">
                  <p className="chat-typing">
                    <span />
                    <span />
                    <span />
                  </p>
                </div>
              )}
              {chatMessages.length === 1 && !chatLoading && (
                <div className="chat-suggestions">
                  {CHAT_SUGGESTIONS.map((s) => (
                    <button
                      key={s.label}
                      className="suggestion-btn"
                      onClick={() => sendChatMessage(s.prompt, s.label)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <form className="chat-input-area" onSubmit={handleChatSubmit}>
              <input
                type="text"
                placeholder="Type your message..."
                className="chat-input"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={chatLoading}
              />
              <button className="chat-send" type="submit" disabled={chatLoading || !chatInput.trim()}>
                Send
              </button>
            </form>
          </div>
        </>
      )}

      <style>{`
        /* ============================================================
           CSS CUSTOM PROPERTIES — DARK (default) & LIGHT
        ============================================================ */
        :root {
          --bg: #0B0E14;
          --bg-raised: #11151D;
          --ink: #E8E6E1;
          --ink-dim: #8B92A0;
          --slate: #5A6472;
          --accent: #3DDC97;
          --line: #1E2430;
          --nav-bg: rgba(11, 14, 20, 0.85);
          --terminal-shadow: 0 30px 80px -40px rgba(0, 0, 0, 0.6);
          --dot-opacity: 0.85;
          --ghibli-glow-color: rgba(255, 196, 120, 0.12);
          --ghibli-cloud-color: rgba(150, 160, 200, 0.10);
          --mountain-far: rgba(60, 72, 104, 0.42);
          --mountain-mid: rgba(34, 41, 64, 0.65);
          --mountain-near: rgba(13, 16, 23, 0.95);
          --horizon-glow-color: rgba(255, 184, 110, 0.55);
        }

        :root[data-theme='light'] {
          --bg: #F7F6F2;
          --bg-raised: #FFFFFF;
          --ink: #1A1D24;
          --ink-dim: #5C6270;
          --slate: #8A8F9B;
          --accent: #1F9A6B;
          --line: #E3E1DA;
          --nav-bg: rgba(247, 246, 242, 0.85);
          --terminal-shadow: 0 24px 60px -36px rgba(20, 20, 16, 0.18);
          --dot-opacity: 0.95;
          --ghibli-glow-color: rgba(255, 196, 110, 0.22);
          --ghibli-cloud-color: rgba(255, 255, 255, 0.65);
          --mountain-far: rgba(186, 198, 220, 0.55);
          --mountain-mid: rgba(146, 161, 192, 0.6);
          --mountain-near: rgba(222, 217, 203, 0.9);
          --horizon-glow-color: rgba(255, 170, 90, 0.5);
        }

        * { box-sizing: border-box; }
        html { -webkit-text-size-adjust: 100%; }

        .page,
        .page * {
          transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease;
        }

        .page {
          background: var(--bg);
          color: var(--ink);
          min-height: 100vh;
          font-family: var(--font-inter), -apple-system, system-ui, sans-serif;
          font-feature-settings: 'tnum';
          overflow-x: hidden;
          position: relative;
          padding-top: 65px;
        }

        /* ============================================================
           REVEAL ANIMATIONS
        ============================================================ */
        [data-reveal] {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.55s ease, transform 0.55s ease;
          transition-delay: var(--reveal-delay, 0ms);
        }
        [data-reveal].is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ============================================================
           GHIBLI ATMOSPHERE
        ============================================================ */
        .ghibli-atmosphere {
          position: fixed;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        /* --- Stars --- */
        .stars-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .star {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          animation-name: star-twinkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        :root[data-theme='light'] .star {
          display: none;
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50%       { opacity: 0.9;  transform: scale(1.4); }
        }

        /* --- Celestial body (moon / sun) --- */
        .celestial-body {
          position: absolute;
          top: 8%;
          right: 12%;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: radial-gradient(circle at 38% 38%, #fff8e7, #f0c060);
          box-shadow:
            0 0 0 2px rgba(255, 220, 120, 0.18),
            0 0 24px 8px rgba(255, 210, 100, 0.22),
            0 0 60px 20px rgba(255, 190, 80, 0.10);
          animation: celestial-float 18s ease-in-out infinite;
        }
        :root[data-theme='light'] .celestial-body {
          background: radial-gradient(circle at 38% 38%, #fff9c0, #ffe066);
          box-shadow:
            0 0 0 2px rgba(255, 240, 100, 0.22),
            0 0 30px 12px rgba(255, 230, 60, 0.28),
            0 0 80px 32px rgba(255, 210, 40, 0.12);
          width: 60px;
          height: 60px;
        }
        @keyframes celestial-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-10px) scale(1.03); }
        }

        /* --- Ambient glow --- */
        .ghibli-glow {
          position: absolute;
          top: -20%;
          right: -10%;
          width: 60vw;
          height: 60vw;
          max-width: 700px;
          max-height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--ghibli-glow-color) 0%, transparent 70%);
          filter: blur(10px);
          animation: ghibli-pulse 14s ease-in-out infinite;
        }
        @keyframes ghibli-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.08); }
        }

        /* --- Clouds --- */
        .ghibli-clouds { position: absolute; inset: 0; }
        .ghibli-cloud {
          position: absolute;
          border-radius: 50%;
          background: var(--ghibli-cloud-color);
          filter: blur(36px);
          animation-name: ghibli-drift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes ghibli-drift {
          0%   { transform: translateX(-6vw) translateY(0); }
          50%  { transform: translateX(6vw)  translateY(-2vh); }
          100% { transform: translateX(-6vw) translateY(0); }
        }

        /* --- Birds --- */
        .birds-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .bird-fly {
          position: absolute;
          left: -80px;
          animation-name: bird-cross;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .bird {
          display: block;
          background: transparent;
          border-top: 2px solid var(--ink-dim);
          border-radius: 50% 50% 0 0;
          opacity: 0.45;
        }
        @keyframes bird-cross {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(100vw + 160px)); }
        }

        /* --- Horizon glow --- */
        .horizon-glow {
          position: absolute;
          left: 0; right: 0;
          bottom: 24vh;
          height: 2px;
          background: var(--horizon-glow-color);
          box-shadow: 0 0 24px 6px var(--horizon-glow-color), 0 0 60px 16px var(--horizon-glow-color);
          opacity: 0.6;
          animation: horizon-pulse 8s ease-in-out infinite;
        }
        @keyframes horizon-pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.75; }
        }

        /* --- Mountains --- */
        .mountain-layer {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          width: 100%;
        }
        .mountain-far {
          height: 26vh;
          background: var(--mountain-far);
          clip-path: polygon(
            0% 100%, 0% 62%, 7% 48%, 16% 64%, 24% 38%, 33% 58%,
            42% 32%, 51% 55%, 60% 36%, 69% 60%, 78% 40%, 87% 58%,
            94% 44%, 100% 56%, 100% 100%
          );
        }
        .mountain-mid {
          height: 18vh;
          background: var(--mountain-mid);
          clip-path: polygon(
            0% 100%, 0% 55%, 10% 70%, 20% 40%, 30% 66%, 40% 35%,
            50% 62%, 60% 30%, 70% 58%, 80% 38%, 90% 64%, 100% 45%,
            100% 100%
          );
        }
        .mountain-near {
          height: 11vh;
          background: var(--mountain-near);
          clip-path: polygon(
            0% 100%, 0% 60%, 12% 80%, 22% 50%, 35% 75%, 48% 45%,
            58% 72%, 70% 48%, 82% 78%, 92% 55%, 100% 70%, 100% 100%
          );
        }

        @media (prefers-reduced-motion: reduce) {
          .ghibli-atmosphere { display: none; }
          .cursor.blink { animation: none; }
          [data-reveal] { opacity: 1; transform: none; transition: none; }
        }

        /* ============================================================
           NAV
        ============================================================ */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          padding: 20px clamp(16px, 6vw, 64px);
          background: var(--nav-bg);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line);
        }
        .nav-brand {
          justify-self: start;
          font-family: var(--font-jetbrains-mono), monospace;
          color: var(--accent);
          font-size: 14px;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }
        .nav-brand::before { content: '~/'; color: var(--slate); }
        .nav-center {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .nav-center::-webkit-scrollbar { display: none; }
        .nav-center a {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 13px;
          color: var(--ink-dim);
          text-decoration: none;
          transition: color 0.15s ease;
          white-space: nowrap;
        }
        .nav-center a:hover,
        .nav-center a:focus-visible { color: var(--accent); }
        .nav-right { justify-self: end; }

        /* Theme toggle */
        .theme-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 5px 6px 5px 12px;
          cursor: pointer;
          color: var(--ink-dim);
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .theme-toggle:hover,
        .theme-toggle:focus-visible { border-color: var(--accent); color: var(--accent); }
        .theme-toggle:focus-visible { outline: 1px solid var(--accent); outline-offset: 3px; }
        .theme-toggle-flag {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 12px;
        }
        .theme-toggle-track {
          width: 30px; height: 18px;
          border-radius: 999px;
          background: var(--line);
          display: flex; align-items: center;
          padding: 2px;
          justify-content: flex-start;
        }
        :root[data-theme='light'] .theme-toggle-track { justify-content: flex-end; }
        .theme-toggle-thumb {
          width: 14px; height: 14px;
          border-radius: 50%;
          background: var(--accent);
          color: var(--bg);
          font-size: 9px;
          display: flex; align-items: center; justify-content: center;
          line-height: 1;
        }

        /* ============================================================
           HERO
        ============================================================ */
        .hero {
          padding: clamp(56px, 10vw, 120px) clamp(20px, 6vw, 64px) 80px;
          max-width: 880px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .terminal {
          background: var(--bg-raised);
          border: 1px solid var(--line);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: var(--terminal-shadow);
        }
        .terminal-bar {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--line);
        }
        .dot { width: 11px; height: 11px; border-radius: 50%; opacity: var(--dot-opacity); }
        .dot.red    { background: #FF5F57; }
        .dot.yellow { background: #FEBC2E; }
        .dot.green  { background: #28C840; }
        .terminal-title {
          margin-left: 8px;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 12px;
          color: var(--slate);
        }
        .terminal-body {
          padding: 28px 24px 32px;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: clamp(14px, 2.4vw, 17px);
          line-height: 1.9;
          min-height: 220px;
        }
        .term-line { white-space: pre-wrap; word-break: break-word; }
        .cmd { color: var(--accent); }
        .val { color: var(--ink); }
        .cursor { display: inline-block; color: var(--accent); margin-left: 2px; }
        .cursor.blink { animation: blink 1s steps(1) infinite; }
        @keyframes blink { 50% { opacity: 0; } }

        .hero-tagline {
          margin: 40px 0 0;
          font-size: clamp(26px, 4.5vw, 40px);
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: -0.01em;
          max-width: 720px;
        }
        .stack-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
        .stack-pill {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 12px;
          color: var(--ink-dim);
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 6px 14px;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .stack-pill:hover { color: var(--accent); border-color: var(--accent); }

        /* ============================================================
           SECTIONS (shared)
        ============================================================ */
        .section {
          padding: 70px clamp(20px, 6vw, 64px);
          max-width: 880px;
          margin: 0 auto;
          border-top: 1px solid var(--line);
          position: relative;
          z-index: 1;
        }
        .section-label {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 40px;
        }
        .section-label .path {
          font-family: var(--font-jetbrains-mono), monospace;
          color: var(--accent); font-size: 13px;
        }
        .section-label .rule {
          flex: 0 0 auto; width: 100%; max-width: 60px;
          height: 1px; background: var(--line);
        }
        .section-label .title {
          font-family: var(--font-jetbrains-mono), monospace;
          color: var(--slate); font-size: 13px; text-transform: lowercase;
        }

        /* ============================================================
           PROJECTS
        ============================================================ */
        .projects { display: grid; gap: 16px; }
        .project-card {
          display: block;
          background: var(--bg-raised);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 24px;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
        }
        .project-card:hover,
        .project-card:focus-visible {
          border-color: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(61, 220, 151, 0.08);
        }
        .project-card:focus-visible { outline: 1px solid var(--accent); outline-offset: 2px; }
        .project-head {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 14px; gap: 12px;
        }
        .project-path {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 12px; color: var(--slate);
        }
        .status-tag {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 11px; padding: 3px 9px;
          border-radius: 999px; text-transform: lowercase; flex-shrink: 0;
        }
        .status-tag.live        { color: var(--accent);  background: rgba(61,220,151,0.1); }
        .status-tag.in-progress { color: #E8C547;        background: rgba(232,197,71,0.1); }
        .status-tag.archived    { color: var(--slate);   background: rgba(90,100,114,0.15); }
        .project-name { margin: 0 0 8px; font-size: 19px; font-weight: 600; }
        .project-desc { margin: 0 0 16px; color: var(--ink-dim); font-size: 14.5px; line-height: 1.6; }
        .project-stack { display: flex; flex-wrap: wrap; gap: 8px; }
        .project-stack span {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 11px; color: var(--slate);
          border: 1px solid var(--line); border-radius: 6px; padding: 3px 8px;
        }

        /* ============================================================
           EXPERIENCE
        ============================================================ */
        .experience-list { display: grid; gap: 28px; }
        .experience-item {
          border-left: 2px solid var(--line);
          padding-left: 20px;
          transition: border-color 0.2s ease;
        }
        .experience-item:hover { border-color: var(--accent); }
        .experience-head {
          display: flex; flex-wrap: wrap;
          align-items: baseline; justify-content: space-between;
          gap: 8px; margin-bottom: 10px;
        }
        .experience-role { margin: 0; font-size: 17px; font-weight: 600; max-width: 560px; }
        .experience-period {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 12px; color: var(--slate); white-space: nowrap;
        }
        .experience-points {
          margin: 0; padding-left: 18px;
          color: var(--ink-dim); font-size: 14.5px; line-height: 1.7;
        }
        .experience-points li { margin-bottom: 6px; }

        /* ============================================================
           JOURNEY TIMELINE
        ============================================================ */
        .journey-timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
          padding-left: 12px;
        }
        .journey-timeline::before {
          content: '';
          position: absolute;
          left: 24px;
          top: 8px;
          bottom: 8px;
          width: 1px;
          background: var(--line);
        }
        .journey-node {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 20px;
          padding: 0 0 36px;
          position: relative;
        }
        .journey-node:last-child { padding-bottom: 0; }
        .journey-marker {
          display: flex;
          justify-content: center;
          padding-top: 4px;
          position: relative;
          z-index: 1;
        }
        .journey-marker-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: var(--accent);
          border: 2px solid var(--bg);
          box-shadow: 0 0 0 1px var(--accent);
          flex-shrink: 0;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .journey-node:hover .journey-marker-dot {
          box-shadow: 0 0 0 4px rgba(61, 220, 151, 0.2);
          transform: scale(1.2);
        }
        .journey-content { display: flex; flex-direction: column; gap: 3px; }
        .journey-year {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 11px; color: var(--accent);
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .journey-title {
          margin: 2px 0 0;
          font-size: 16px; font-weight: 600; color: var(--ink);
          transition: color 0.2s ease;
        }
        .journey-node:hover .journey-title { color: var(--accent); }
        .journey-org {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 12px; color: var(--slate);
        }
        .journey-detail {
          margin: 4px 0 0;
          font-size: 14px; color: var(--ink-dim); line-height: 1.6;
          max-width: 520px;
        }

        /* ============================================================
           ABOUT
        ============================================================ */
        .about-block {
          display: grid;
          grid-template-columns: 190px 1fr;
          gap: 36px;
          align-items: start;
        }
        .avatar-wrapper {
          display: flex; flex-direction: column;
          align-items: center; gap: 12px;
        }
        .avatar-image {
          width: 190px; height: 190px;
          border-radius: 12px;
          border: 1px solid var(--line);
          object-fit: cover;
          object-position: center top;
          background: var(--bg-raised);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .avatar-image:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(61, 220, 151, 0.15);
        }
        .click-me-text {
          display: flex; align-items: center; gap: 6px;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 12px; color: var(--accent);
          margin-top: 8px;
          animation: pulse-text 2s ease-in-out infinite;
        }
        .arrow {
          display: inline-block; font-size: 12px;
          animation: bounce-arrow 1.5s ease-in-out infinite;
        }
        @keyframes bounce-arrow {
          0%, 100% { transform: translateY(0);   opacity: 0.7; }
          50%       { transform: translateY(-8px); opacity: 1; }
        }
        @keyframes pulse-text {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
        .about-text p {
          margin: 0 0 14px;
          color: var(--ink-dim); font-size: 16px; line-height: 1.75;
          max-width: 560px;
        }

        /* ============================================================
           RESUME MODAL
        ============================================================ */
        .resume-modal {
          width: 92vw; max-width: 720px;
          height: 85vh; max-height: 680px;
          overflow: hidden;
          display: flex; flex-direction: column;
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .resume-modal .modal-header { padding-right: 44px; gap: 8px; }
        .resume-download {
          margin-left: auto;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 12px; color: var(--ink-dim);
          text-decoration: none;
          border: 1px solid var(--line); border-radius: 6px; padding: 4px 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          flex-shrink: 0;
        }
        .resume-download:hover { color: var(--accent); border-color: var(--accent); }
        .modal-close-spacer { display: block; width: 36px; flex-shrink: 0; }
        .resume-body {
          flex: 1; overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 28px 28px 32px;
        }
        .resume-identity {
          display: flex; align-items: center; gap: 18px;
          margin-bottom: 28px;
        }
        .resume-avatar {
          width: 64px; height: 64px;
          border-radius: 10px;
          object-fit: cover; object-position: center top;
          border: 1px solid var(--line); flex-shrink: 0;
        }
        .resume-name { margin: 0 0 4px; font-size: 19px; font-weight: 600; }
        .resume-role {
          margin: 0 0 2px;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 13px; color: var(--accent);
        }
        .resume-location { margin: 0; font-size: 13px; color: var(--slate); }
        .resume-tabs {
          display: flex; gap: 4px;
          border-bottom: 1px solid var(--line);
          margin-bottom: 24px; overflow-x: auto;
        }
        .resume-tab {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 13px; color: var(--ink-dim);
          background: transparent; border: none;
          border-bottom: 2px solid transparent;
          padding: 8px 4px 10px; margin-right: 20px;
          cursor: pointer; text-transform: lowercase; white-space: nowrap;
        }
        .resume-tab:hover { color: var(--ink); }
        .resume-tab.active { color: var(--accent); border-bottom-color: var(--accent); }
        .resume-exp-item,
        .resume-edu-item {
          border-left: 2px solid var(--line);
          padding-left: 18px; margin-bottom: 24px;
        }
        .resume-exp-head {
          display: flex; flex-wrap: wrap;
          align-items: baseline; justify-content: space-between;
          gap: 8px; margin-bottom: 8px;
        }
        .resume-exp-role { font-size: 14.5px; font-weight: 600; max-width: 440px; }
        .resume-exp-period {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 11.5px; color: var(--slate); white-space: nowrap;
        }
        .resume-exp-points {
          margin: 0; padding-left: 16px;
          color: var(--ink-dim); font-size: 13.5px; line-height: 1.65;
        }
        .resume-exp-points li { margin-bottom: 5px; }
        .resume-skill-group { margin-bottom: 20px; }
        .resume-skill-label {
          display: block;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 11.5px; color: var(--slate);
          text-transform: lowercase; margin-bottom: 10px;
        }
        .resume-skill-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .resume-skill-pills span {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 12px; color: var(--ink-dim);
          border: 1px solid var(--line); border-radius: 999px; padding: 5px 12px;
        }
        .resume-edu-school { margin: 0 0 4px; font-size: 13.5px; color: var(--ink); }
        .resume-edu-note { margin: 0; font-size: 12.5px; color: var(--slate); line-height: 1.5; }
        .resume-cert-divider {
          margin: 8px 0 16px; padding-top: 16px;
          border-top: 1px solid var(--line);
        }
        .resume-cert-label {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 11.5px; color: var(--slate); text-transform: lowercase;
        }
        .resume-cert-item {
          display: flex; flex-wrap: wrap;
          align-items: baseline; justify-content: space-between;
          gap: 8px; padding: 10px 0;
          border-bottom: 1px solid var(--line);
        }
        .resume-cert-item:last-child { border-bottom: none; }
        .resume-cert-name { font-size: 13.5px; color: var(--ink); }
        .resume-cert-issuer {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 11.5px; color: var(--accent);
        }

        /* ============================================================
           CONTACT
        ============================================================ */
        .contact-block { max-width: 560px; }
        .contact-line { color: var(--ink-dim); font-size: 16px; margin: 0 0 20px; }
        .contact-email {
          display: inline-block;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: clamp(18px, 5vw, 28px);
          color: var(--ink); text-decoration: none;
          border-bottom: 1px solid var(--accent);
          padding-bottom: 4px; margin-bottom: 12px;
          word-break: break-all;
          transition: color 0.15s ease;
        }
        .contact-email:hover { color: var(--accent); }
        .contact-phone {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 14px; color: var(--ink-dim); margin: 0 0 28px;
        }
        .social-row { display: flex; flex-wrap: wrap; gap: 24px; margin-top: 20px; }
        .social-row a {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 13px; color: var(--ink-dim); text-decoration: none;
          transition: color 0.15s ease;
        }
        .social-row a:hover,
        .social-row a:focus-visible { color: var(--accent); }

        /* ============================================================
           FOOTER
        ============================================================ */
        .footer {
          padding: 32px clamp(20px, 6vw, 64px) 48px;
          max-width: 880px; margin: 0 auto;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 12px; color: var(--slate);
          position: relative; z-index: 1;
        }

        /* ============================================================
           MODALS (shared)
        ============================================================ */
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          z-index: 999;
          animation: fadeIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .modal {
          position: fixed;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          background: var(--bg-raised);
          border: 1px solid var(--line);
          border-radius: 10px;
          overflow: hidden;
          z-index: 1000;
          max-width: 520px; width: 90%;
          box-shadow:
            0 25px 50px -20px rgba(61, 220, 151, 0.15),
            0 0 1px rgba(61, 220, 151, 0.3),
            inset 0 1px 0 rgba(232, 230, 225, 0.05);
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .modal-header {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--line);
          background: rgba(0, 0, 0, 0.2);
        }
        .modal-controls { display: flex; gap: 8px; }
        .modal-controls .dot { width: 12px; height: 12px; border-radius: 50%; opacity: 0.85; }
        .modal-controls .dot.red    { background: #FF5F57; }
        .modal-controls .dot.yellow { background: #FEBC2E; }
        .modal-controls .dot.green  { background: #28C840; }
        .modal-title {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 12px; color: var(--slate);
          flex: 1; margin-left: 8px;
        }
        .modal-content {
          padding: 24px;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 14px; line-height: 1.8;
          max-height: 400px; overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .modal-line {
          display: flex; gap: 16px;
          animation: typeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .modal-line:nth-child(1) { animation-delay: 0.1s; }
        .modal-line:nth-child(3) { animation-delay: 0.3s; }
        .modal-line-empty { display: flex; gap: 16px; height: 1.8em; }
        .modal-line-num { color: var(--slate); min-width: 28px; text-align: right; opacity: 0.6; }
        .modal-line-text { color: var(--ink); flex: 1; word-wrap: break-word; }
        .modal-line-text::first-letter { color: var(--accent); }
        .modal-close {
          position: absolute; top: 14px; right: 14px;
          background: rgba(61, 220, 151, 0.1);
          border: 1px solid rgba(61, 220, 151, 0.3);
          color: var(--accent); font-size: 16px;
          cursor: pointer; padding: 5px 9px;
          border-radius: 6px;
          transition: all 0.2s ease;
          font-family: var(--font-jetbrains-mono), monospace;
          z-index: 1001;
        }
        .modal-close:hover {
          background: rgba(61, 220, 151, 0.15);
          border-color: var(--accent);
          transform: rotate(90deg) scale(1.1);
        }
        .modal-close:focus-visible { outline: 1px solid var(--accent); outline-offset: 2px; }

        @keyframes fadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to   { opacity: 1; backdrop-filter: blur(4px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translate(-50%, -30%) scale(0.9); filter: blur(10px); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1);   filter: blur(0px); }
        }
        @keyframes typeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Light mode modal overrides */
        :root[data-theme='light'] .modal-overlay { background: rgba(26, 29, 36, 0.6); }
        :root[data-theme='light'] .modal {
          border-color: #E3E1DA;
          box-shadow:
            0 20px 40px -10px rgba(31, 154, 107, 0.12),
            0 0 1px rgba(31, 154, 107, 0.2),
            inset 0 1px 0 rgba(247, 246, 242, 0.8);
        }
        :root[data-theme='light'] .modal-header {
          background: rgba(247, 246, 242, 0.6);
          border-bottom-color: #E3E1DA;
        }
        :root[data-theme='light'] .modal-title   { color: #8A8F9B; }
        :root[data-theme='light'] .modal-content { background: #FFFFFF; }
        :root[data-theme='light'] .modal-line-num  { color: #8A8F9B; }
        :root[data-theme='light'] .modal-line-text { color: #1A1D24; }
        :root[data-theme='light'] .modal-close {
          background: rgba(31, 154, 107, 0.08);
          border-color: rgba(31, 154, 107, 0.25);
          color: #1F9A6B;
        }
        :root[data-theme='light'] .modal-close:hover {
          background: rgba(31, 154, 107, 0.12);
          border-color: #1F9A6B;
        }

        /* ============================================================
           CHAT
        ============================================================ */
        .chat-button {
          position: fixed; bottom: 32px; right: 32px;
          width: 60px; height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent) 0%, #2ba876 100%);
          border: 2px solid rgba(61, 220, 151, 0.3);
          color: var(--bg); font-size: 28px;
          cursor: pointer; z-index: 888;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(61, 220, 151, 0.4);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: float-chat 3s ease-in-out infinite;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .chat-button:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 30px rgba(61, 220, 151, 0.6);
        }
        .chat-button:active { transform: scale(0.95); }
        @keyframes float-chat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }

        .chat-overlay {
          position: fixed; inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(2px);
          z-index: 900;
          animation: fadeIn 0.3s ease;
        }
        .chat-modal {
          position: fixed;
          bottom: 100px; right: 32px;
          width: 380px; height: 500px;
          background: var(--bg-raised);
          border: 1px solid var(--line);
          border-radius: 12px; overflow: hidden;
          z-index: 901;
          box-shadow: 0 10px 40px rgba(61, 220, 151, 0.2);
          display: flex; flex-direction: column;
          animation: chatSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        .chat-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid var(--line);
          background: rgba(61, 220, 151, 0.05);
        }
        .chat-header h3 { margin: 0; font-size: 16px; font-weight: 600; color: var(--ink); }
        .chat-close {
          background: transparent; border: none;
          color: var(--ink-dim); font-size: 18px;
          cursor: pointer; transition: color 0.2s ease;
          padding: 4px 8px;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .chat-close:hover { color: var(--accent); }
        .chat-body {
          flex: 1; overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 16px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .chat-message {
          display: flex; gap: 8px;
          animation: fadeInChat 0.3s ease;
        }
        @keyframes fadeInChat {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .chat-message p {
          margin: 0; padding: 10px 14px;
          border-radius: 8px; font-size: 14px;
          max-width: 80%; word-wrap: break-word;
        }
        .chat-message.bot p {
          background: rgba(61, 220, 151, 0.1);
          color: var(--ink);
          border-left: 2px solid var(--accent);
        }
        .chat-message.user p {
          background: var(--accent);
          color: var(--bg);
          margin-left: auto;
        }
        .chat-suggestions {
          display: flex; flex-direction: column; gap: 8px;
          margin-top: 8px;
        }
        .suggestion-btn {
          padding: 10px 14px;
          border: 1px solid var(--accent);
          background: transparent; color: var(--accent);
          border-radius: 8px; font-size: 13px;
          cursor: pointer; transition: all 0.2s ease;
          text-align: left; font-weight: 500;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .suggestion-btn:hover {
          background: rgba(61, 220, 151, 0.15);
          box-shadow: 0 0 8px rgba(61, 220, 151, 0.2);
        }
        .chat-input-area {
          display: flex; gap: 8px;
          padding: 16px;
          padding-bottom: max(16px, env(safe-area-inset-bottom));
          border-top: 1px solid var(--line);
          background: rgba(0, 0, 0, 0.1);
        }
        .chat-input {
          flex: 1; min-width: 0;
          padding: 10px 14px;
          border: 1px solid var(--line); border-radius: 8px;
          background: var(--bg); color: var(--ink);
          font-size: 16px;
          font-family: var(--font-inter);
          transition: border-color 0.2s ease;
        }
        .chat-input:focus { outline: none; border-color: var(--accent); }
        .chat-send {
          padding: 10px 16px;
          background: linear-gradient(135deg, var(--accent) 0%, #2ba876 100%);
          border: none; border-radius: 8px;
          color: var(--bg); font-size: 13px; font-weight: 600;
          cursor: pointer; transition: all 0.2s ease; flex-shrink: 0;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .chat-send:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(61, 220, 151, 0.4);
        }
        .chat-send:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
        .chat-input:disabled { opacity: 0.6; cursor: not-allowed; }
        .chat-typing {
          display: flex; align-items: center; gap: 4px;
          padding: 12px 14px !important;
        }
        .chat-typing span {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--ink-dim);
          animation: typing-bounce 1.2s ease-in-out infinite;
        }
        .chat-typing span:nth-child(2) { animation-delay: 0.15s; }
        .chat-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0);   opacity: 0.5; }
          30%            { transform: translateY(-4px); opacity: 1; }
        }

        /* Light mode chat overrides */
        :root[data-theme='light'] .chat-modal   { background: #FFFFFF; border-color: #E3E1DA; }
        :root[data-theme='light'] .chat-header  { background: rgba(31,154,107,0.05); border-bottom-color: #E3E1DA; }
        :root[data-theme='light'] .chat-header h3 { color: #1A1D24; }
        :root[data-theme='light'] .chat-input   { background: #FFFFFF; border-color: #E3E1DA; color: #1A1D24; }
        :root[data-theme='light'] .chat-input:focus { border-color: #1F9A6B; }
        :root[data-theme='light'] .chat-message.bot p { background: rgba(31,154,107,0.08); color: #1A1D24; }
        :root[data-theme='light'] .chat-button  {
          background: linear-gradient(135deg, #1F9A6B 0%, #178556 100%);
          border-color: rgba(31,154,107,0.3);
          box-shadow: 0 4px 20px rgba(31,154,107,0.3);
        }
        :root[data-theme='light'] .chat-button:hover { box-shadow: 0 8px 30px rgba(31,154,107,0.4); }
        :root[data-theme='light'] .suggestion-btn { border-color: #1F9A6B; color: #1F9A6B; }
        :root[data-theme='light'] .suggestion-btn:hover {
          background: rgba(31,154,107,0.1);
          box-shadow: 0 0 8px rgba(31,154,107,0.2);
        }

        /* ============================================================
           RESPONSIVE
        ============================================================ */
        @media (max-width: 640px) {
          .page { padding-top: 110px; }
          .nav {
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto;
            row-gap: 14px;
            padding: 14px 16px;
          }
          .nav-brand  { grid-column: 1; grid-row: 1; align-self: center; }
          .nav-right  { grid-column: 2; grid-row: 1; align-self: center; }
          .nav-center {
            grid-column: 1 / -1; grid-row: 2;
            justify-content: center;
            flex-wrap: wrap; gap: 8px 18px;
            overflow-x: visible;
          }
          .nav-center a { font-size: 12px; }
          .theme-toggle-flag { display: none; }
          .theme-toggle { padding: 6px; }
          .theme-toggle-track { margin: 0; }

          .chat-modal {
            left: 12px; right: 12px;
            bottom: 12px; top: auto;
            width: auto;
            height: min(72vh, 560px);
            border-radius: 14px;
          }
          .chat-button {
            bottom: 20px; right: 20px;
            width: 54px; height: 54px;
            font-size: 24px;
          }
        }

        @media (max-width: 480px) {
          .nav-brand { font-size: 13px; }
          .nav-center { gap: 10px; }
          .nav-center a { font-size: 11px; }
        }

        @media (max-width: 600px) {
          .about-block { grid-template-columns: 1fr; }
          .avatar-image { width: 100%; height: 200px; border-radius: 10px; }
          .experience-head { flex-direction: column; align-items: flex-start; }
          .journey-timeline::before { left: 20px; }
          .journey-node { grid-template-columns: 40px 1fr; }
          .resume-modal { width: 95vw; height: 88vh; }
          .resume-body { padding: 22px 18px 28px; }
          .resume-identity { gap: 14px; }
        }
      `}</style>
      </main>
    </>
  );
}