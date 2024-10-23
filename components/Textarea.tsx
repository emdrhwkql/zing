import clsx from "clsx";
import React, { ComponentProps, useId } from "react";

type TextareaProps = {
	wrapperClassName?: string;
	inputClassName?: string;
	label?: string;
	helpText?: string;
} & Omit<ComponentProps<"textarea">, "className">;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
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
				{/* Textarea */}
				<div className={wrapperClassName}>
					<textarea
						ref={ref}
						id={inputId}
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

export default Textarea;
