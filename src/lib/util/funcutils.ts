export function callIfDefined<T, U>(fn:((p:T)=>U) | null, p:T):U|null {
    if(fn) {
        return fn(p)
    }
    return null
}