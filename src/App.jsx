import { useEffect, useState } from 'react'
import { profile, languages, stack, projects, education, certifications } from './data'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

function Navbar({ active, theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#home" className="nav__logo" onClick={() => setOpen(false)}>
          {'<'}
          <span>Mehedi</span>
          {' />'}
        </a>
        <div className="nav__right">
          <nav className={`nav__links ${open ? 'nav__links--open' : ''}`}>
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={active === l.id ? 'is-active' : ''}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <button
            className="theme-toggle"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            onClick={onToggleTheme}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            className="nav__toggle"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__greet">Hi, my name is</p>
          <h1 className="hero__name">{profile.name}.</h1>
          <h2 className="hero__role">{profile.role}</h2>
          <p className="hero__tagline">{profile.tagline}</p>
          <div className="hero__cta">
            <a href="#projects" className="btn btn--primary">
              View my work
            </a>
            <a
              href={profile.resumeUrl}
              className="btn btn--ghost"
              target="_blank"
              rel="noreferrer"
            >
              Download CV
            </a>
          </div>
        </div>
        <div className="hero__avatar">
          <div className="hero__avatar-ring">
            <img src={profile.photoUrl} alt={profile.name} className="hero__photo" />
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <Section id="about" title="About Me" index="01">
      <div className="about">
        <p>{profile.about}</p>
        <ul className="about__facts">
          <li>
            <span>📍</span> {profile.location}
          </li>
          <li>
            <span>✉️</span> {profile.email}
          </li>
          <li>
            <span>📞</span> {profile.phone}
          </li>
          <li>
            <span>⚡</span> Open to frontend, full-stack & networking internships
          </li>
        </ul>
      </div>
    </Section>
  )
}

function Skills() {
  return (
    <Section id="skills" title="Skills" index="02">
      <h3 className="skills__sub">Languages</h3>
      <p className="skills__note">
        Primary language across {/* real */}60 public GitHub repositories.
      </p>
      <div className="skills">
        {languages.map((s) => (
          <div className="skill" key={s.name}>
            <div className="skill__head">
              <span>{s.name}</span>
              <span className="skill__pct">{s.level}%</span>
            </div>
            <div className="skill__bar">
              <div className="skill__fill" style={{ width: `${s.level}%` }} />
            </div>
          </div>
        ))}
      </div>

      <h3 className="skills__sub skills__sub--gap">Frameworks &amp; Tools</h3>
      <div className="stack">
        {Object.entries(stack).map(([group, items]) => (
          <div className="stack__group" key={group}>
            <h4 className="stack__label">{group}</h4>
            <ul className="stack__tags">
              {items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Projects() {
  return (
    <Section id="projects" title="Projects" index="03">
      <div className="projects">
        {projects.map((p) => (
          <article className="card" key={p.title}>
            <div className="card__top">
              <span className="card__folder">📁</span>
              <div className="card__links">
                {p.repo && (
                  <a href={p.repo} aria-label="Repository" target="_blank" rel="noreferrer">
                    Code
                  </a>
                )}
                {p.link && (
                  <a href={p.link} aria-label="Live demo" target="_blank" rel="noreferrer">
                    Live
                  </a>
                )}
              </div>
            </div>
            <h3 className="card__title">{p.title}</h3>
            <p className="card__desc">{p.description}</p>
            <ul className="card__tags">
              {p.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Education() {
  return (
    <Section id="education" title="Education & Certifications" index="04">
      <div className="edu">
        <ul className="edu__list">
          {education.map((e) => (
            <li className="edu__item" key={e.school}>
              <div className="edu__main">
                <h3 className="edu__school">{e.school}</h3>
                <p className="edu__detail">{e.detail}</p>
              </div>
              <span className="edu__period">{e.period}</span>
            </li>
          ))}
        </ul>
        <div className="certs">
          <h3 className="certs__title">Certifications</h3>
          <ul className="certs__list">
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

function Contact() {
  return (
    <Section id="contact" title="Get In Touch" index="05">
      <div className="contact">
        <p>
          I'm currently open to new opportunities and interesting projects. Whether you have a
          question or just want to say hi, my inbox is always open.
        </p>
        <a href={`mailto:${profile.email}`} className="btn btn--primary">
          Say Hello
        </a>
        <div className="contact__socials">
          <a href={profile.socials.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
      </div>
    </Section>
  )
}

function Section({ id, title, index, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <h2 className="section__title">
          <span className="section__index">{index}.</span> {title}
        </h2>
        {children}
      </div>
    </section>
  )
}

export default function App() {
  const [active, setActive] = useState('home')
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((s) => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar active={active} theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <p>
            Built with React & Vite · © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </footer>
    </>
  )
}
