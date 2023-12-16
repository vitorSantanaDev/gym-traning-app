import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type ButtonProps = IButtonProps & {
  label: string;
  variant?: "solid" | "outline";
};

export function Button({
  label,
  variant = "solid",
  ...restButtonProps
}: ButtonProps) {
  return (
    <ButtonNativeBase
      rounded="sm"
      w="full"
      h={14}
      bg={variant === "outline" ? "trasnparent" : "green.700"}
      variant={variant}
      _pressed={{ bg: variant === "outline" ? "gray.500" : "green.500" }}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor="green.500"
      {...restButtonProps}
    >
      <Text
        color={variant === "outline" ? "green.500" : "white"}
        fontFamily="heading"
        fontSize="sm"
      >
        {label}
      </Text>
    </ButtonNativeBase>
  );
}
