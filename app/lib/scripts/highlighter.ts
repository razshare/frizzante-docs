import { createHighlighterCore, createOnigurumaEngine, type HighlighterCore } from "shiki"
let singleton: HighlighterCore | undefined
export async function highlighter() {
    if (!singleton) {
        const theme = import("@shikijs/themes/vitesse-dark")
        singleton = await createHighlighterCore({
            themes: [theme],
            langs: [
                import("@shikijs/langs/javascript"),
                import("@shikijs/langs/go"),
                import("@shikijs/langs/sh"),
                import("@shikijs/langs/css"),
                import("@shikijs/langs/bash"),
                import("@shikijs/langs/svelte"),
                import("@shikijs/langs/typescript"),
                import("@shikijs/langs/http"),
                import("@shikijs/langs/log"),
                import("@shikijs/langs/html"),
                import("@shikijs/langs/makefile"),
                import("@shikijs/langs/toml"),
                import("@shikijs/langs/sql"),
            ],
            engine: createOnigurumaEngine(import("shiki/wasm")),
        })
        await singleton.loadTheme(theme)
    }
    return singleton
}
