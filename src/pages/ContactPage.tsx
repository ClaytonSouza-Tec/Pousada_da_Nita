import { SectionTitle } from '../components/SectionTitle'
import { contactInfo } from '../data/siteData'

export function ContactPage() {
  return (
    <main className="page-shell container">
      <SectionTitle eyebrow="Contato" title="Fale com a nossa equipe" />

      <div className="contact-grid">
        <div className="contact-card">
          <h3>Informações</h3>
          <ul>
            <li>Telefone: {contactInfo.phones[0]}</li>
            <li>WhatsApp: {contactInfo.phones[1]}</li>
            <li>Email: {contactInfo.email}</li>
            <li>Endereço: {contactInfo.address}</li>
          </ul>
        </div>

        <form className="contact-form">
          <label>
            <span>Nome</span>
            <input type="text" placeholder="Seu nome" />
          </label>
          <label>
            <span>E-mail</span>
            <input type="email" placeholder="Seu e-mail" />
          </label>
          <label>
            <span>Mensagem</span>
            <textarea placeholder="Escreva sua mensagem" rows={5} />
          </label>
          <button type="submit" className="btn btn-primary">
            Enviar mensagem
          </button>
        </form>
      </div>
    </main>
  )
}
