import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Required from './Required';

const SelectCus = ({ value, onChange, labelName, className, options, placeholder, isMulti, disabled, error, isRequired }) => {
    const animatedComponents = makeAnimated();

    const customClassNames = {
        control: (provided, state) => ({
            ...provided,
            borderColor: error ? '#ef4444' : (state.isFocused ? 'blue' : '#d1d5db'),
            boxShadow: state.isFocused ? error ? '0 0 0 2px rgba(239, 68, 68, 0.5)' : '0 0 0 1px rgba(0, 0, 255, 0.5)' : null,
            '&:hover': {
                borderColor: '', // Màu khi hover
            }
        })
    };
    return (
        <div className={className}>
            <div className="w-full">
                <div className="relative">
                    <Select
                        isDisabled={disabled}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti={isMulti}
                        options={options}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        // className={` ${error ? "border-red-500" : "border-gray-300"
                        //     }  ${error ? "focus:ring-red-500" : "focus:ring-blue-500"
                        //     }`}
                        styles={customClassNames}
                    />
                    <label className="absolute cursor-text bg-white px-1 transition-all transform origin-left -top-2 left-2.5 text-xs text-slate-400 scale-90">
                        {labelName}{isRequired && <Required></Required>}
                    </label>
                </div>
                {error && <p className="text-sm text-red-500 mt-1 text-start">{error}</p>}
            </div>
        </div>
    );
};

export default SelectCus;