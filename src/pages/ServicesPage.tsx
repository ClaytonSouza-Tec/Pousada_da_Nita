import { SectionTitle } from '../components/SectionTitle'
import { services } from '../data/siteData'

export function ServicesPage() {
  return (
    <main className="page-shell container">
      <SectionTitle eyebrow="Serviços e comodidades" title="Tudo pensado para o seu bem-estar" />

      <div className="service-grid full-width-grid">
        {services.map((service) => (
          <div key={service} className="service-box">
            {service}
          </div>
        ))}
      </div>
    </main>
  )
}
