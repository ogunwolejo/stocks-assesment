import * as React from 'react';
import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/utils/cn';
import {Loader2} from 'lucide-react';

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
	{
		variants: {
			variant: {
				default: 'bg-primary text-white hover:bg-primary/90',
				destructive:
					'bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
				outline:
					'border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50',
				secondary:
					'bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
				ghost: 'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50',
				link: 'text-primary',
			},
			size: {
				default: 'h-12 px-4 py-4',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export type ButtonProps = {
	asChild?: boolean;
	loading?: boolean;
	loadingText?: string | undefined;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({className, variant, size, asChild = false, children, loading, loadingText, ...props}, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp className={cn(buttonVariants({variant, size, className}))} ref={ref} {...props}>
				{loading ? (
					<>
						<Loader2 className='mr-2 h-4 w-4 animate-spin' /> {loadingText !== undefined ? loadingText : 'Please wait'}
					</>
				) : (
					children
				)}
			</Comp>
		);
	},
);
Button.displayName = 'Button';

export {Button, buttonVariants};
