export interface GameData {
    id: number,
    title: string,
    platform: string[],
    genre: string,
    price: number,
    stock: number,
    image: string
}

//Data types for the custom select components
export type OptionProps = {
    label: string
    value: string
}

export type SelectProps = {
    value: string,
    options: OptionProps[],
    onChange: (value: string) => void
    placeHolder?: string
}