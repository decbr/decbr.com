<script>
  import Serial from './lib/Serial.svelte'

  const source = 'https://github.com/decbr/decbr.com'

  const lines = [
    'Quick, put something witty here.',
    'Runs Linux. Will tell you about it.',
    'Strong opinions available on request.',
    'Works on my machine.',
    'Deployed on a Friday. Once.',
    'Uptime monitored, mine excluded.',
    'Hey, stop that!',
  ]
  // @ts-ignore
  let recent = []
  try {
    // @ts-ignore
    recent = JSON.parse(localStorage.getItem('recent-lines')) ?? []
  } catch {}

  const pick = () => {
    // @ts-ignore
    const options = lines.map((_, i) => i).filter((i) => !recent.includes(i))
    const i = options[Math.floor(Math.random() * options.length)]
    // @ts-ignore
    recent = [i, ...recent].slice(0, 3)
    try {
      localStorage.setItem('recent-lines', JSON.stringify(recent))
    } catch {}
    return i
  }

  let line = $state(pick())

  const still = matchMedia('(prefers-reduced-motion: reduce)').matches
  let phase = $state('')
  const nextLine = () => {
    if (still) line = pick()
    else if (!phase) phase = 'out'
  }
  const rolled = () => {
    if (phase === 'out') {
      line = pick()
      phase = 'in'
    } else phase = ''
  }

  const experience = [
    {
      role: 'Junior Web Developer',
      org: 'IBM Manchester',
      dates: 'Oct 2025 - present',
      text: 'Industry placement in Client Solutions. Took the DevOps and deployment side of a four-person e-commerce platform built on FastAPI, and led its migration from SQLite to Supabase. Professional client conversations and presentations throughout. Modules covering cloud, AI and cybersecurity.',
    },
    {
      role: 'IT Support Technician',
      org: 'PetStay Stockport',
      dates: 'Jun 2025 - present',
      text: 'IT and bookings for a family-run dog boarding business. Wrote a Google Apps Script automation that sorts incoming form responses, replacing a manual admin job. Set up a Samba file share. Bookkeeping in Sage 50. The person who gets called when something breaks.',
    },
    {
      role: 'Runner and Operations Support',
      org: 'BiomeBattle',
      dates: 'Sep 2024 - present',
      text: 'Java plugins for a recurring competitive Minecraft event watched by thousands of spectators. Operations support during live events, changing systems while players are online. Distributed team, working through Git and GitHub.',
    },
    {
      role: 'Front of House',
      org: 'Casa Papi',
      dates: 'Sep 2026 - present',
      text: 'Part-time, over ten hours a week alongside studies. Take orders in person and run the Square till and incoming Deliveroo orders during service.',
    },
    {
      role: 'Volunteer',
      org: 'Barnardo’s',
      dates: 'Dec 2023 - Sep 2024',
      text: 'Nine months on the shop floor, every week.',
    },
  ]

  const built = [
    {
      name: 'F**king Good Markdown Parser',
      text: 'A custom markdown parser written in TypeScript. Available on npm under decbr/fgmd. Used by myself and others.',
      link: 'https://fgmd.dev',
    },
    {
      name: 'Music Orderer',
      text: 'Go, GPL-3.0. Renames music files to match the official track listing from MusicBrainz, with a companion tool that finds the right release ID.',
      link: 'https://github.com/decbr/MusicOrderer',
    },
    {
      name: 'Better unbeatable RPC',
      text: 'Go, GPL-3.0. Discord Rich Presence for the game UNBEATABLE that shows the current song, with a settings app and tested releases built in CI.',
      link: 'https://github.com/decbr/better-unbeatable-rpc',
    },
    {
      name: 'Klyx.org',
      text: 'Website for Klyx Games.',
      link: 'https://klyx.org',
    },
    {
      name: 'MCMayhem.live',
      text: 'Website for MC Mayhem.',
      link: 'https://mcmayhem.live',
    },
    {
      name: 'Static site generator',
      text: 'PHP, no dependencies. Its own markdown parser and RSS packager, written to understand how one works rather than install someone else’s.',
    },
    {
      name: 'Home server',
      text: 'Ubuntu Server, reachable over Tailscale. Runs Jellyfin for media and Uptime Kuma for monitoring. Samba file share for real personal and organisation use.',
    },
    {
      name: 'Workstation',
      text: 'EndeavourOS and KDE Plasma, full time. Been on the linux train before it was cool.',
    },
    {
      name: 'This site',
      text: 'Svelte on AWS S3 and CloudFront. Only technical thing is the visitor counter on Lambda and DynamoDB, defined in a SAM template. Otherwise, it\'s a simple site by design.',
    },
  ]

  const credentials = [
    {
      issuer: 'IBM',
      items: [
        ['Enterprise Design Thinking Practitioner', 'd7adde38-2a16-4238-a4eb-f2d405b4ae61'],
        ['Customer Engagement Fundamentals', 'a528c989-b122-4e0c-80ef-90ea427a9cfc'],
        ['Cloud Computing Fundamentals', '479ae667-e280-4073-8e5f-52dfa1d46e65'],
        ['AI Fundamentals: Foundations for Understanding AI', '3e15b6f0-fd93-4798-b369-f7e013a48017'],
        ['Getting Started with Generative AI', 'ff3a6579-0acf-4279-9270-5efdc24a4a26'],
        ['Getting Started with Cybersecurity', 'c06fe45b-e186-4734-9c72-b0084230c757'],
      ],
    },
    {
      issuer: 'PMI',
      items: [
        ['Fundamentals of Agile Project Management', '3c9baeb0-42db-4580-937f-e586aa989e6c'],
        ['Fundamentals of Predictive Project Management', 'ec204495-3b47-4152-9797-528f09507a9f'],
      ],
    },
    {
      issuer: 'MongoDB',
      items: [
        ['Basics for Students', '2fa8e659-066e-4beb-8632-2b5ebbe3b72b'],
        ['Search with MongoDB', 'f898a31c-3576-4404-a504-8d7e344de5fb'],
      ],
    },
    { issuer: 'Cisco', items: [['Python Essentials 2', '659815b8-c449-4424-97e7-156146ba9a70']] },
    { issuer: 'DofE', items: [['Bronze Award']] },
  ]
