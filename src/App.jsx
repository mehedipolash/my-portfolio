import { createContext, useContext, useEffect, useRef, useState } from 'react'
import {
  profile as defaultProfile,
  skillGroups as defaultSkillGroups,
  experience as defaultExperience,
  projects as defaultProjects,
  education,
  certifications,
  fallbackBadges,
} from './data'
import Admin from './Admin.jsx'

// Live content (admin-editable) overrides the static defaults baked into the build.
const ContentContext = createContext(null)
const useContent = () => useContext(ContentContext)

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'badges', label: 'Badges' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

// Devicon icon URL from jsDelivr CDN.
const iconUrl = (slug) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`
const iconUrlPlain = (slug) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-plain.svg`

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

function BackgroundFX() {
  return (
    <div className="bg-fx" aria-hidden="true">
      <div className="bg-fx__grid" />
      <div className="bg-fx__blob bg-fx__blob--1" />
      <div className="bg-fx__blob bg-fx__blob--2" />
      <div className="bg-fx__blob bg-fx__blob--3" />
    </div>
  )
}

// Reveal-on-scroll: adds .is-visible when the element enters the viewport.
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

// 3D tilt that follows the cursor; also feeds the card a glow position.
// Disabled on touch / fine-pointer-less devices to avoid mobile layout jank.
function useTilt(max = 10) {
  const ref = useRef(null)
  const enabled =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const onMove = (e) => {
    if (!enabled) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.transform = `rotateY(${(px - 0.5) * max * 2}deg) rotateX(${(0.5 - py) * max * 2}deg) translateZ(0)`
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
  }
  const reset = () => {
    const el = ref.current
    if (el) el.style.transform = 'rotateY(0) rotateX(0)'
  }
  return { ref, onMove, reset }
}

function Hero() {
  const { profile } = useContent()
  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__badge">MERN Stack Developer · NEXOGS Systems Ltd</span>
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
  const { profile } = useContent()
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
            <span>⚡</span> MERN Stack Developer · open to full-stack & networking roles
          </li>
        </ul>
      </div>
    </Section>
  )
}

