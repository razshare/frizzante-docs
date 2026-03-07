import type { Candidate } from "$lib/scripts/scroll/candidate"

type Scroll = {
    target?: HTMLElement
    candidates: Record<string, HTMLElement>
    active: string
}
