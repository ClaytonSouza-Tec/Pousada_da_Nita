import { SectionTitle } from '../components/SectionTitle'
import { galleryImages } from '../data/siteData'

export function GalleryPage() {
  return (
    <main className="page-shell container">
      <SectionTitle eyebrow="Galeria" title="Nossa casa, nossos momentos" />
      <div className="gallery-grid experiences-grid">
        {galleryImages.map((image, index) => (
          <div key={image + index} className="gallery-item">
            <img src={image} alt={`Galleria ${index + 1}`} />
          </div>
        ))}
      </div>
    </main>
  )
}
