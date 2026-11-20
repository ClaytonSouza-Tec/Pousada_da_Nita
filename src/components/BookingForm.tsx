import { useState, type FormEvent } from 'react'
import { contactInfo, rooms } from '../data/siteData'

function getDateOffset(offset: number) {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function getNightCount(checkIn: string, checkOut: string) {
  const start = Date.parse(`${checkIn}T00:00:00Z`)
  const end = Date.parse(`${checkOut}T00:00:00Z`)
  return Math.round((end - start) / 86400000)
}

export function BookingForm() {
  const [form, setForm] = useState({
    checkIn: getDateOffset(1),
    checkOut: getDateOffset(3),
    adults: 2,
    children: 0,
    roomId: String(rooms[0].id),
  })
  const [feedback, setFeedback] = useState('')
  const [isAvailable, setIsAvailable] = useState(false)

  const selectedRoom = rooms.find((room) => String(room.id) === form.roomId) ?? rooms[0]
  const nights = getNightCount(form.checkIn, form.checkOut)
  const total = selectedRoom.price * nights
  const guestCount = form.adults + form.children
  const message = encodeURIComponent(
    `Olá! Gostaria de consultar a disponibilidade da acomodação ${selectedRoom.name}.\n` +
      `Check-in: ${form.checkIn}\nCheck-out: ${form.checkOut}\n` +
      `Hóspedes: ${form.adults} adulto(s) e ${form.children} criança(s).\n` +
      `Estimativa para ${nights} noite(s): R$ ${total.toFixed(2)}.`,
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsAvailable(false)

    if (!form.checkIn || !form.checkOut || nights <= 0) {
      setFeedback('Informe uma data de saída posterior à data de entrada.')
      return
    }

    if (form.adults < 1 || form.children < 0 || guestCount > selectedRoom.capacity) {
      setFeedback(`Esta acomodação comporta até ${selectedRoom.capacity} hóspedes. Ajuste a quantidade ou escolha outra opção.`)
      return
    }

    if (selectedRoom.status !== 'Disponível') {
      setFeedback(`A acomodação selecionada está marcada como "${selectedRoom.status}". Escolha outra opção ou fale com a equipe.`)
      return
    }

    setIsAvailable(true)
    setFeedback('A acomodação atende à sua busca. Envie a solicitação pelo WhatsApp para a equipe confirmar as datas.')
  }

  const updateForm = (field: keyof typeof form, value: string | number) => {
    setForm((current) => ({ ...current, [field]: value }))
    setFeedback('')
    setIsAvailable(false)
  }

  return (
    <div className="booking-panel">
      <div className="panel-header">
        <h3>Reserve sua estadia</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="booking-grid">
          <label>
            <span>Check-in</span>
            <input
              type="date"
              min={getDateOffset(0)}
              required
              value={form.checkIn}
              onChange={(event) => updateForm('checkIn', event.target.value)}
            />
          </label>
          <label>
            <span>Check-out</span>
            <input
              type="date"
              min={form.checkIn || getDateOffset(0)}
              required
              value={form.checkOut}
              onChange={(event) => updateForm('checkOut', event.target.value)}
            />
          </label>
          <label>
            <span>Adultos</span>
            <input
              type="number"
              min={1}
              required
              value={form.adults}
              onChange={(event) => updateForm('adults', Number(event.target.value))}
            />
          </label>
          <label>
            <span>Crianças</span>
            <input
              type="number"
              min={0}
              required
              value={form.children}
              onChange={(event) => updateForm('children', Number(event.target.value))}
            />
          </label>
          <label className="fullwidth">
            <span>Acomodação</span>
            <select
              value={form.roomId}
              onChange={(event) => updateForm('roomId', event.target.value)}
            >
              {rooms.map((room) => (
                <option key={room.id} value={String(room.id)}>
                  {room.name} — R$ {room.price.toFixed(2)}/noite
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="availability-box">
          <div>
            <strong>{selectedRoom.name}</strong>
            <small>
              {nights > 0 ? `${nights} noites` : 'Selecione datas válidas'} · {form.adults} adultos · {form.children} crianças
            </small>
          </div>
          <div className="price-total">
            <span>Total estimado</span>
            <strong>R$ {total > 0 ? total.toFixed(2) : '0,00'}</strong>
          </div>
        </div>

        <button type="submit" className="btn btn-primary wide-btn">
          Consultar disponibilidade
        </button>
      </form>

      {feedback ? (
        <div className={`booking-feedback ${isAvailable ? 'success' : 'error'}`} role="status">
          <p>{feedback}</p>
          {isAvailable ? (
            <a href={`${contactInfo.whatsapp}?text=${message}`} target="_blank" rel="noreferrer" className="btn btn-secondary whatsapp-booking">
              Solicitar pelo WhatsApp
            </a>
          ) : null}
          <small>A disponibilidade final depende da confirmação da equipe da pousada.</small>
        </div>
      ) : null}
    </div>
  )
}
