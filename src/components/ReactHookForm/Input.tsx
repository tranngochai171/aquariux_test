import { TextField } from "@mui/material";
import { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";

export type InputProps = ComponentProps<typeof TextField> & {
  name: string;
  label: string;
};

const Input = (props: any) => {
  const { name, label, ...rest } = props;
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, error },
        formState,
      }) => {
        return (
          <TextField
            onBlur={onBlur} // notify when input is touched
            onChange={onChange} // send value to hook form
            value={value}
            label={label}
            error={!!invalid}
            helperText={error?.message}
            {...rest}
          />
        );
      }}
    />
  );
};

export default Input;
