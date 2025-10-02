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
        <div className='custom-select'>
            <div className='select-display' onClick={() => setSelect(!select)}>
                {value ? options.find(option => option.value === value)
                    ?.label : placeHolder || 'Select an option'
                }
            </div>
            {select && (
                <ul className='select-options'>
                    {options.map(option => (
                        <li
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