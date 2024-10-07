import React from 'react';

const TextBox = ({ value, onChange, className, disabled }) => {
    return (
        <div className={className}>
            <div className="w-full">
                <div className="relative">
                    <input onChange={onChange} value={value} disabled={disabled} placeholder='Search...'
                        className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm rounded-md px-3 py-2 transition duration-300 ease focus:outline-none  hover:border-slate-300 shadow-sm focus:shadow"
                    />
                </div>
            </div>
        </div>
    );
};

export default TextBox;