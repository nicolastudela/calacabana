import { UserInquiry } from "@/types/shared";
import { EMAIL_REGEX } from "@/utils/validation";
import {
  Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextAreaFieldWithRef as TextAreaField } from "@/components/TextArea";
import { TextFieldWithRef as TextField } from "@/components/TextField";

const t = (key: string, args?: Record<string, string>) => {
  switch (key) {
    case "minLengthRequired":
      return `Debe tener mas de ${args && args.minLength} caracteres`;
    case "fieldIsRequired":
      return "Este campo es requerido";
    case "inputEmailInvalid":
      return "Ingrese una casilla de mail valida";
    case "inputPhoneInvalid":
      return "Ingrese un telefono valido";
    default:
      "";
  }
  return "";
};

type FormValues = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: number | null;
  body: string | null;
};

export interface ContactUsProps {
  onChange: (values: UserInquiry | null) => void;
}

const ContactUs = ({ onChange }: ContactUsProps) => {
  const {
    register,
    getValues,
    formState: { isValidating, isValid, errors },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      body: null,
    },
  });

  useEffect(() => {
    if (isValid && !isValidating) {
      const formValues = getValues();
      if (formValues.body && formValues.firstName && formValues.lastName && formValues.email && formValues.phone )
        onChange(formValues as UserInquiry);
    } else if (!isValid && !isValidating)  {
      onChange(null);
    }
  }, [getValues, isValid, isValidating, onChange]);

  return (
    <Flex w={"full"} direction="column" gap={4}>
      <Flex
        w={"full"}
        direction="row"
        wrap={"wrap"}
        gap={2}
        justifyContent="space-between"
      >
        <TextField
          maxWidth={"sm"}
          label="Nombre"
          isRequired
          type="text"
          errorMsg={errors.firstName?.message}
          {...register("firstName", {
            required: {
              value: true,
              message: t("fieldIsRequired"),
            },
            minLength: {
              value: 3,
              message: t("minLengthRequired", { minLength: "3" }),
            },
          })}
        />
        <TextField
          maxWidth={"sm"}
          label="Apellido"
          isRequired
          type="text"
          errorMsg={errors.lastName?.message}
          {...register("lastName", {
            required: {
              value: true,
              message: t("fieldIsRequired"),
            },
            minLength: {
              value: 3,
              message: t("minLengthRequired", { minLength: "3" }),
            },
          })}
        />
      </Flex>
      <Flex
        w={"full"}
        direction="row"
        wrap={"wrap"}
        gap={2}
        justifyContent="space-between"
      >
        <TextField
          maxWidth={"sm"}
          label="Email"
          isRequired
          type="email"
          errorMsg={errors.email?.message}
          {...register("email", {
            required: {
              value: true,
              message: t("fieldIsRequired"),
            },
            minLength: {
              value: 3,
              message: t("minLengthRequired", { minLength: "3" }),
            },
            pattern: {
              value: EMAIL_REGEX,
              message: t("inputEmailInvalid"),
            },
          })}
        />
        <TextField
          maxWidth={"sm"}
          label="Telefono"
          isRequired
          type="number"
          errorMsg={errors.phone?.message}
          {...register("phone", {
            required: {
              value: true,
              message: t("fieldIsRequired"),
            },
            minLength: {
              value: 8,
              message: t("inputPhoneInvalid", { minLength: "8" }),
            },
          })}
        />
      </Flex>
      <TextAreaField
        label="Contanos sobre tu viaje"
        isRequired
        errorMsg={errors.body?.message}
        h={40}
        {...register("body", {
          required: {
            value: true,
            message: t("fieldIsRequired"),
          },
          minLength: {
            value: 10,
            message: t("minLengthRequired", { minLength: "10" }),
          },
        })}
      />
    </Flex>
  );
};

export default ContactUs;