function Experience() {
  const { experience } = useContent()
  return (
    <Section id="experience" title="Experience" index="02">
      <ol className="xp">
        {experience.map((x) => (
          <li className="xp__item" key={`${x.company}-${x.role}`}>
            <span className="xp__dot" />
            <div className="xp__card">
              <div className="xp__head">
                <div>
                  <h3 className="xp__role">{x.role}</h3>
                  <p className="xp__company">
                    {x.company}
                    {x.location ? ` · ${x.location}` : ''}
                  </p>
                </div>
                <span className={`xp__period ${x.current ? 'xp__period--live' : ''}`}>
                  {x.period}
                </span>
              </div>
              <p className="xp__summary">{x.summary}</p>
              {x.tags && (
                <ul className="xp__tags">
                  {x.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function SkillIcon({ name, icon }) {
  const [src, setSrc] = useState(iconUrl(icon))
  return (
    <div className="skill-chip" title={name}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width="32"
        height="32"
        onError={() => {
          // Some Devicon slugs only ship a -plain variant.
          if (src.includes('-original')) setSrc(iconUrlPlain(icon))
        }}
      />
      <span>{name}</span>
    </div>
  )
}

function Skills() {
  const { skillGroups } = useContent()
  return (
    <Section id="skills" title="Skills" index="03">
      <div className="skills">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.label}>
            <h3 className="skill-group__label">{group.label}</h3>
            <div className="skill-group__grid">
              {group.skills.map((s) => (
                <SkillIcon key={s.name} name={s.name} icon={s.icon} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function ProjectCard({ p }) {
  const { ref, onMove, reset } = useTilt(8)
  return (
    <div className="card-wrap">
      <article className="card" ref={ref} onMouseMove={onMove} onMouseLeave={reset}>
        {p.image &&
          (p.link ? (
            <a
              className="card__thumb"
              href={p.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${p.title} live site`}
            >
              <img src={p.image} alt={`${p.title} landing page`} loading="lazy" />
            </a>
          ) : (
            <div className="card__thumb">
              <img src={p.image} alt={`${p.title} landing page`} loading="lazy" />
            </div>
          ))}
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
    </div>
  )
}

function Projects() {
  const { projects } = useContent()
  return (
    <Section id="projects" title="Projects" index="04">
      <div className="projects">
        {projects.map((p) => (
          <ProjectCard p={p} key={p.title} />
        ))}
      </div>
    </Section>
  )
}

// Dynamic networking badges, fetched from the backend (which caches Credly).
// Falls back to local data if the API is unavailable (e.g. static-only deploy).
function Badges() {
  // Seed with fallback so the static (prerendered) HTML already contains real
  // badge content for SEO; the live Credly-synced list replaces it on mount.
  const [badges, setBadges] = useState(fallbackBadges)

  useEffect(() => {
    let alive = true
    fetch('/api/badges')
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (!alive) return
        const list = Array.isArray(data) ? data : data.badges
        if (list && list.length) setBadges(list)
      })
      .catch(() => {
        /* keep fallback */
      })
    return () => {
      alive = false
    }
  }, [])

  return (
    <Section id="badges" title="Networking Badges" index="05">
      <p className="badges__note">
        Credentials earned through the Cisco Networking Academy — synced automatically from my
        verified Credly profile.
      </p>
      <div className="badges">
        {badges.map((b) => (
          <a
            className="badge"
            key={b.url || b.name}
            href={b.url || '#'}
            target="_blank"
            rel="noreferrer"
            title={b.name}
          >
            {b.image ? (
              <img src={b.image} alt={b.name} loading="lazy" width="96" height="96" />
            ) : (
              <div className="badge__placeholder">🏅</div>
            )}
            <span className="badge__name">{b.name}</span>
            {b.issuer && <span className="badge__issuer">{b.issuer}</span>}
          </a>
        ))}
      </div>
    </Section>
  )
}

function Education() {
  return (
    <Section id="education" title="Education & Certifications" index="06">
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
  const { profile } = useContent()
  return (
    <Section id="contact" title="Get In Touch" index="07">
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
  const ref = useReveal()
  return (
    <section id={id} className="section">
      <div className="container reveal" ref={ref}>
        <h2 className="section__title">
          <span className="section__index">{index}.</span> {title}
        </h2>
        {children}
      </div>
    </section>
  )
}

function Footer() {
  const { profile } = useContent()
  return (
    <footer className="footer">
      <div className="container">
        <p>
          Built with React & Vite · © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  )
}

function Portfolio() {
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
      <BackgroundFX />
      <Navbar active={active} theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Badges />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  // Merge admin-edited content (from the API) over the static build defaults.
  const [content, setContent] = useState({
    profile: defaultProfile,
    skillGroups: defaultSkillGroups,
    experience: defaultExperience,
    projects: defaultProjects,
  })

  useEffect(() => {
    let alive = true
    fetch('/api/content')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (!alive || !data || typeof data !== 'object') return
        setContent((prev) => ({
          profile: data.profile ? { ...prev.profile, ...data.profile } : prev.profile,
          skillGroups: data.skillGroups?.length ? data.skillGroups : prev.skillGroups,
          experience: data.experience?.length ? data.experience : prev.experience,
          projects: data.projects?.length ? data.projects : prev.projects,
        }))
      })
      .catch(() => {
        /* keep static defaults */
      })
    return () => {
      alive = false
    }
  }, [])

  // Tiny client-side route: /admin renders the private editor.
  const isAdmin =
    typeof window !== 'undefined' && window.location.pathname.replace(/\/$/, '') === '/admin'

  return (
    <ContentContext.Provider value={content}>
      {isAdmin ? <Admin /> : <Portfolio />}
    </ContentContext.Provider>
  )
}
