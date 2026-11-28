import { IS_BROWSER } from "$lib/scripts/core/is_browser.ts"
import type { Source } from "$lib/types/core/source"
import { type Readable, readable } from "svelte/store"
export function source(path: string): Source {
    if (!IS_BROWSER) {
        return {
            isConnected() {
                return false
            },
            isConnecting() {
                return false
            },
            isClosed() {
                return true
            },
            close(): void {},
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            select(_: string = "message"): Readable<string> {
                return readable("")
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            selectJson<T>(_: string = "message"): Readable<undefined | T> {
                return readable(undefined)
            },
        }
    }
    const source = new EventSource(path)
    return {
        isConnected() {
            return source.readyState === source.OPEN
        },
        isConnecting() {
            return source.readyState === source.CONNECTING
        },
        isClosed() {
            return source.readyState === source.CLOSED
        },
        close() {
            source.close()
        },
        select(event: string = "message"): Readable<string> {
            return readable<string>("", set => {
                source.addEventListener(event, ev => {
                    set(ev.data)
                })
                return function stop() {
                    source.close()
                }
            })
        },
        selectJson<T>(event: string = "message"): Readable<T> {
            return readable<T>(undefined, set => {
                source.addEventListener(event, ev => {
                    set(JSON.parse(ev.data))
                })
                return function stop() {
                    source.close()
                }
            })
        },
    }
}
