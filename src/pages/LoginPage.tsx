import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BrandLogo } from '../components/BrandLogo'

const ADMIN_EMAIL = 'admin@pousadadanita.com'
const ADMIN_PASSWORD = 'pousada2025'

type LoginPageProps = {
  onAuthenticate: () => void
}

export function LoginPage({ onAuthenticate }: LoginPageProps) {
  const [form, setForm] = useState({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASSWORD) {
      onAuthenticate()
      navigate('/admin')
      return
    }

    setError('Credenciais inválidas. Tente novamente.')
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-logo-wrap">
          <BrandLogo />
        </div>

        <h1>Login administrativo</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            <span>E-mail</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </label>

          <label>
            <span>Senha</span>
            <input
              type="password"
              required
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
          </label>

          <div className="auth-inline">
            <label className="remember-box">
              <input type="checkbox" defaultChecked />
              <span>Lembrar acesso</span>
            </label>
            <Link to="/">Recuperar senha</Link>
          </div>

          {error ? <p className="auth-error">{error}</p> : null}

          <button type="submit" className="btn btn-primary wide-btn">
            Entrar
          </button>
        </form>
      </div>
    </main>
  )
}
