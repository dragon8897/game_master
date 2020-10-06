export enum InputType {
    None,
    Number,
}

export type HandlerType = {
    label: string,
    input: InputType,
    params: string[],
}