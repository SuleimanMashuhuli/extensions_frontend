import React from 'react';

export default function Input ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  required = false,
  className = '',
  ...props 
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-black mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
};