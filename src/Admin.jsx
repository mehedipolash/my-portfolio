import { useEffect, useState } from 'react'
import {
  profile as defaultProfile,
  skillGroups as defaultSkillGroups,
  experience as defaultExperience,
  projects as defaultProjects,
} from './data'

const TOKEN_KEY = 'admin_token'

function api(path, { token, method = 'GET', body } = {}) {
  return fetch(path, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
}

function Login({ onAuthed }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const res = await api('/api/login', { method: 'POST', body: { email, password } })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      localStorage.setItem(TOKEN_KEY, data.token)
      onAuthed(data.token)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin__center">
      <form className="admin__card admin__login" onSubmit={submit}>
        <h1 className="admin__title">Admin Access</h1>
        <p className="admin__sub">Private — owner only.</p>
        <label className="admin__field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
        </label>
        <label className="admin__field">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error && <p className="admin__error">{error}</p>}
        <button className="btn btn--primary" disabled={busy} type="submit">
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

// A JSON textarea editor for a content section, with validation.
function JsonEditor({ label, value, onChange }) {
  const [text, setText] = useState(() => JSON.stringify(value, null, 2))
  const [error, setError] = useState('')

  useEffect(() => {
    setText(JSON.stringify(value, null, 2))
  }, [value])

  const handle = (e) => {
    const t = e.target.value
    setText(t)
    try {
      const parsed = JSON.parse(t)
      setError('')
      onChange(parsed)
    } catch (err) {
      setError('Invalid JSON: ' + err.message)
    }
  }

  return (
    <div className="admin__section">
      <div className="admin__section-head">
        <h2>{label}</h2>
        {error ? <span className="admin__error">{error}</span> : <span className="admin__ok">valid</span>}
      </div>
      <textarea className="admin__textarea" value={text} onChange={handle} spellCheck="false" />
    </div>
  )
}

function Dashboard({ token, onLogout }) {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('')
  const [syncMsg, setSyncMsg] = useState('')

  useEffect(() => {
    api('/api/content', { token })
      .then((r) => r.json())
      .then((d) => {
        setData({
          profile: d.profile || defaultProfile,
          experience: d.experience?.length ? d.experience : defaultExperience,
          projects: d.projects?.length ? d.projects : defaultProjects,
          skillGroups: d.skillGroups?.length ? d.skillGroups : defaultSkillGroups,
        })
      })
      .catch(() => setData({
        profile: defaultProfile,
        experience: defaultExperience,
        projects: defaultProjects,
        skillGroups: defaultSkillGroups,
      }))
  }, [token])

  const save = async () => {
    setStatus('Saving…')
    try {
      const res = await api('/api/content', { token, method: 'PUT', body: data })
      if (res.status === 401) return onLogout()
      if (!res.ok) throw new Error('Save failed')
      setStatus('Saved ✓')
      setTimeout(() => setStatus(''), 2500)
    } catch (err) {
      setStatus(err.message)
    }
  }

  const syncBadges = async () => {
    setSyncMsg('Syncing…')
    try {
      const res = await api('/api/sync-badges', { token, method: 'POST' })
      const d = await res.json()
      if (res.status === 401) return onLogout()
      setSyncMsg(res.ok ? `Synced ${d.synced} badge(s) ✓` : d.error || 'Sync failed')
    } catch (err) {
      setSyncMsg(err.message)
    }
    setTimeout(() => setSyncMsg(''), 4000)
  }

  if (!data) return <div className="admin__center">Loading…</div>

  const set = (key) => (val) => setData((d) => ({ ...d, [key]: val }))

  return (
    <div className="admin">
      <header className="admin__bar">
        <h1 className="admin__title">Portfolio Admin</h1>
        <div className="admin__bar-actions">
          <a className="admin__link" href="/" target="_blank" rel="noreferrer">
            View site ↗
          </a>
          <button className="btn btn--ghost" onClick={onLogout}>
            Log out
          </button>
        </div>
      </header>

      <div className="admin__card admin__badges">
        <div>
          <h2>Networking badges</h2>
          <p className="admin__sub">
            Pulls your latest verified badges from Credly. Runs daily automatically — use this to
            refresh immediately.
          </p>
        </div>
        <div className="admin__badges-action">
          <button className="btn btn--primary" onClick={syncBadges}>
            Sync from Credly now
          </button>
          {syncMsg && <span className="admin__ok">{syncMsg}</span>}
        </div>
      </div>

      <JsonEditor label="Profile" value={data.profile} onChange={set('profile')} />
      <JsonEditor label="Experience" value={data.experience} onChange={set('experience')} />
      <JsonEditor label="Projects" value={data.projects} onChange={set('projects')} />
      <JsonEditor label="Skill groups" value={data.skillGroups} onChange={set('skillGroups')} />

      <div className="admin__save">
        <button className="btn btn--primary" onClick={save}>
          Save changes
        </button>
        {status && <span className="admin__ok">{status}</span>}
      </div>
    </div>
  )
}

export default function Admin() {
  const [token, setToken] = useState(() =>
    typeof window === 'undefined' ? null : localStorage.getItem(TOKEN_KEY)
  )

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
  }

  return token ? (
    <Dashboard token={token} onLogout={logout} />
  ) : (
    <Login onAuthed={setToken} />
  )
}
