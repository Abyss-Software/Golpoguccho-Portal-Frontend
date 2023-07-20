import { LegacyRef, forwardRef, useState } from 'react';
import InvisibleIcon from 'remixicon-react/EyeCloseLineIcon';
import VisibleIcon from 'remixicon-react/EyeLineIcon';
import { twMerge } from 'tailwind-merge';
import './input.css';

const Input = forwardRef(
  (
    {
      className,
      name,
      type,
      label,
      placeholder,
      helperText,
      error = null,
      startIcon: StartIcon = null,
      ...rest
    }: InputProps,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div>
        {label && (
          <label htmlFor={label} className="input-label">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={label}
            name={name}
            type={showPassword ? 'text' : type}
            placeholder={placeholder}
            ref={ref}
            {...rest}
            className={twMerge(
              'peer input-base',
              className,
              StartIcon && 'pl-10',
              type === 'password' && 'pr-12',
              error && 'is-invalid input-error'
            )}
          />

          {StartIcon && (
            <span className="input-icon-start opacity-50 peer-focus:opacity-100 peer-[.is-invalid]:text-errorColor">
              <StartIcon size={20} />
            </span>
          )}

          {type === 'password' && (
            <span className="p-1 absolute inset-y-0 right-0 inline-flex items-center mr-1">
              <button
                type="button"
                className="icon-btn p-2 rounded-full"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <InvisibleIcon size={20} />
                ) : (
                  <VisibleIcon size={20} />
                )}
              </button>
            </span>
          )}
        </div>

        {helperText && (
          <p className={twMerge('text-sm', error && 'text-errorColor')}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

export default Input;

interface InputProps {
  className?: string;
  name?: string;
  type: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean | null;
  startIcon?: any;
}
