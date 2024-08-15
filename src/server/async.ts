export type Action<T extends unknown[]> = (...args: T) => void

/**
 * The function to call as much as you want. It will perform the debouce for you.
 * Put in the same args as the `action` function.
 *
 * * action -  Action to call. Two consecutive actions cannot be  called if there is
 * less than `delay` ms between them.
 * * delay - Number of milliseconds.
 */
export function asyncCreateDebouncer<T extends unknown[]>(
    action: Action<T>,
    delay: number
): Action<T> {
    let timer: NodeJS.Timeout | null = null

    return function (this: { delay: number }, ...args: T) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            action(...args)
        }, delay)
    }
}

export function asyncSleep(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
