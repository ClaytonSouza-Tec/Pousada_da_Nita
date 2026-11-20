import { NavLink } from 'react-router-dom'
import { BrandLogo } from './BrandLogo'
import { navItems } from '../data/siteData'

export function Header() {
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <NavLink to="/" className="brand-link">
          <BrandLogo />
        </NavLink>

        <nav className="main-nav" aria-label="Menu principal">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/login" className="btn btn-ghost">
          ACESSO RESTRITO
        </NavLink>
      </div>
    </header>
  )
}
