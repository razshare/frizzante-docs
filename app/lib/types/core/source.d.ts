import type { Readable } from "svelte/store"

export type Source = {
    isConnected(): boolean
    isConnecting(): boolean
    isClosed(): boolean
    close(): void
    select(eventName: string = "message"): Readable<string>
    selectJson<T>(eventName: string = "message"): Readable<undefined | T>
}
