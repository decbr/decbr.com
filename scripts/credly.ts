import { writeFileSync } from 'node:fs'

const user = 'decbr'
const out = new URL('../src/content/credentials.json', import.meta.url)

const issuers: Record<string, string> = {
  'IBM SkillsBuild': 'IBM',
  'IBM-SkillsBuild': 'IBM',
  'Project Management Institute': 'PMI',
}

const badgeNames: Record<string, string> = {
  'MongoDB Basics for Students': 'Basics for Students',
}

const order = ['IBM', 'PMI', 'MongoDB', 'Cisco', 'DofE']
const rank = (issuer: string) => (order.includes(issuer) ? order.indexOf(issuer) : order.length)

const manual: { issuer: string; items: [string, string?][] }[] = [
  { issuer: 'DofE', items: [['Bronze Award']] },
]

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

  const groups = new Map<string, [string, string?][]>()
  for (const badge of badges) {
    const credlyIssuer = (badge.issuer.entities.find((e) => e.primary) ?? badge.issuer.entities[0]).entity.name
    const issuer = issuers[credlyIssuer] ?? credlyIssuer
    const name = badgeNames[badge.badge_template.name] ?? badge.badge_template.name
    const items = groups.get(issuer) ?? []
    if (!items.some(([n]) => n === name)) items.push([name, badge.id])
    groups.set(issuer, items)
  }

  const credentials = [...[...groups].map(([issuer, items]) => ({ issuer, items })), ...manual].sort(
    (a, b) => rank(a.issuer) - rank(b.issuer),
  )
  writeFileSync(out, JSON.stringify(credentials, null, 2) + '\n')
  console.log(`credly: wrote ${badges.length} badges`)
} catch (e) {
  console.warn(`credly: ${(e as Error).message}, keeping existing credentials.json`)
}
