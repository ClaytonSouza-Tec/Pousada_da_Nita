import { Link } from 'react-router-dom'
import { BookingForm } from '../components/BookingForm'
import { SectionTitle } from '../components/SectionTitle'
import { contactInfo, features, galleryImages, reviews, rooms, services } from '../data/siteData'

export function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="overlay" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow">Hospitalidade premium</span>
            <h1>Bem-vindo à tranquilidade da Pousada da Nita</h1>
            <p>
              Descubra um refúgio acolhedor, pensado para descanso, conforto e experiências memoráveis.
            </p>
            <div className="hero-actions">
              <Link to="/acomodacoes" className="btn btn-primary">
                Faça sua reserva
              </Link>
              <Link to="/galeria" className="btn btn-secondary">
                Conheça a pousada
              </Link>
            </div>
          </div>

          <BookingForm />
        </div>
      </section>

      <section className="container section-block intro-section">
        <SectionTitle
          eyebrow="Pousada da Nita"
          title="Uma estadia pensada para despertar o melhor do seu descanso"
          description="Com ambiente sofisticado, acolhedor e cercado pela natureza, a Pousada da Nita oferece experiências refinadas para quem busca qualidade de vida e tranquilidade."
        />

        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <SectionTitle eyebrow="Acomodações" title="Quartos e chalés com estilo e conforto" align="center" />

        <div className="room-grid">
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
                    Reservar
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-block services-section">
        <SectionTitle eyebrow="Serviços" title="Comodidades que transformam a sua experiência" align="center" />

        <div className="service-grid">
          {services.map((service) => (
            <div key={service} className="service-box">
              {service}
            </div>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <SectionTitle eyebrow="Galeria" title="Momentos que inspiram relaxamento e beleza" align="center" />

        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div key={image + index} className="gallery-item">
              <img src={image} alt={`Foto da pousada ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="container section-block reviews-section">
        <SectionTitle eyebrow="Avaliações" title="O que nossos hóspedes dizem" align="center" />

        <div className="review-grid">
          {reviews.map((review) => (
            <article key={review.name} className="review-card">
              <p>“{review.quote}”</p>
              <strong>{review.name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-block contact-strip">
        <div>
          <SectionTitle eyebrow="Localização" title="Aproveite o melhor da natureza em um lugar exclusivo" />
        </div>

        <div className="map-box">
          <iframe
            title="Mapa de localização da Pousada da Nita"
            src={`https://www.google.com/maps?q=${encodeURIComponent(contactInfo.address)}&output=embed`}
            loading="lazy"
          />
        </div>
      </section>

      <a className="whatsapp-float" href={contactInfo.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        WhatsApp
      </a>
    </>
  )
}
