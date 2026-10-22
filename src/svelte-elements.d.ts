import type { EventHandler } from 'svelte/elements'

declare module 'svelte/elements' {
  interface DOMAttributes<T extends EventTarget> {
    onanimationcancel?: EventHandler<AnimationEvent, T> | undefined | null
  }
}
