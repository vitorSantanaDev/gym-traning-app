import { TouchableOpacity } from "react-native";
import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { api } from "@services/api";
import { UserPhoto } from "./UserPhoto";
import { useAuthContext } from "@contexts/auth/AuthContext";

import UserAvatarDefault from "@assets/userPhotoDefault.png";

export function HomeHeader() {
  const { user, signOut } = useAuthContext();

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        mr={4}
        size={16}
        alt="Foto do usuário"
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
            : UserAvatarDefault
        }
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md">
          {user.name}
        </Heading>
      </VStack>
      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
