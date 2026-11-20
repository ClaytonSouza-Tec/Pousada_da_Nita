import { useState, type FormEvent } from 'react'

type ClientStay = {
  id: string
  accommodation: string
  checkIn: string
  checkOut: string
  amount: number
  notes: string
}

type Client = {
  id: string
  name: string
  email: string
  phone: string
  document: string
  birthDate: string
  address: string
  notes: string
  history: ClientStay[]
}

type ClientDraft = Omit<Client, 'id' | 'history'>

const storageKey = 'pousada-admin-clients'
const emptyDraft: ClientDraft = {
  name: '',
  email: '',
  phone: '',
  document: '',
  birthDate: '',
  address: '',
  notes: '',
}

const initialClients: Client[] = []

function isClientStay(value: unknown): value is ClientStay {
  if (!value || typeof value !== 'object') return false
  const stay = value as Record<string, unknown>
  return (
    typeof stay.id === 'string' &&
    typeof stay.accommodation === 'string' &&
    typeof stay.checkIn === 'string' &&
    typeof stay.checkOut === 'string' &&
    typeof stay.amount === 'number' &&
    typeof stay.notes === 'string'
  )
}

function isClient(value: unknown): value is Client {
  if (!value || typeof value !== 'object') return false
  const client = value as Record<string, unknown>
  return (
    typeof client.id === 'string' &&
    typeof client.name === 'string' &&
    typeof client.email === 'string' &&
    typeof client.phone === 'string' &&
    typeof client.document === 'string' &&
    typeof client.birthDate === 'string' &&
    typeof client.address === 'string' &&
    typeof client.notes === 'string' &&
    Array.isArray(client.history) &&
    client.history.every(isClientStay)
  )
}

function readClients() {
  try {
    const saved = window.localStorage.getItem(storageKey)
    if (!saved) return { clients: initialClients, error: '' }

    const parsed: unknown = JSON.parse(saved)
    if (!Array.isArray(parsed) || !parsed.every(isClient)) {
      return { clients: initialClients, error: 'Os dados de clientes salvos são inválidos. A lista foi iniciada vazia.' }
    }

    return { clients: parsed, error: '' }
  } catch {
    return { clients: initialClients, error: 'Não foi possível ler os clientes salvos neste navegador.' }
  }
}

function formatDate(value: string) {
  if (!value) return '—'
  const date = new Date(`${value}T00:00:00`)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('pt-BR')
}

type ClientFormProps = {
  client: Client | null
  onSave: (draft: ClientDraft) => void
  onClose: () => void
}

function ClientForm({ client, onSave, onClose }: ClientFormProps) {
  const [draft, setDraft] = useState<ClientDraft>(
    client
      ? {
          name: client.name,
          email: client.email,
          phone: client.phone,
          document: client.document,
          birthDate: client.birthDate,
          address: client.address,
          notes: client.notes,
        }
      : emptyDraft,
  )

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSave(draft)
  }

  const update = (field: keyof ClientDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  return (
    <div className="room-dialog-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="room-dialog client-dialog" role="dialog" aria-modal="true" aria-labelledby="client-form-title">
        <h2 id="client-form-title">{client ? 'Editar cliente' : 'Cadastrar cliente'}</h2>
        <form className="client-form" onSubmit={submit}>
          <label>
            <span>Nome completo *</span>
            <input required autoFocus value={draft.name} onChange={(event) => update('name', event.target.value)} />
          </label>
          <label>
            <span>Telefone *</span>
            <input required type="tel" value={draft.phone} onChange={(event) => update('phone', event.target.value)} />
          </label>
          <label>
            <span>E-mail</span>
            <input type="email" value={draft.email} onChange={(event) => update('email', event.target.value)} />
          </label>
          <label>
            <span>CPF ou documento</span>
            <input value={draft.document} onChange={(event) => update('document', event.target.value)} />
          </label>
          <label>
            <span>Data de nascimento</span>
            <input type="date" value={draft.birthDate} onChange={(event) => update('birthDate', event.target.value)} />
          </label>
          <label>
            <span>Endereço</span>
            <input value={draft.address} onChange={(event) => update('address', event.target.value)} />
          </label>
          <label className="client-form-full">
            <span>Observações</span>
            <textarea rows={3} value={draft.notes} onChange={(event) => update('notes', event.target.value)} />
          </label>
          <div className="room-dialog-actions client-form-full">
            <button type="button" className="room-action-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">{client ? 'Salvar alterações' : 'Cadastrar cliente'}</button>
          </div>
        </form>
      </section>
    </div>
  )
}

