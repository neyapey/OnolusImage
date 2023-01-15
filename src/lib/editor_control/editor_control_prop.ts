export interface EditorControlProps<T> {
    label: string
    value: T
    placeholder?: string

    onChange(data: T):void
}