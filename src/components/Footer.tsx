import { Link } from 'react-router-dom'
import { contactInfo } from '../data/siteData'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>Pousada da Nita</h3>
          <p>Hospitalidade premium em meio à natureza, com conforto e privacidade para cada momento.</p>
        </div>

        <div>
          <h4>Atendimento</h4>
          <ul>
            <li>Telefone: {contactInfo.phones[0]}</li>
            <li>WhatsApp: {contactInfo.phones[1]}</li>
            <li>Email: {contactInfo.email}</li>
          </ul>
        </div>

        <div>
          <h4>Navegação</h4>
          <ul>
            <li><Link to="/sobre">Sobre</Link></li>
            <li><Link to="/acomodacoes">Acomodações</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </div>

        <div>
          <h4>Políticas</h4>
          <ul>
            <li><Link to="/politica-reservas">Reservas</Link></li>
            <li><Link to="/cancelamento">Cancelamento</Link></li>
            <li><Link to="/privacidade">Privacidade</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2025 Pousada da Nita. Todos os direitos reservados.</span>
      </div>
    </footer>
  )
}
