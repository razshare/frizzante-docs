import type { BaseOptions } from "$lib/scripts/strings/base_options"

export function base(path: string, options: BaseOptions): string {
    const suffix = path.replace(/^\/+/, "")
    return `${options.prefix}/${suffix}`.replace(/^\/+/, "/")
}
