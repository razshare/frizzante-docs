import type { Scroll } from "$lib/scripts/scroll/scroll"

export function target(self: Scroll, element: HTMLElement): void {
    self.target = element
}
