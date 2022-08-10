import { FormControl, FormErrorMessage, FormLabel, Input, InputProps, Textarea, TextareaProps } from "@chakra-ui/react";
import React from "react";
import { forwardRef } from "react";


interface TextAreaFieldProps extends TextareaProps{
  label: string;
  placeholder?: string;
  errorMsg?: string;
  ariaLabel?: string;
  isRequired?: boolean;
  textArea?: boolean;
}

function TextAreaField(props: TextAreaFieldProps) {
  return TextAreaFieldForwardedRef(props, null);
}

function TextAreaFieldForwardedRef({label, maxWidth, isRequired, errorMsg, ariaLabel , ...rest}: TextAreaFieldProps, ref: React.ForwardedRef<HTMLTextAreaElement>) {
  return (
    <FormControl isInvalid={!!errorMsg } maxWidth={maxWidth}>
    <FormLabel>{`${label}${isRequired ? '*' : ""}`}</FormLabel>
    <Textarea
      type="text"
      aria-label={ariaLabel ? ariaLabel : label.toLocaleLowerCase()}
      {...rest}
      ref={ref}
    />
    {errorMsg &&
      <FormErrorMessage>{errorMsg}</FormErrorMessage>
    }
  </FormControl>
  );
}

export default TextAreaField;


const TextAreaFieldWithRef = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(TextAreaFieldForwardedRef)

export { TextAreaFieldWithRef }