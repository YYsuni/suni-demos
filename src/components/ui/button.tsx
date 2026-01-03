import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
	size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'default', size = 'default', ...props }, ref) => {
	return (
		<button
			className={cn(
				'inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
				{
					'bg-primary hover:bg-primary/90 h-10 px-4 py-2 text-white': variant === 'default',
					'h-10 bg-red-500 px-4 py-2 text-white hover:bg-red-600': variant === 'destructive',
					'border-border bg-bg hover:bg-secondary h-10 border px-4 py-2': variant === 'outline',
					'bg-secondary text-primary hover:bg-secondary/80 h-10 px-4 py-2': variant === 'secondary',
					'hover:bg-secondary hover:text-primary h-10 px-4 py-2': variant === 'ghost',
					'text-primary h-10 px-4 py-2 underline-offset-4 hover:underline': variant === 'link',
					'h-9 rounded-md px-3': size === 'sm',
					'h-11 rounded-md px-8': size === 'lg',
					'h-10 w-10': size === 'icon'
				},
				className
			)}
			ref={ref}
			{...props}
		/>
	)
})
Button.displayName = 'Button'

export { Button }
