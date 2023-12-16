import { IInputProps, Input as NativeBaseInput } from "native-base";

type InputProps = IInputProps;

export function Input({ ...restInputProps }: InputProps) {
  return (
    <NativeBaseInput
      px={4}
      h={14}
      fontSize="md"
      bg="gray.700"
      borderWidth={0}
      color="white"
      fontFamily="body"
      mb={4}
      _focus={{ bg: "gray.700", borderWidth: 1, borderColor: "green.500" }}
      placeholderTextColor="gray.300"
      {...restInputProps}
    />
  );
}
