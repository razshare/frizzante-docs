/**
 * A debounce function.
 *
 * When callback is `false`, the debounce is cancelled.
 */
export type DebounceFunction = (callback: false | ((signal: AbortSignal) => void | Promise<void>)) => void
