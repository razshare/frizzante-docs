import type { Scroll } from "$lib/scripts/scroll/scroll"

export function unregister(self: Scroll, id: string): void {
    delete self.candidates[id]
}
