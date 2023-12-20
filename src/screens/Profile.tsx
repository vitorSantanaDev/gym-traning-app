import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import {
  Text,
  VStack,
  Center,
  Heading,
  Skeleton,
  ScrollView,
  useToast,
} from "native-base";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const [selectedPhoto, setSelectedPhoto] = useState<string>(
    "https://github.com/vitorSantanaDev.png"
  );

  const toast = useToast();

  async function handleUserPhotoSelect() {
    try {
      setPhotoIsLoading(true);
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) return;

      const photoUri = photoSelected.assets[0].uri;

      if (photoUri) {
        const photoInfo = await FileSystem.getInfoAsync(photoUri);

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          toast.show({
            title: "A foto selecionada deve ter no máximo 5MB",
            placement: "top",
            bgColor: "red.500",
          });
          return;
        }

        setSelectedPhoto(photoUri);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setPhotoIsLoading(false);
    }
  }

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
              source={{ uri: selectedPhoto }}
              size={PHOTO_SIZE}
            />
          )}
          <TouchableOpacity onPress={handleUserPhotoSelect}>
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
