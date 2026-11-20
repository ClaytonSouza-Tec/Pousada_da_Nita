import { SectionTitle } from '../components/SectionTitle'
import { policies } from '../data/siteData'

type PolicyPageProps = {
  title: string
  policyKey: 'reservas' | 'cancelamento' | 'privacidade'
}

export function PolicyPage({ title, policyKey }: PolicyPageProps) {
  const item = policies.find((policy) => policy.title.toLowerCase().includes(policyKey))

  return (
    <main className="page-shell container">
      <SectionTitle eyebrow="Políticas" title={title} />

      <div className="policy-box">
        {item?.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </main>
  )
}