type StayFormProps = {
  onSave: (stay: Omit<ClientStay, 'id'>) => void
  onClose: () => void
}

function StayForm({ onSave, onClose }: StayFormProps) {
  const [draft, setDraft] = useState({
    accommodation: '',
    checkIn: '',
    checkOut: '',
    amount: '',
    notes: '',
  })

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (draft.checkOut <= draft.checkIn) {
      window.alert('A data de check-out deve ser posterior à data de check-in.')
      return
    }
    onSave({ ...draft, amount: Number(draft.amount) || 0 })
  }

  return (
    <div className="room-dialog-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="room-dialog client-dialog" role="dialog" aria-modal="true" aria-labelledby="stay-form-title">
        <h2 id="stay-form-title">Adicionar hospedagem ao histórico</h2>
        <form className="client-form" onSubmit={submit}>
          <label className="client-form-full">
            <span>Acomodação *</span>
            <input required value={draft.accommodation} onChange={(event) => setDraft({ ...draft, accommodation: event.target.value })} />
          </label>
          <label>
            <span>Check-in *</span>
            <input required type="date" value={draft.checkIn} onChange={(event) => setDraft({ ...draft, checkIn: event.target.value })} />
          </label>
          <label>
            <span>Check-out *</span>
            <input required type="date" min={draft.checkIn || undefined} value={draft.checkOut} onChange={(event) => setDraft({ ...draft, checkOut: event.target.value })} />
          </label>
          <label>
            <span>Valor total (R$)</span>
            <input type="number" min={0} step="0.01" value={draft.amount} onChange={(event) => setDraft({ ...draft, amount: event.target.value })} />
          </label>
          <label className="client-form-full">
            <span>Observações</span>
            <textarea rows={3} value={draft.notes} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} />
          </label>
          <div className="room-dialog-actions client-form-full">
            <button type="button" className="room-action-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Salvar hospedagem</button>
          </div>
        </form>
      </section>
    </div>
  )
}

type HistoryDialogProps = {
  client: Client
  onClose: () => void
  onAddStay: () => void
}

function HistoryDialog({ client, onClose, onAddStay }: HistoryDialogProps) {
  return (
    <div className="room-dialog-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="room-dialog client-dialog" role="dialog" aria-modal="true" aria-labelledby="client-history-title">
        <div className="client-history-heading">
          <div>
            <h2 id="client-history-title">Histórico de {client.name}</h2>
            <p>{client.phone}{client.email ? ` · ${client.email}` : ''}</p>
          </div>
          <button type="button" className="btn btn-primary" onClick={onAddStay}>Adicionar hospedagem</button>
        </div>
        {client.history.length > 0 ? (
          <div className="client-history-list">
            {client.history
              .slice()
              .sort((a, b) => b.checkIn.localeCompare(a.checkIn))
              .map((stay) => (
                <article key={stay.id} className="client-history-item">
                  <div>
                    <strong>{stay.accommodation}</strong>
                    <span>{formatDate(stay.checkIn)} a {formatDate(stay.checkOut)}</span>
                    {stay.notes ? <p>{stay.notes}</p> : null}
                  </div>
                  <strong>{stay.amount > 0 ? `R$ ${stay.amount.toFixed(2)}` : 'Valor não informado'}</strong>
                </article>
              ))}
          </div>
        ) : (
          <p className="client-history-empty">Este cliente ainda não possui hospedagens registradas.</p>
        )}
        {client.notes ? <p className="client-history-notes"><strong>Observações do cliente:</strong> {client.notes}</p> : null}
        <div className="room-dialog-actions">
          <button type="button" className="room-action-btn" onClick={onClose}>Fechar</button>
        </div>
      </section>
    </div>
  )
}

