import type { DebounceFunction } from "$lib/types/core/debounce_function"

/**
 * Creates a new debounce function.
 * @param {number} delayInMilliseconds Delay in milliseconds.
 * @returns {DebounceFunction}
 */
function create(delayInMilliseconds: number): DebounceFunction {
    let id: number = 0
    let controller: AbortController
    return function debounce(callback: false | ((signal: AbortSignal) => void | Promise<void>)) {
        if (id > 0) {
            clearTimeout(id)
            if (controller) {
                controller.abort("")
            }
        }
        if (!callback) {
            return
        }
        controller = new AbortController()
        id = setTimeout(function run() {
            callback(controller.signal)
        }, delayInMilliseconds)
    }
}

export const debounce = { create }
