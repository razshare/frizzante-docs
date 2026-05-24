export type Suggestion = {
    page: string
    section: string
    description: string
    href: (prefix: string) => string
}
