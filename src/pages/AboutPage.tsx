import { SectionTitle } from '../components/SectionTitle'

export function AboutPage() {
  return (
    <main className="page-shell container">
      <SectionTitle eyebrow="Sobre" title="Uma pousada com identidade, acolhimento e sofisticação" />

      <div className="content-grid">
        <div className="content-copy">
          <p>
            A Pousada da Nita nasceu com o propósito de oferecer uma experiência memorável para quem busca descanso,
            tranquilidade e qualidade de vida em um ambiente cuidadosamente planejado.
          </p>
          <p>
            Com arquitetura acolhedora, paisagens naturais e atendimento personalizado, criamos uma atmosfera que une
            conforto, exclusividade e hospitalidade genuína.
          </p>
          <p>
            Nosso compromisso é proporcionar uma experiência elegante sem perder a calorosa sensação de lar,
            guiada por profissionais dedicados a cada detalhe da estadia.
          </p>
        </div>

        <div className="image-panel">
          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
            alt="Ambiente da pousada"
          />
        </div>
      </div>
    </main>
  )
}
