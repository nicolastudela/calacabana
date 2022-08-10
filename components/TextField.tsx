import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from "@chakra-ui/react";
import React from "react";
import { forwardRef } from "react";


interface TextFieldProps extends InputProps{
  label: string;
  placeholder?: string;
  errorMsg?: string;
  ariaLabel?: string;
  isRequired?: boolean;
  textArea?: boolean;
}

function TextField(props: TextFieldProps) {
  return TextFieldForwardedRef(props, null);
}

function TextFieldForwardedRef({label, maxWidth, isRequired, errorMsg, ariaLabel , ...rest}: TextFieldProps, ref: React.ForwardedRef<HTMLInputElement>) {
  return (
    <FormControl isInvalid={!!errorMsg } maxWidth={maxWidth}>
    <FormLabel>{`${label}${isRequired ? '*' : ""}`}</FormLabel>
    <Input
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

export default TextField;


const TextFieldWithRef = React.forwardRef<HTMLInputElement, TextFieldProps>(TextFieldForwardedRef)

export { TextFieldWithRef }