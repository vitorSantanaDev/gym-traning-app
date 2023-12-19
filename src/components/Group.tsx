import { Pressable, Text, IPressableProps } from "native-base";

type GroupProps = IPressableProps & {
  name: string;
  isActive: boolean;
};

export function Group({ isActive, name, ...restPressableProps }: GroupProps) {
  return (
    <Pressable
      mr={3}
      w={24}
      h={10}
      rounded="md"
      bg="gray.600"
      overflow="hidden"
      alignItems="center"
      justifyContent="center"
      isPressed={isActive}
      _pressed={{ borderColor: "green.500", borderWidth: 1 }}
      {...restPressableProps}
    >
      <Text
        fontSize="xs"
        color={isActive ? "green.500" : "gray.200"}
        fontWeight="bold"
        textTransform="uppercase"
      >
        {name}
      </Text>
    </Pressable>
  );
}
