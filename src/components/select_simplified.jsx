import { forwardRef, useState } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from '@radix-ui/react-icons';

import '../css/SelectSimplified.css';

export const Select = forwardRef(({ onValueChange, placeholder, children, ...props }, ref) => {
	const [value, setValue] = useState(null);

	function handleValue(value) {
		setValue(value);
		onValueChange(value);
	}

	return (
		<SelectPrimitive.Root onValueChange={handleValue} {...props}>
			<SelectPrimitive.Trigger className="SelectTrigger" ref={ref} value={value}>
				<SelectPrimitive.Value aria-label={value} placeholder={placeholder} />
				<SelectPrimitive.Icon className="SelectIcon">
					<ChevronDownIcon />
				</SelectPrimitive.Icon>
			</SelectPrimitive.Trigger>
			<SelectPrimitive.Portal>
				<SelectPrimitive.Content className="SelectContent">
					<SelectPrimitive.ScrollUpButton className="SelectScrollButton">
						<ChevronUpIcon />
					</SelectPrimitive.ScrollUpButton>
					<SelectPrimitive.Viewport className="SelectViewport">{children}</SelectPrimitive.Viewport>
					<SelectPrimitive.ScrollDownButton className="SelectScrollButton">
						<ChevronDownIcon />
					</SelectPrimitive.ScrollDownButton>
				</SelectPrimitive.Content>
			</SelectPrimitive.Portal>
		</SelectPrimitive.Root>
	);
}
);
export const SelectItem = forwardRef(
	({ className, children, ...props }, forwardedRef) => {
		return (
			<SelectPrimitive.Item className={'SelectItem '+className} {...props} ref={forwardedRef}>
				<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
				<SelectPrimitive.ItemIndicator className='SelectItemIndicator'>
					<CheckIcon />
				</SelectPrimitive.ItemIndicator>
			</SelectPrimitive.Item>
		);
	}
);