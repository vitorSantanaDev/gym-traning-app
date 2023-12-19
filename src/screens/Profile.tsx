import { useState } from "react";
import {
  Text,
  VStack,
  Center,
  Heading,
  Skeleton,
  ScrollView,
} from "native-base";
import { TouchableOpacity } from "react-native";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading] = useState(false);
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.300"
              endColor="gray.200"
            />
          ) : (
            <UserPhoto
              alt="Foto do usuário"
              source={{ uri: "https://github.com/vitorSantanaDev.png" }}
              size={PHOTO_SIZE}
            />
          )}
          <TouchableOpacity>
            <Text
              mb={8}
              mt={2}
              color="green.500"
              fontWeight="bold"
              fontSize="md"
            >
              Alterar foto
            </Text>
          </TouchableOpacity>
          <Input placeholder="Nome" bg="gray.600" />
          <Input placeholder="E-mail" bg="gray.600" isDisabled />
          <Heading
            alignSelf="flex-start"
            mt={12}
            color="gray.200"
            fontSize="md"
            mb={2}
          >
            Alterar senha
          </Heading>
          <Input placeholder="Senha atual" bg="gray.600" secureTextEntry />
          <Input placeholder="Nova senha" bg="gray.600" secureTextEntry />
          <Input
            placeholder="Confirme a nova senha"
            bg="gray.600"
            secureTextEntry
          />
          <Button label="Atualizar" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  );
}
