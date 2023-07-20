import { forwardRef, ForwardRefRenderFunction } from 'react';
import { twMerge } from 'tailwind-merge';

interface CheckboxProps {
  label: string;
  name?: string;
  labelClassName?: string;
  [key: string]: any;
  size?: number;
}

const Checkbox: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
  { label, size = 14, name = 'checkbox', labelClassName, ...rest },
  ref
) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={label}
        name={name}
        ref={ref}
        {...rest}
        className="aspect-square accent-primary"
        style={{ width: `${size}px` }}
      />
      <label
        htmlFor={label}
        className={twMerge('cursor-pointer text-sm', labelClassName)}
      >
        {label}
      </label>
    </div>
  );
};

export default forwardRef(Checkbox);
