import { useState, useEffect, useRef } from 'react'
import { type OptionProps, type SelectProps } from '../types/GameData'

export default function Select({ value, options, onChange, placeHolder, resetFilters }: SelectProps) {
    const [select, setSelect] = useState<boolean>(false)
    const selectRef = useRef<HTMLDivElement>(null)

    function selectOption(option: OptionProps) {
        if (!option) return
        //Let user reset and clear out filters
        if (option.value === 'reset') {
            resetFilters('')
        } else {
            onChange(option.value)
        }
        if (value === option.value) return

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
        <div ref={selectRef} className='relative cursor-pointer'>
            <div
                className='p-3 bg-gray-800 border border-gray-700 text-white rounded-lg flex justify-between items-center hover:bg-gray-750 transition-colors min-w-[140px]'
                onClick={() => setSelect(!select)}
            >
                <span className='text-sm font-medium'>
                    {value ? options.find(option => option.value === value)?.label : placeHolder || 'Select an option'}
                </span>
                <span className='ml-2 text-gray-400 transform transition-transform duration-200' style={{ transform: select ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    ▼
                </span>
            </div>
            {select && (
                <div className='absolute top-full left-0 w-full z-10 mt-1'>
                    <ul className='bg-gray-800 border border-gray-700 shadow-xl rounded-lg overflow-hidden'>
                        {options.map(option => (
                            <li
                                className={`px-4 py-2 text-sm cursor-pointer transition-colors ${option.value === 'reset'
                                        ? 'text-red-400 hover:bg-red-900/20 border-t border-gray-700'
                                        : value === option.value
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-700'
                                    }`}
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