import React from 'react';

interface Option {
  id: number | string;
  level: number | string;
}

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  className: string;
  options?: Option[];
  required?: boolean;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, type, name, value, onChange, options, className, required, placeholder }) => {
  return (
    <div className={className}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label} {required && <span className="text-black">*</span>}:
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
          >
            <option value="">{placeholder}</option>
            {options && options.map(option => (
              <option key={option.id} value={option.id}>
                {option.level}
              </option>
            ))}
          </select>
        )}
      </label>
    </div>
  );
};

export default FormField;
