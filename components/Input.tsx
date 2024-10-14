import clsx from "clsx";
import React, { ComponentProps, useId } from "react";

type InputProps = {
	wrapperClassName?: string;
	inputClassName?: string;
	label?: string;
	helpText?: string;
} & Omit<ComponentProps<"input">, "className">;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			wrapperClassName: passedWrapperClassName,
			inputClassName: passedInputClassName,
			label,
			helpText,
			...props
		},
		ref
	) => {
		const inputId = useId();
		const wrapperClassName = clsx(
			"w-full inline-block border border-gray-300 bg-white rounded-md p-3 focus-within:border-black transition",
			passedWrapperClassName
		);

		const inputClassName = clsx(
			"outline-none w-full",
			passedInputClassName
		);

		return (
			<div className="flex flex-col items-start bg-">
				{/* Input */}
				<div className={wrapperClassName}>
					<input
						ref={ref}
						id={inputId}
						type="text"
						className={inputClassName}
						{...props}
					/>
				</div>

				{/* Help Text */}
				{helpText && (
					<small className="mt-1 text-gray-400 text-xs">
						{helpText}
					</small>
				)}
			</div>
		);
	}
);

Input.displayName = "Input";

export default Input;
