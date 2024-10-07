import React from 'react';

const TextBox = ({ value, onChange, labelName, className, disabled }) => {
    return (
        <div className={className}>
            <div className="w-full">
                <div className="relative">
                    <input onChange={onChange} value={value} disabled={disabled}
                        className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none  hover:border-slate-300 shadow-sm focus:shadow focus:ring-1 focus:ring-blue-500"
                    />
                    <label className="absolute cursor-text bg-white px-1 transition-all transform origin-left -top-2 left-2.5 text-xs text-slate-400 scale-90">
                        {labelName}
                    </label>
                </div>
            </div>
        </div>
    );
};

export default TextBox;