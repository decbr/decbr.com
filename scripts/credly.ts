import { writeFileSync } from 'node:fs'

const user = 'decbr'
const out = new URL('../src/content/credentials.json', import.meta.url)

const issuers: Record<string, string> = {
  'IBM SkillsBuild': 'IBM',
  'IBM-SkillsBuild': 'IBM',
  'Project Management Institute': 'PMI',
}

// unmapped badges fall back to their issuer as category
const categories: Record<string, string> = {
  'AI Fundamentals: Foundations for Understanding AI': 'AI',
  'Getting Started with Generative AI': 'AI',
  'Cloud Computing Fundamentals': 'Cloud',
  'Getting Started with Cybersecurity': 'Security',
  'MongoDB Basics for Students': 'Data',
  'Search with MongoDB': 'Data',
  'Python Essentials 2': 'Programming',
  'Fundamentals of Agile Project Management': 'Project Management',
  'Fundamentals of Predictive Project Management': 'Project Management',
  'Customer Engagement Fundamentals': 'Business',
  'Enterprise Design Thinking Practitioner': 'Business',
}

const issuerOrder = ['IBM', 'PMI', 'MongoDB', 'Cisco', 'DofE']
const categoryOrder = ['AI', 'Cloud', 'Security', 'Data', 'Programming', 'Project Management', 'Business', 'Awards']

type Item = { name: string; id?: string; issuer: string; category: string }

const manual: Item[] = [{ name: 'DofE Bronze Award', issuer: 'DofE', category: 'Awards' }]

// unlisted labels sort last, in arrival order
const group = (items: Item[], key: 'issuer' | 'category', order: string[]) => {
  const groups = new Map<string, [string, string?][]>()
  for (const { name, id, [key]: label } of items) {
    const list = groups.get(label) ?? []
    if (!list.some(([n]) => n === name)) list.push(id ? [name, id] : [name])
    groups.set(label, list)
  }
  const rank = (label: string) => (order.includes(label) ? order.indexOf(label) : order.length)
  return [...groups].map(([label, items]) => ({ label, items })).sort((a, b) => rank(a.label) - rank(b.label))
}

type Badge = {
  id: string
  badge_template: { name: string }
  issuer: { entities: { primary: boolean; entity: { name: string } }[] }
}

try {
  const badges: Badge[] = []
  for (let page = 1; ; page++) {
    const res = await fetch(`https://www.credly.com/users/${user}/badges.json?page=${page}`)
    if (!res.ok) throw new Error(`Credly responded ${res.status}`)
    const body = await res.json()
    badges.push(...body.data)
    if (!body.metadata.next_page_url) break
  }

  const items: Item[] = badges.map((badge) => {
    const credlyIssuer = (badge.issuer.entities.find((e) => e.primary) ?? badge.issuer.entities[0]).entity.name
    const issuer = issuers[credlyIssuer] ?? credlyIssuer
    const name = badge.badge_template.name
    return { name, id: badge.id, issuer, category: categories[name] ?? issuer }
  })
  items.push(...manual)

  const credentials = { issuer: group(items, 'issuer', issuerOrder), category: group(items, 'category', categoryOrder) }
  writeFileSync(out, JSON.stringify(credentials, null, 2) + '\n')
  console.log(`credly: wrote ${badges.length} badges`)
} catch (e) {
  console.warn(`credly: ${(e as Error).message}, keeping existing credentials.json`)
}
