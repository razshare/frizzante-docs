import type { Scroll } from "$lib/scripts/scroll/scroll"

export function update(self: Scroll) {
    if (!self.target) {
        return
    }
    const scrollTop = self.target.scrollTop
    const scrollHeight = self.target.offsetHeight
    const candidatesCloseToTopEdge: HTMLElement[] = []
    let candidateClosestToTopEdge: HTMLElement | undefined
    const ids: WeakMap<HTMLElement, string> = new WeakMap<HTMLElement, string>()
    let active: string = ""
    for (const id of Object.keys(self.candidates)) {
        const candidate = self.candidates[id]
        const candidateTop = candidate.offsetTop + candidate.offsetHeight
        if (candidateTop > scrollTop + scrollHeight) {
            continue
        }
        if (id === "rendermodefull") {
            const rects = candidate.getClientRects()
            console.log(rects)
        }
        if (candidateTop >= scrollTop) {
            candidatesCloseToTopEdge.push(candidate)
            ids.set(candidate, id)
        }
    }
    for (const candidate of candidatesCloseToTopEdge) {
        if (!candidateClosestToTopEdge) {
            candidateClosestToTopEdge = candidate
            active = ids.get(candidate) ?? ""
            continue
        }
        const candidateTop = candidate.offsetTop + candidate.offsetHeight
        const thresholdTop = candidateClosestToTopEdge.offsetTop
        const candidateIsCloserToTopEdge = candidateTop < thresholdTop
        if (candidateIsCloserToTopEdge) {
            candidateClosestToTopEdge = candidate
            active = ids.get(candidate) ?? ""
        }
    }
    if (active === "") {
        return
    }
    self.active = active
}
