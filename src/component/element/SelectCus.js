import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const SelectCus = ({ value, onChange, labelName, className, options, placeholder, isMulti, disabled }) => {
    const animatedComponents = makeAnimated();
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
                    />
                    <label className="absolute cursor-text bg-white px-1 transition-all transform origin-left -top-2 left-2.5 text-xs text-slate-400 scale-90">
                        {labelName}
                    </label>
                </div>
            </div>
        </div>
    );
};

export default SelectCus;