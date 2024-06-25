import React from 'react';

interface FormFieldProps<T> {
  label: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  className: string;
  options?: T[];
  optionKey?: keyof T;
  optionLabel?: keyof T;
}

const FormField = <T extends { id: string | number; level?: number; name?: string; firstName?: string; lastName?: string }>({
  label,
  type,
  name,
  value,
  onChange,
  options,
  className,
  optionKey = 'id',
  optionLabel,
}: FormFieldProps<T>) => {
  return (
    <div className={className}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label} <span className="text-black">*</span>:
        {type !== 'select' ? (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        ) : (
          <select
            name={name}
            value={value}
            onChange={onChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select</option>
            {options && options.map(option => (
              <option key={option[optionKey] as string | number} value={option[optionKey] as string | number}>
                {optionLabel ? option[optionLabel] as string | number : option.name || `${option.firstName} ${option.lastName}` || `Level ${option.level}`}
              </option>
            ))}
          </select>
        )}
      </label>
    </div>
  );
};

export default FormField;
