import { Link } from 'react-router-dom'
import { SectionTitle } from '../components/SectionTitle'
import { rooms } from '../data/siteData'

export function RoomsPage() {
  return (
    <main className="page-shell container">
      <SectionTitle eyebrow="Acomodações" title="Escolha o ambiente ideal para a sua hospedagem" />

      <div className="room-grid large-grid">
        {rooms.map((room) => (
          <article key={room.id} className="room-card">
            <img src={room.image} alt={room.name} />
            <div className="room-card-body">
              <div className="room-meta">
                <span>{room.category}</span>
                <span className="status-badge">{room.status}</span>
              </div>
              <h3>{room.name}</h3>
              <p>{room.description}</p>
              <ul>
                {room.amenities.map((amenity) => (
                  <li key={amenity}>{amenity}</li>
                ))}
              </ul>
              <div className="room-footer">
                <strong>R$ {room.price}/noite</strong>
                <Link to="/contato" className="text-link">
                  Solicitar reserva
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
