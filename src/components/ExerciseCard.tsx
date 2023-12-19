import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";

type ExerciseCardProps = TouchableOpacityProps & {};

export function ExerciseCard({
  ...restTouchableOpacityProps
}: ExerciseCardProps) {
  return (
    <TouchableOpacity {...restTouchableOpacityProps}>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <Image
          w={16}
          h={16}
          resizeMode="cover"
          alt="Image do exercício"
          source={{
            uri: "https://supertreino.com/wp-content/uploads/2018/08/photo-1517963879433-6ad2b056d712.jpg",
          }}
          rounded="md"
          mr={4}
        />
        <VStack flex={1}>
          <Heading fontSize="lg" color="white">
            Levantamento Terra
          </Heading>
          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>
        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
