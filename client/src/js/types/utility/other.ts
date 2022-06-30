export type Maybe<T> = null | T

export type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T
}

export type EventUploadProgress = {
    loaded: number
    total: number
}
