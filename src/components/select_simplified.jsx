import { forwardRef, useState } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from '@radix-ui/react-icons';

export const Select = forwardRef(({ onValueChange, placeholder, children, ...props }, ref) => {
	const [value, setValue] = useState(null);

	function handleValue(value) {
		setValue(value);
		onValueChange(value);
	}

	return (
		<SelectPrimitive.Root onValueChange={handleValue} {...props}>
			<SelectPrimitive.Trigger ref={ref} value={value}>
				<SelectPrimitive.Value aria-label={value} placeholder={placeholder} />
				<SelectPrimitive.Icon>
					<ChevronDownIcon />
				</SelectPrimitive.Icon>
			</SelectPrimitive.Trigger>
			<SelectPrimitive.Portal>
				<SelectPrimitive.Content>
					<SelectPrimitive.ScrollUpButton>
						<ChevronUpIcon />
					</SelectPrimitive.ScrollUpButton>
					<SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
					<SelectPrimitive.ScrollDownButton>
						<ChevronDownIcon />
					</SelectPrimitive.ScrollDownButton>
				</SelectPrimitive.Content>
			</SelectPrimitive.Portal>
		</SelectPrimitive.Root>
	);
}
);
export const SelectItem = forwardRef(
	({ children, ...props }, forwardedRef) => {
		return (
			<SelectPrimitive.Item {...props} ref={forwardedRef}>
				<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
				<SelectPrimitive.ItemIndicator>
					<CheckIcon />
				</SelectPrimitive.ItemIndicator>
			</SelectPrimitive.Item>
		);
	}
);