export function ClientsSection() {
  const [clientState, setClientState] = useState(readClients)
  const [editingClient, setEditingClient] = useState<Client | null | undefined>(undefined)
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [addingStay, setAddingStay] = useState(false)
  const [search, setSearch] = useState('')

  const selectedClient = clientState.clients.find((client) => client.id === selectedClientId) ?? null
  const filteredClients = clientState.clients.filter((client) => {
    const value = `${client.name} ${client.email} ${client.phone} ${client.document}`.toLocaleLowerCase('pt-BR')
    return value.includes(search.trim().toLocaleLowerCase('pt-BR'))
  })

  const persistClients = (nextClients: Client[]) => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(nextClients))
      setClientState({ clients: nextClients, error: '' })
    } catch {
      setClientState({ clients: nextClients, error: 'Não foi possível salvar as alterações neste navegador.' })
    }
  }

  const saveClient = (draft: ClientDraft) => {
    const current = editingClient
    const nextClients = current
      ? clientState.clients.map((client) => client.id === current.id ? { ...client, ...draft } : client)
      : [{ id: crypto.randomUUID(), ...draft, history: [] }, ...clientState.clients]
    persistClients(nextClients)
    setEditingClient(undefined)
  }

  const removeClient = (client: Client) => {
    if (!window.confirm(`Remover o cadastro de ${client.name} e seu histórico?`)) return
    persistClients(clientState.clients.filter((item) => item.id !== client.id))
    if (selectedClientId === client.id) setSelectedClientId(null)
  }

  const saveStay = (stay: Omit<ClientStay, 'id'>) => {
    if (!selectedClient) return
    const updatedClient = { ...selectedClient, history: [...selectedClient.history, { ...stay, id: crypto.randomUUID() }] }
    persistClients(clientState.clients.map((client) => client.id === updatedClient.id ? updatedClient : client))
    setAddingStay(false)
  }

  return (
    <section className="panel-box admin-section-panel clients-panel">
      <div className="admin-section-heading">
        <div>
          <h2>Cadastro de clientes</h2>
          <p>Dados dos hóspedes e histórico de hospedagens.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setEditingClient(null)}>
          Cadastrar cliente
        </button>
      </div>

      <label className="client-search">
        <span>Buscar cliente</span>
        <input
          type="search"
          placeholder="Nome, telefone, e-mail ou documento"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </label>

      {clientState.error ? <p className="admin-storage-error" role="alert">{clientState.error}</p> : null}
      {filteredClients.length ? (
        <div className="admin-table-wrap">
          <table className="admin-table client-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Telefone</th>
                <th>Documento</th>
                <th>Hospedagens</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>
                    <strong>{client.name}</strong>
                    {client.email ? <small>{client.email}</small> : null}
                  </td>
                  <td>{client.phone}</td>
                  <td>{client.document || '—'}</td>
                  <td>{client.history.length}</td>
                  <td>
                    <div className="client-actions">
                      <button type="button" className="room-action-btn" onClick={() => setSelectedClientId(client.id)}>Histórico</button>
                      <button type="button" className="room-action-btn" onClick={() => setEditingClient(client)}>Editar</button>
                      <button type="button" className="room-action-btn danger" onClick={() => removeClient(client)}>Remover</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="client-history-empty">
          {search ? 'Nenhum cliente encontrado para essa busca.' : 'Nenhum cliente cadastrado. Use “Cadastrar cliente” para adicionar o primeiro.'}
        </p>
      )}

      {editingClient !== undefined ? (
        <ClientForm client={editingClient} onSave={saveClient} onClose={() => setEditingClient(undefined)} />
      ) : null}
      {selectedClient ? (
        <HistoryDialog
          client={selectedClient}
          onClose={() => setSelectedClientId(null)}
          onAddStay={() => setAddingStay(true)}
        />
      ) : null}
      {addingStay ? (
        <StayForm onSave={saveStay} onClose={() => setAddingStay(false)} />
      ) : null}
    </section>
  )
}
