<script>
  const api = import.meta.env.PROD && import.meta.env.VITE_COUNTER_URL
  let count = $state(0)

  $effect(() => {
    if (!api) return
    let counted = false
    try {
      counted = sessionStorage.getItem('counted') === '1'
    } catch {}

    const load = (method) =>
      fetch(api, { method })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (!data?.count) return
          count = data.count
          if (method === 'POST') {
            try {
              sessionStorage.setItem('counted', '1')
            } catch {}
          }
        })
        .catch(() => {})

    load(counted ? 'GET' : 'POST')
    const timer = setInterval(() => document.hidden || load('GET'), 15000)
    return () => clearInterval(timer)
  })
</script>

{#if count}
  <p class="serial" title="Total visitors, updated live">
    <span class="visually-hidden">{count} visitors so far. </span>
    <span aria-hidden="true">{String(count)} visits.</span>
  </p>
{/if}

<style>
  .serial {
    font-variant-numeric: tabular-nums;
    font-stretch: 112%;
    letter-spacing: 0.04em;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  @media print {
    .serial {
      display: none;
    }
  }
</style>
