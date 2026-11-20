import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { AboutPage } from './pages/AboutPage'
import { AdminDashboard } from './pages/AdminDashboard'
import { ContactPage } from './pages/ContactPage'
import { GalleryPage } from './pages/GalleryPage'
import { HomePage } from './pages/HomePage'
import { LocationPage } from './pages/LocationPage'
import { LoginPage } from './pages/LoginPage'
import { PolicyPage } from './pages/PolicyPage'
import { RoomsPage } from './pages/RoomsPage'
import { ServicesPage } from './pages/ServicesPage'

function ProtectedAdmin({ isAuthenticated }: { isAuthenticated: boolean }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <AdminDashboard />
}

function AppShell() {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const savedState = window.localStorage.getItem('pousada-auth')
    if (savedState === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('pousada-auth', String(isAuthenticated))
  }, [isAuthenticated])

  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdminRoute ? <Header /> : null}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/acomodacoes" element={<RoomsPage />} />
        <Route path="/servicos" element={<ServicesPage />} />
        <Route path="/galeria" element={<GalleryPage />} />
        <Route path="/localizacao" element={<LocationPage />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/politica-reservas" element={<PolicyPage title="Política de reservas" policyKey="reservas" />} />
        <Route path="/cancelamento" element={<PolicyPage title="Política de cancelamento" policyKey="cancelamento" />} />
        <Route path="/privacidade" element={<PolicyPage title="Política de privacidade" policyKey="privacidade" />} />
        <Route path="/login" element={<LoginPage onAuthenticate={() => setIsAuthenticated(true)} />} />
        <Route path="/admin/*" element={<ProtectedAdmin isAuthenticated={isAuthenticated} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isAdminRoute ? <Footer /> : null}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
