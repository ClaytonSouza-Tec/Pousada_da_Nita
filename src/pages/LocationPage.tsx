import { SectionTitle } from '../components/SectionTitle'
import { contactInfo } from '../data/siteData'

export function LocationPage() {
  return (
    <main className="page-shell container">
      <SectionTitle eyebrow="Localização" title="Um refúgio em um ponto privilegiado da região" />

      <div className="location-wrap">
        <div className="map-box large-map">
          <iframe
            title="Mapa da pousada"
            src={`https://www.google.com/maps?q=${encodeURIComponent(contactInfo.address)}&output=embed`}
            loading="lazy"
          />
        </div>

        <div className="location-info">
          <h3>Endereço</h3>
          <p>{contactInfo.address}</p>
          <h3>Como chegar</h3>
          <p>No centro de Mansidão, em zona tranquila e de fácil acesso para quem busca conforto e praticidade.</p>
        </div>
      </div>
    </main>
  )
}
