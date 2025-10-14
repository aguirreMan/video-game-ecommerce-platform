import { useState, useEffect, useRef } from 'react'
import { type OptionProps, type SelectProps } from '../types/GameData'

export default function Select({ value, options, onChange, placeHolder }: SelectProps) {
    const [select, setSelect] = useState<boolean>(false)
    const selectRef = useRef<HTMLDivElement>(null)

    function selectOption(option: OptionProps) {
        if (!option) return
        if (value === option.value) return
        //filterd Games component
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
        <div ref={selectRef} className='relative w-48 mt-4 cursor-pointer'>
            <div
                className='p-3 border border-gray-300 bg-white flex justify-between items-center'
                onClick={() => setSelect(!select)}
            >
                {value ? options.find(option => option.value === value)?.label : placeHolder || 'Select an option'}
                <span className='text-gray-100 ml-2 '>{select ? '▲' : '▼'}</span>
            </div>
            {select && (
                <div className='absolute top-full left-0 w-full'>
                    <ul className='bg-gray-300 border border-gray-300 shadow-md mt-0'>
                        {options.map(option => (
                            <li
                                className='px-3 py-2 hover:bg-blue-300 align-text-top cursor-pointer'
                                key={option.value}
                                onClick={() => selectOption(option)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}