import * as React from 'react';

import {cn} from '@/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({className, type, placeholder, ...props}, ref) => {
	return (
		<input
			type={type}
			className={cn(
				'flex h-12 w-full rounded border border-form-stroke bg-transparent px-3 py-2 text-sm ring-offset-white appearance-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#0000008A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 peer',
				className,
			)}
			ref={ref}
			placeholder={placeholder || ''}
			{...props}
		/>
	);
});
Input.displayName = 'Input';

export {Input};
