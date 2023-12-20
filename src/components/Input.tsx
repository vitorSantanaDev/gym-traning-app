import {
  FormControl,
  IInputProps,
  Input as NativeBaseInput,
} from "native-base";

type InputProps = IInputProps & { errorMessage?: string };

export function Input({
  isInvalid,
  errorMessage,
  ...restInputProps
}: InputProps) {
  const Iinvalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={Iinvalid} mb={4}>
      <NativeBaseInput
        px={4}
        h={14}
        fontSize="md"
        bg="gray.700"
        borderWidth={0}
        borderColor={"transparent"}
        color="white"
        fontFamily="body"
        _focus={{
          bg: "gray.700",
          borderWidth: 1,
          borderColor: "green.500",
        }}
        isInvalid={Iinvalid}
        _invalid={{ borderWidth: 1, borderColor: "red.500" }}
        placeholderTextColor="gray.300"
        {...restInputProps}
      />
      <FormControl.ErrorMessage _text={{ color: "red.500" }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
