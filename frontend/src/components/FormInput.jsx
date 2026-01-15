// FormInput - Reusable input field component with label, validation, and help text
import { useState } from 'react';

const FormInput = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    error,
    maxLength,
    helpText,
}) => {
    return (
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor={name} style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                {label}
                {required && <span style={{ color: 'red' }}> *</span>}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                maxLength={maxLength}
                style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: error ? '1px solid red' : '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px'
                }}
            />

            {helpText && !error && (
                <small style={{ color: '#666', display: 'block', marginTop: '4px' }}>{helpText}</small>
            )}

            {error && (
                <small style={{ color: 'red', display: 'block', marginTop: '4px' }}>{error}</small>
            )}
        </div>
    );
};

export default FormInput;