</script>

<header class="chassis">
  <div class="top">
    <span class="domain">decbr.com</span>
    <p class="status"><span class="led" aria-hidden="true"></span>Let's make the web personal again.</p>
  </div>

  <div class="face">
    <h1 class="etched">Declan<br />Brooks</h1>
    <p class="line" aria-live="polite">
      <button type="button" onclick={nextLine} title="Another one">
        <span class="roll">
          <span class={phase} onanimationend={rolled} onanimationcancel={rolled}>{lines[line]}</span>
        </span>
      </button>
    </p>
  </div>

  <div class="smallprint">
    <Serial />
  </div>
</header>

<main class="specs">
  <section class="row" id="overview">
    <h2>Overview</h2>
    <div class="body">
      <p class="lead">
        T Level Digital Software Development student on industry placement at IBM Manchester. Most
        of what I know came from building things outside college. I’m most at home getting projects
        deployed and running, and I want to go further into back-end and software engineering,
        particularly Java, Kotlin, and Go.
      </p>
    </div>
  </section>

  <section class="row">
    <h2>Experience</h2>
    <div class="body">
      {#each experience as job}
        <article class="item">
          <h3>{job.role}<span class="org">{job.org}</span></h3>
          <p class="dates">{job.dates}</p>
          <p class="text">{job.text}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="row">
    <h2>Client work</h2>
    <div class="body">
      <article class="item">
        <h3>Client conversations</h3>
        <p class="text">On the sales side as well as the technical one at IBM: finding out what the client needs, then explaining the solution to people who don’t care how it works.</p>
      </article>
      <article class="item">
        <h3>Pitching</h3>
        <p class="text">Trained in sales and pitching at IBM. Taken MVP concepts from idea to pitch, and presented work to employers at IBM and to staff at Lloyds Banking Group.</p>
      </article>
      <article class="item">
        <h3>Certified</h3>
        <p class="text">IBM Customer Engagement Fundamentals and IBM Enterprise Design Thinking Practitioner.</p>
      </article>
    </div>
  </section>

  <section class="row">
    <h2>Built</h2>
    <div class="body">
      {#each built as thing}
        <article class="item">
          <h3>{thing.name}</h3>
          <p class="text">
            {thing.text}
            {#if thing.link}<a href={thing.link} target="_blank" rel="noopener">{thing.link.replace(/^https:\/\//, '')}</a>{/if}
          </p>
        </article>
      {/each}
    </div>
  </section>

  <section class="row">
    <h2>Works in</h2>
    <div class="body">
      <p>Python, Go, Svelte + TS/JS, PHP, Bash, Java, Kotlin. Adaptable to wherever needed.</p>
      <p class="muted">FastAPI, SQL, Supabase, SQLite, Git, Linux, Tailscale, Google Apps Script.</p>
    </div>
  </section>

  <section class="row">
    <h2>Education</h2>
    <div class="body">
      <article class="item">
        <h3>T Level in Digital Software Development<span class="org">The Manchester College</span></h3>
        <p class="dates">2027</p>
        <p class="text">Predicted Distinction. Software development, project management, cybersecurity and data legislation, with the IBM placement built in.</p>
      </article>
      <article class="item">
        <h3>GCSEs<span class="org">Location available on request.</span></h3>
        <p class="dates">2025</p>
        <p class="text">Nine at grades 9 to 6, including Computer Science 9, Media Studies 9, English 8 and Mathematics 7.</p>
      </article>
    </div>
  </section>

  <section class="row">
    <h2>Credentials</h2>
    <div class="body">
      <dl class="creds">
        {#each credentials as group}
          <dt>{group.issuer}</dt>
          <dd>
            <ul>
              {#each group.items as [name, badge]}
                <li>{#if badge}<a href="https://www.credly.com/badges/{badge}" target="_blank" rel="noopener">{name}</a>{:else}{name}{/if}</li>
              {/each}
            </ul>
          </dd>
        {/each}
      </dl>
      <p class="muted"><a href="https://www.credly.com/users/decbr" target="_blank" rel="noopener">Verify on Credly</a></p>
    </div>
  </section>

  <section class="row">
    <h2>Contact</h2>
    <div class="body">
      <ul class="contact">
        <li><a href="mailto:declan.brooks@protonmail.com">declan.brooks@protonmail.com</a></li>
        <li><a href="https://www.linkedin.com/in/decbr" target="_blank" rel="noopener">linkedin.com/in/decbr</a></li>
        <li><a href="https://www.credly.com/users/decbr" target="_blank" rel="noopener">credly.com/users/decbr</a></li>
      </ul>
      <p class="muted">Manchester, predominantly.</p>
    </div>
  </section>
</main>

<footer class="foot">
  <p>
    Built with free software ∴ published as free software.
    {#if source}<a href={source} target="_blank" rel="noopener">Read the source</a>.{/if}
    <a href="#overview">back to top</a>
  </p>
</footer>

<style>
  .chassis { /* hero */
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 2rem;
    min-height: min(calc(100svh - 2 * var(--gutter)), 1080px);
    margin: var(--gutter);
    padding: clamp(22px, 4.5vw, 64px);
    border-radius: var(--radius);
    color: var(--etch);
    background:
      repeating-linear-gradient(0deg, rgb(255 255 255 / 0.025) 0 1px, transparent 1px 2px, rgb(0 0 0 / 0.015) 2px 3px),
      linear-gradient(165deg, var(--chassis-hi), var(--chassis-lo));
    box-shadow:
      inset 0 1px 0 var(--edge),
      inset 0 -1px 0 rgb(0 0 0 / 0.1),
      0 40px 80px -40px rgb(28 30 33 / 0.45);
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    font-size: 0.8125rem;
    font-stretch: 112%;
    letter-spacing: 0.02em;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 0.6em;
    text-align: right;
  }

  .led {
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--led);
    box-shadow:
      inset 0 0 0 1px rgb(0 0 0 / 0.15),
      0 0 10px 1px color-mix(in srgb, var(--led) 70%, transparent);
    animation: power-on 500ms 700ms both cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  @keyframes power-on {
    from {
      background: var(--led-off);
      box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.15);
    }
  }

  .face {
    align-self: end;
  }

  .etched {
    font-size: clamp(3.5rem, 17vw, 16rem);
    font-stretch: 125%;
    font-weight: 560;
    line-height: 0.86;
    letter-spacing: -0.035em;
    color: var(--etch);
    /* light catching the lower lip of the cut, shadow on the upper */
    text-shadow:
      0 1px 0 var(--etch-light),
      0 -1px 0 var(--etch-dark);
  }

  .line {
    margin-top: 1.5rem;
    font-size: clamp(1.125rem, 2.2vw, 1.5rem);
    font-stretch: 112%;
    font-weight: 450;
    color: var(--ink);
  }

  .line button {
    all: unset;
    cursor: pointer;
  }

  /* Clipped window, like a counter rolling over. */
  .roll {
    display: inline-block;
    overflow: hidden;
    vertical-align: bottom;
  }

  .roll > span {
    display: inline-block;
  }

  .out {
    animation: roll-out 160ms cubic-bezier(0.5, 0, 1, 1) forwards;
  }

  .in {
    animation: roll-in 240ms cubic-bezier(0, 0, 0.2, 1);
  }

  @keyframes roll-out {
    to {
      transform: translateY(-110%);
      opacity: 0;
    }
  }

  @keyframes roll-in {
    from {
      transform: translateY(110%);
      opacity: 0;
    }
  }

  .line button:focus-visible {
    outline: 2px solid var(--ink);
    outline-offset: 4px;
    border-radius: 2px;
  }

  .smallprint {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 1rem 2rem;
    flex-wrap: wrap;
    font-size: 0.75rem;
    line-height: 1.5;
    color: var(--muted);
  }

  .smallprint p:first-child {
    max-width: 62ch;
  }

  .specs {
    max-width: 1120px;
    margin: 0 auto;
    padding: clamp(48px, 9vw, 120px) clamp(16px, 4vw, 48px) 0;
  }

  .row {
    display: grid;
    grid-template-columns: minmax(10rem, 15rem) 1fr;
    gap: 1rem 2rem;
    padding: 2rem 0 2.5rem;
    border-top: 1px solid var(--rule);
    break-inside: avoid;
  }

  h2 {
    font-size: 1.0625rem;
    font-stretch: 118%;
    font-weight: 620;
    letter-spacing: -0.005em;
  }

  .body {
    display: grid;
    gap: 1.75rem;
    max-width: 66ch;
  }

  .body > p + p {
    margin-top: -1.25rem;
  }

  .lead {
    font-size: clamp(1.1875rem, 2vw, 1.4375rem);
    line-height: 1.45;
    font-weight: 430;
    letter-spacing: -0.005em;
  }

  .item {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.25rem 1.5rem;
    break-inside: avoid;
  }

  h3 {
    font-size: 1rem;
    font-weight: 620;
  }

  .org {
    font-weight: 400;
    color: var(--muted);
  }

  .org::before {
    content: ', ';
  }

  .dates {
    color: var(--muted);
    font-variant-numeric: tabular-nums;
    text-align: right;
    white-space: nowrap;
  }

  .text {
    grid-column: 1 / -1;
  }

  .muted {
    color: var(--muted);
  }

  .creds {
    display: grid;
    grid-template-columns: 6rem 1fr;
    gap: 0.75rem 1.5rem;
    margin: 0;
  }

  .creds dt {
    font-weight: 620;
  }

  .creds dd {
    margin: 0;
  }

  .creds a {
    text-decoration: none;
  }

  .creds a:hover {
    text-decoration: underline;
  }

  .contact {
    font-size: 1.1875rem;
    font-stretch: 108%;
  }

  .foot {
    max-width: 1120px;
    margin: 0 auto;
    padding: 2rem clamp(16px, 4vw, 48px) 4rem;
    border-top: 1px solid var(--rule);
    font-size: 0.8125rem;
    color: var(--muted);
  }

  @media (max-width: 720px) {
    .domain {
      display: none;
    }

    .etched {
      font-size: 19vw;
    }

    .row {
      grid-template-columns: 1fr;
    }

    .item {
      grid-template-columns: 1fr;
    }

    .dates {
      text-align: left;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .led {
      animation: none;
    }
  }

  @media print {
    .chassis {
      min-height: 0;
      margin: 0 0 6mm;
      padding: 0 0 6mm;
      background: none;
      box-shadow: none;
      border-radius: 0;
      color: #000;
    }

    .face {
      align-self: start;
    }

    .etched {
      font-size: 34pt;
      line-height: 1;
      color: #000;
      text-shadow: none;
    }

    .etched br {
      display: none;
    }

    .line {
      margin-top: 2mm;
      font-size: 12pt;
    }

    .led {
      display: none;
    }

    .specs {
      padding: 0;
    }

    .row {
      padding: 4mm 0;
      grid-template-columns: 30mm 1fr;
    }

    .body {
      max-width: none;
      gap: 3mm;
    }

    .lead {
      font-size: 11pt;
    }

    .foot {
      display: none;
    }
  }
</style>
