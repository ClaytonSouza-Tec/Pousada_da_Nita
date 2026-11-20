export type Room = {
  id: number
  name: string
  category: string
  description: string
  capacity: number
  beds: number
  bedType: string
  image: string
  price: number
  status: 'Disponível' | 'Reservado' | 'Ocupado' | 'Em limpeza' | 'Em manutenção'
  reservedPeriod?: string
  occupiedPeriod?: string
  amenities: string[]
}

export type Policy = {
  title: string
  content: string[]
}

export const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Acomodações', to: '/acomodacoes' },
  { label: 'Serviços', to: '/servicos' },
  { label: 'Galeria', to: '/galeria' },
  { label: 'Localização', to: '/localizacao' },
  { label: 'Contato', to: '/contato' },
]

export const contactInfo = {
  address: 'R. João Batista Lima, 57 - Centro, Mansidão - BA, CEP 47160-280',
  phones: ['(77) 99921-5332', '(77) 99816-4667'],
  whatsapp: 'https://wa.me/5577999215332',
  email: 'reservas@pousadadanita.com',
}

export const roomCategories = ['Standard', 'Superior', 'Suíte', 'Suíte Família', 'Chalé']

export const rooms: Room[] = [
  {
    id: 101,
    name: 'Quarto Sol da Manhã',
    category: 'Standard',
    description: 'Ambiente acolhedor com vista para o jardim, ideal para descanso tranquilo.',
    capacity: 2,
    beds: 1,
    bedType: 'Casal',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    price: 420,
    status: 'Disponível',
    amenities: ['Wi-Fi', 'Ar-condicionado', 'Banho', 'Varanda'],
  },
  {
    id: 102,
    name: 'Suíte Jardim das Flores',
    category: 'Suíte',
    description: 'Suíte elegante com espaços amplos, conforto premium e vista para o pátio.',
    capacity: 3,
    beds: 2,
    bedType: 'Casal + Solteiro',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    price: 680,
    status: 'Reservado',
    reservedPeriod: '16–19 nov. 2026',
    amenities: ['Wi-Fi', 'Teto', 'Jacuzzi', 'Café'],
  },
  {
    id: 203,
    name: 'Chalé Encanto Verde',
    category: 'Chalé',
    description: 'Experiência íntima com área externa, ideal para casais e momentos especiais.',
    capacity: 2,
    beds: 1,
    bedType: 'Casal',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    price: 760,
    status: 'Disponível',
    amenities: ['Wi-Fi', 'Varanda', 'Churrasqueira', 'Banheira'],
  },
  {
    id: 304,
    name: 'Suíte Família Nita',
    category: 'Suíte Família',
    description: 'Espaço generoso para famílias com quartos interligados e comodidades extras.',
    capacity: 4,
    beds: 2,
    bedType: 'Casal + 2 Solteiros',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    price: 910,
    status: 'Ocupado',
    occupiedPeriod: '14–17 nov. 2026',
    amenities: ['Wi-Fi', 'Sala', 'Café', 'TV Smart'],
  },
]

export const galleryImages = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
]

export const services = [
  'Recepção 24 horas',
  'Transfer aeroporto',
  'Restaurante e café da manhã',
  'Piscina aquecida',
  'Spa e relaxamento',
  'Wi-Fi em todo o local',
  'Lavanderia expressa',
  'Área de churrasco',
]

export const features = [
  { title: 'Conforto', text: 'Ambientes bem planejados para descanso e bem-estar total.' },
  { title: 'Hospitalidade', text: 'Atendimento acolhedor, cuidado e atenção em cada detalhe.' },
  { title: 'Natureza', text: 'Paisagens verdes e atmosfera tranquila para dias de paz.' },
  { title: 'Segurança', text: 'Estrutura profissional com monitoramento e serviço dedicado.' },
]

export const reviews = [
  {
    name: 'Ana e Carlos',
    quote:
      'Uma experiência incrível! A pousada tem um ambiente sofisticado, acolhedor e extremamente confortável.',
  },
  {
    name: 'Melissa R.',
    quote:
      'Tudo impecável: atendimento, limpeza, café da manhã e uma vista maravilhosa. Voltaremos com certeza!',
  },
  {
    name: 'Renato S.',
    quote:
      'Perfeita para descansar e aproveitar a tranquilidade. A estrutura é premium e aospitalidade é nota 10.',
  },
]

export const dashboardStats = [
  { label: 'Total de quartos', value: '24' },
  { label: 'Quartos disponíveis', value: '12' },
  { label: 'Check-ins hoje', value: '08' },
  { label: 'Check-outs hoje', value: '06' },
  { label: 'Taxa de ocupação', value: '67%' },
  { label: 'Faturamento do dia', value: 'R$ 8.420' },
  { label: 'Faturamento do mês', value: 'R$ 87.300' },
  { label: 'Valores a receber', value: 'R$ 22.180' },
]

export const policies: Policy[] = [
  {
    title: 'Política de reservas',
    content: [
      'As reservas devem ser confirmadas por meio do formulário de reserva em nosso site ou diretamente com a recepção.',
      'O valor total da hospedagem pode ser pago integralmente, via sinal ou conforme condição acordada pela administração.',
      'A disponibilidade é validada em tempo real e reservas duplicadas são automaticamente bloqueadas.',
    ],
  },
  {
    title: 'Política de cancelamento',
    content: [
      'Cancelamentos realizados até 7 dias antes da data de entrada têm direito a reembolso total ou crédito para nova hospedagem.',
      'Cancelamentos realizados com menos de 72 horas de antecedência podem ser cobrados em até 50% do valor.',
      'Em caso de no-show, o valor da reserva será considerado perdido.',
    ],
  },
  {
    title: 'Política de privacidade',
    content: [
      'As informações fornecidas pelos clientes são utilizadas exclusivamente para gestão da reserva, contato e atendimento.',
      'Não compartilhamos dados pessoais com terceiros sem autorização expressa, exceto quando exigido por lei.',
      'Os dados são armazenados com segurança e acessíveis apenas por funcionários autorizados.',
    ],
  },
]
