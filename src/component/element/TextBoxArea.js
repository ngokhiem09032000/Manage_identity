import React from 'react';
import Required from './Required';

const TextBoxArea = ({ value, onChange, labelName, className, disabled, error, isRequired, rows }) => {
    return (
        <div className={className}>
            <div className="w-full">
                <div className="relative">
                    <textarea onChange={onChange} value={value} disabled={disabled} rows={rows}
                        className={`w-full p-2 border rounded ${error ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 ${error ? "focus:ring-red-500" : "focus:ring-blue-500"
                            }`}
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

export default TextBoxArea;