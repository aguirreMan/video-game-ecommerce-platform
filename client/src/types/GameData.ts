import type React from 'react'

export interface GameData {
    id: number,
    title: string,
    platform: string[],
    genre: string,
    price: number,
    stock: number,
    image: string
    reviews?: Review[]
}

export type Review = {
    user: string
    rating: number
    comment: string
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
    className?: string
    resetFilters: (value: string) => void
}

//This is for the credit card fields 
export type SetStringState = React.Dispatch<React.SetStateAction<string>>