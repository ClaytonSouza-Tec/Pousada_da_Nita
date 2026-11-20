import { useState, type FormEvent } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ClientsSection } from '../components/admin/ClientsSection'
import { contactInfo, dashboardStats, roomCategories, rooms, type Room } from '../data/siteData'

const adminSections = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Reservas', path: '/admin/reservas' },
  { label: 'Clientes', path: '/admin/clientes' },
  { label: 'Quartos', path: '/admin/quartos' },
  { label: 'Financeiro', path: '/admin/financeiro' },
  { label: 'Configurações', path: '/admin/configuracoes' },
]

const reservations = [
  { code: 'PN-2026-001', guest: 'Mariana Costa', room: 'Suíte Jardim das Flores', dates: '16–19 nov. 2026', status: 'Confirmada' },
  { code: 'PN-2026-002', guest: 'João Almeida', room: 'Quarto Sol da Manhã', dates: '18–20 nov. 2026', status: 'Pendente' },
  { code: 'PN-2026-003', guest: 'Fernanda Silva', room: 'Chalé Encanto Verde', dates: '21–24 nov. 2026', status: 'Confirmada' },
]

const roomStorageKey = 'pousada-admin-rooms'
const roomStatuses: Room['status'][] = ['Disponível', 'Reservado', 'Ocupado', 'Em limpeza', 'Em manutenção']

function isRoom(value: unknown): value is Room {
  if (!value || typeof value !== 'object') return false
  const room = value as Record<string, unknown>
  return (
    typeof room.id === 'number' &&
    typeof room.name === 'string' &&
    typeof room.category === 'string' &&
    typeof room.description === 'string' &&
    typeof room.capacity === 'number' &&
    typeof room.beds === 'number' &&
    typeof room.bedType === 'string' &&
    typeof room.image === 'string' &&
    typeof room.price === 'number' &&
    roomStatuses.includes(room.status as Room['status']) &&
    Array.isArray(room.amenities) &&
    room.amenities.every((amenity) => typeof amenity === 'string')
  )
}

function readRooms() {
  try {
    const storedRooms = window.localStorage.getItem(roomStorageKey)
    if (!storedRooms) return { rooms, error: '' }

    const parsed: unknown = JSON.parse(storedRooms)
    if (!Array.isArray(parsed) || !parsed.every(isRoom)) {
      return { rooms, error: 'Os dados salvos dos quartos são inválidos. Os dados originais foram carregados.' }
    }

    return { rooms: parsed, error: '' }
  } catch {
    return { rooms, error: 'Não foi possível ler os quartos salvos neste navegador.' }
  }
}

type RoomEditDialogProps = {
  room: Room
  onSave: (room: Room) => void
  onClose: () => void
}

function RoomEditDialog({ room, onSave, onClose }: RoomEditDialogProps) {
  const [draft, setDraft] = useState(room)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSave(draft)
  }

  return (
    <div className="room-dialog-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="room-dialog" role="dialog" aria-modal="true" aria-labelledby="room-dialog-title">
        <h2 id="room-dialog-title">Editar acomodação</h2>
        <form onSubmit={handleSubmit} className="room-edit-form">
          <label>
            <span>Nome</span>
            <input required value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
          </label>
          <label>
            <span>Categoria</span>
            <select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })}>
              {roomCategories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>
          <label>
            <span>Capacidade (hóspedes)</span>
            <input
              type="number"
              min={1}
              required
              value={draft.capacity}
              onChange={(event) => setDraft({ ...draft, capacity: Number(event.target.value) })}
            />
          </label>
          <label>
            <span>Diária (R$)</span>
            <input
              type="number"
              min={0}
              step="0.01"
              required
              value={draft.price}
              onChange={(event) => setDraft({ ...draft, price: Number(event.target.value) })}
            />
          </label>
          <label className="room-edit-full">
            <span>Status</span>
            <select
              value={draft.status}
              onChange={(event) => setDraft({ ...draft, status: event.target.value as Room['status'] })}
            >
              {roomStatuses.map((status) => <option key={status}>{status}</option>)}
            </select>
          </label>
          <div className="room-dialog-actions room-edit-full">
            <button type="button" className="room-action-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Salvar alterações</button>
          </div>
        </form>
      </section>
    </div>
  )
}

