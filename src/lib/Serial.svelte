<script>
  // Each visitor is a unit off the line: the counter value is shown as a serial number.
  const api = import.meta.env.VITE_COUNTER_URL
  let count = $state(0)

  $effect(() => {
    try {
      const seen = Number(sessionStorage.getItem('serial'))
      if (seen) return void (count = seen)
    } catch {}
    if (!api) return

    fetch(api, { method: 'POST' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data?.count) return
        count = data.count
        try {
          sessionStorage.setItem('serial', String(count))
        } catch {}
      })
      .catch(() => {})
  })
</script>

{#if count}
  <p class="serial" title="You are visitor number {count.toLocaleString('en-GB')}">
    <span class="visually-hidden">Visitor number {count}. </span>
    <span aria-hidden="true">Visitor {String(count).padStart(6, '0')}</span>
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
