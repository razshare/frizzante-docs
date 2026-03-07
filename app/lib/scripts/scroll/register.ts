import type { Scroll } from "$lib/scripts/scroll/scroll"

export function register(self: Scroll, id: string, element: HTMLElement): void {
    if (id === "") {
        return
    }
    self.candidates[id] = element
}
