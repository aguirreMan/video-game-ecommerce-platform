import { useState, useEffect, useRef } from 'react'
import { type OptionProps, type SelectProps } from '../types/GameData'

export default function Select({ value, options, onChange, placeHolder }: SelectProps) {
    const [select, setSelect] = useState<boolean>(false)
    const selectRef = useRef<HTMLDivElement>(null)

    function selectOption(option: OptionProps) {
        if (!option) return
        if (value === option.value) return
        //navigate with react router
        onChange(option.value)
        setSelect(false)
    }

    useEffect(() => {
        function clearSelect(e: MouseEvent) {
            if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
                setSelect(false)
            }
        }
        if (select) {
            document.addEventListener('mousedown', clearSelect)
        }
        return () => {
            document.removeEventListener('mousedown', clearSelect)
        }
    }, [select])


    return (
        <div className='relative cursor-pointer flex flex-col gap-0.5 p-3 mt-4 w-48'>
            <div className='p-3 border border-gray-300 rounded-lg bg-white flex justify-between items-center'
                onClick={() => setSelect(!select)}>
                {value ? options.find(option => option.value === value)
                    ?.label : placeHolder || 'Select an option'
                }
            </div>
            {select && (
                <ul className='absolute z-10 mt-1 w-full bg-white border-gray-300 rounded-lg'>
                    {options.map(option => (
                        <li
                            className='px-3 py-2 hover:bg-blue-300 align-text-top'
                            key={option.value}
                            onClick={() => selectOption(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}