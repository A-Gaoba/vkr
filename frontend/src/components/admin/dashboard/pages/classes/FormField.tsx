import React from 'react';

interface Option {
  id: number | string;
  name: string;
}

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
  options?: Option[];
}

const FormField: React.FC<FormFieldProps> = ({ label, type, name, value, onChange, required = false, placeholder = '', className = '', options }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label} {required && <span className="text-red-500">*</span>}:
      </label>
      {type !== 'select' ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      ) : (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          title={`Select ${label}`}
        >
          <option value="">Select {label}</option>
          {options && options.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default FormField;
