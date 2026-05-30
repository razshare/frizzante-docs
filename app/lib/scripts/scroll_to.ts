import type { ScrollToOptions } from "$lib/scripts/scroll_to_options"

export function scrollTo(options: ScrollToOptions) {
    console.log(options.targetId)
    const element = document.getElementById(options.targetId)
    if (!element) {
        console.warn("body element not found")
        return
    }
    let top = element.offsetTop - 100
    if (top < 0) {
        top = 0
    }
    options.container.scrollTo({ top, behavior: "instant" })
}