function DashboardOverview({ adminRooms }: { adminRooms: Room[] }) {
  const nonFinancialStats = dashboardStats.filter(
    (stat) => !stat.label.toLocaleLowerCase('pt-BR').includes('faturamento') &&
      !stat.label.toLocaleLowerCase('pt-BR').includes('receber'),
  )

  return (
    <>
      <div className="stats-grid">
        {nonFinancialStats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </div>

      <section className="dashboard-rooms-section" aria-labelledby="dashboard-rooms-title">
        <div className="dashboard-rooms-heading">
          <h2 id="dashboard-rooms-title">Status dos quartos</h2>
          <div className="room-status-legend" aria-label="Legenda de status">
            <span><i className="available" />Disponível</span>
            <span><i className="reserved" />Reservado</span>
            <span><i className="occupied" />Ocupado</span>
          </div>
        </div>
        <div className="dashboard-room-grid">
          {adminRooms.map((room) => {
            const statusClass =
              room.status === 'Disponível'
                ? 'available'
                : room.status === 'Reservado'
                  ? 'reserved'
                  : room.status === 'Ocupado'
                    ? 'occupied'
                    : 'unavailable'

            return (
              <article key={room.id} className={`dashboard-room-card ${statusClass}`}>
                <strong>{room.name}</strong>
                <span className="dashboard-room-status">{room.status}</span>
                {room.status === 'Reservado' || room.status === 'Ocupado' ? (
                  <small>
                    {room.status === 'Reservado'
                      ? room.reservedPeriod || 'Período não informado'
                      : room.occupiedPeriod || 'Período não informado'}
                  </small>
                ) : null}
              </article>
            )
          })}
        </div>
      </section>

      <div className="admin-panels">
        <div className="panel-box">
          <h3>Ocupação diária</h3>
          <div className="chart-bars">
            {[52, 65, 71, 82, 69, 75, 89].map((value, index) => (
              <div key={value + index} className="bar-group">
                <span style={{ height: `${value}%` }} />
                <small>{['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][index]}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-box monthly-occupancy-panel">
          <h3>Ocupação mensal</h3>
          <div className="monthly-chart" role="img" aria-label="Gráfico demonstrativo da ocupação mensal de janeiro a dezembro">
            {[48, 55, 62, 58, 71, 78, 86, 82, 69, 74, 88, 96].map((value, index) => (
              <div key={index} className="monthly-bar-group">
                <strong>{value}%</strong>
                <span className="monthly-bar-track">
                  <i style={{ height: `${value}%` }} />
                </span>
                <small>{['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][index]}</small>
              </div>
            ))}
          </div>
          <p className="chart-caption">Percentual demonstrativo de ocupação por mês.</p>
        </div>
      </div>
    </>
  )
}

function ReservationsSection() {
  return (
    <section className="panel-box admin-section-panel">
      <div className="admin-section-heading">
        <div>
          <h2>Reservas</h2>
          <p>Consulte as solicitações e o status das hospedagens.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => window.alert('O cadastro de reservas será habilitado quando o sistema estiver conectado ao banco de dados.')}>
          Nova reserva
        </button>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Hóspede</th>
              <th>Acomodação</th>
              <th>Período</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.code}>
                <td>{reservation.code}</td>
                <td>{reservation.guest}</td>
                <td>{reservation.room}</td>
                <td>{reservation.dates}</td>
                <td><span className="admin-status">{reservation.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

type RoomsSectionProps = {
  adminRooms: Room[]
  onEdit: (room: Room) => void
  onRemove: (room: Room) => void
  storageError: string
}

function RoomsSection({ adminRooms, onEdit, onRemove, storageError }: RoomsSectionProps) {
  return (
    <section className="panel-box admin-section-panel">
      <div className="admin-section-heading">
        <div>
          <h2>Quartos e acomodações</h2>
          <p>Visão geral do inventário e status operacional.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => window.alert('O cadastro de acomodações será habilitado quando o sistema estiver conectado ao banco de dados.')}>
          Adicionar quarto
        </button>
      </div>
      <div className="admin-room-list">
        {storageError ? <p className="admin-storage-error" role="alert">{storageError}</p> : null}
        {adminRooms.length === 0 ? <p className="admin-empty-state">Nenhuma acomodação cadastrada.</p> : null}
        {adminRooms.map((room) => (
          <article key={room.id} className="admin-room-item">
            <img src={room.image} alt="" />
            <div>
              <strong>{room.name}</strong>
              <span>{room.category} · até {room.capacity} hóspedes · R$ {room.price}/noite</span>
            </div>
            <div className="admin-room-actions">
              <em>{room.status}</em>
              <button type="button" className="room-action-btn" onClick={() => onEdit(room)} aria-label={`Editar ${room.name}`}>
                Editar
              </button>
              <button type="button" className="room-action-btn danger" onClick={() => onRemove(room)} aria-label={`Remover ${room.name}`}>
                Remover
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function FinanceSection() {
  return (
    <>
      <div className="stats-grid">
        {dashboardStats
          .filter((stat) => stat.label.includes('Faturamento') || stat.label.includes('receber') || stat.label.includes('ocupação'))
          .map((stat) => (
            <article key={stat.label} className="stat-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
      </div>
      <section className="panel-box admin-section-panel">
        <h2>Resumo financeiro</h2>
        <p>Os valores exibidos são demonstrativos e precisam ser conectados aos lançamentos financeiros reais.</p>
        <ul className="finance-list">
          <li><span>Receitas recebidas no mês</span><strong>R$ 65.120</strong></li>
          <li><span>Valores pendentes de recebimento</span><strong>R$ 22.180</strong></li>
          <li><span>Despesas registradas</span><strong>R$ 12.450</strong></li>
        </ul>
      </section>
    </>
  )
}

function SettingsSection() {
  return (
    <section className="panel-box admin-section-panel">
      <h2>Configurações da pousada</h2>
      <p>Dados de contato usados no site público.</p>
      <dl className="settings-list">
        <div><dt>Endereço</dt><dd>{contactInfo.address}</dd></div>
        <div><dt>Telefone principal</dt><dd>{contactInfo.phones[0]}</dd></div>
        <div><dt>Telefone secundário</dt><dd>{contactInfo.phones[1]}</dd></div>
        <div><dt>E-mail</dt><dd>{contactInfo.email}</dd></div>
      </dl>
      <p className="admin-note">Estes dados são somente para visualização nesta versão.</p>
    </section>
  )
}

export function AdminDashboard() {
  const { pathname } = useLocation()
  const currentSection = adminSections.find((section) => section.path === pathname) ?? adminSections[0]
  const [roomState, setRoomState] = useState(readRooms)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)

  const saveRooms = (nextRooms: Room[]) => {
    try {
      window.localStorage.setItem(roomStorageKey, JSON.stringify(nextRooms))
      setRoomState({ rooms: nextRooms, error: '' })
    } catch {
      setRoomState({ rooms: nextRooms, error: 'Alterações aplicadas nesta tela, mas não foi possível salvá-las neste navegador.' })
    }
  }

  const handleEditRoom = (updatedRoom: Room) => {
    saveRooms(roomState.rooms.map((room) => room.id === updatedRoom.id ? updatedRoom : room))
    setEditingRoom(null)
  }

  const handleRemoveRoom = (roomToRemove: Room) => {
    const confirmed = window.confirm(`Deseja remover a acomodação "${roomToRemove.name}"? Esta ação não pode ser desfeita.`)
    if (!confirmed) return
    saveRooms(roomState.rooms.filter((room) => room.id !== roomToRemove.id))
  }

  const renderSection = () => {
    switch (currentSection.path) {
      case '/admin/reservas':
        return <ReservationsSection />
      case '/admin/clientes':
        return <ClientsSection />
      case '/admin/quartos':
        return (
          <RoomsSection
            adminRooms={roomState.rooms}
            onEdit={setEditingRoom}
            onRemove={handleRemoveRoom}
            storageError={roomState.error}
          />
        )
      case '/admin/financeiro':
        return <FinanceSection />
      case '/admin/configuracoes':
        return <SettingsSection />
      default:
        return <DashboardOverview adminRooms={roomState.rooms} />
    }
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">Pousada da Nita</div>
        <nav aria-label="Menu administrativo">
          {adminSections.map((section) => (
            <NavLink
              key={section.path}
              to={section.path}
              end={section.path === '/admin'}
              className={({ isActive }) => (isActive ? 'admin-nav-link active' : 'admin-nav-link')}
            >
              {section.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <h1>{currentSection.label}</h1>
          {currentSection.path === '/admin' ? (
            <button type="button" className="btn btn-primary" onClick={() => window.print()}>
              Exportar relatório
            </button>
          ) : null}
        </header>
        {renderSection()}
      </main>
      {editingRoom ? (
        <RoomEditDialog room={editingRoom} onSave={handleEditRoom} onClose={() => setEditingRoom(null)} />
      ) : null}
    </div>
  )
}
