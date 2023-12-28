import { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  Text,
  VStack,
  Center,
  Heading,
  Skeleton,
  useToast,
  ScrollView,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as yup from "yup";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useAuthContext } from "@contexts/auth/AuthContext";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";

import UserAvatarDefault from "@assets/userPhotoDefault.png";

const PHOTO_SIZE = 33;

type FormFieldsProps = {
  name: string;
  email: string;
  old_password?: string;
  new_password?: string | null;
  confirm_password?: string | null;
};

const profileSchema = yup.object({
  name: yup.string().required("Informe um nome"),
  email: yup.string().required("Informe um e-mail.").email("E-mail inválido"),
  old_password: yup.string(),
  new_password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres.")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([null, yup.ref("new_password")], "As senhas devem ser iguais.")
    .when("new_password", {
      is: (val: any) => !!val,
      then: (schema) =>
        schema
          .required("Por favor, confirme sua senha.")
          .transform((value) => (!!value ? value : null)),
    }),
});

export function Profile() {
  const { user, updateUserProfile } = useAuthContext();

  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFieldsProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

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

        const fileExtension = photoUri.split(".").pop();

        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase().replace(" ", "_"),
          uri: photoUri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        const userPhotoUploadPhoto = new FormData();
        userPhotoUploadPhoto.append("avatar", photoFile);

        const avatarUpdatedResponse = await api.patch(
          "/users/avatar",
          userPhotoUploadPhoto,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const userUpdatd = user;

        userUpdatd.avatar = avatarUpdatedResponse.data.avatar;

        await updateUserProfile(userUpdatd);

        toast.show({
          title: "Foto atualizada com sucesso!",
          bgColor: "green.500",
          placement: "top",
        });
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleUpdateProfile(data: FormFieldsProps) {
    try {
      setIsUpdating(true);

      const userUpdated = user;

      userUpdated.name = data.name;

      await api.put("/users", {
        name: data.name,
        password: data.new_password,
        old_password: data.old_password,
      });

      await updateUserProfile(userUpdated);

      toast.show({
        title: "Perfil atualizado com sucesso!",
        bgColor: "green.500",
        placement: "top",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;

      const errorMessage = isAppError
        ? error.message
        : "Ocorreu um erro ao tentar atualizar seu perfil. Tente novamente mais tarde.";

      toast.show({
        title: errorMessage,
        bgColor: "red.500",
        placement: "top",
      });
    } finally {
      setIsUpdating(false);
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
              source={
                user.avatar
                  ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                  : UserAvatarDefault
              }
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
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Nome"
                bg="gray.600"
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="E-mail"
                bg="gray.600"
                isDisabled
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Heading
            alignSelf="flex-start"
            mt={12}
            color="gray.200"
            fontSize="md"
            mb={2}
          >
            Alterar senha
          </Heading>
          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                onChangeText={onChange}
                placeholder="Senha atual"
                bg="gray.600"
                secureTextEntry
              />
            )}
          />

          <Controller
            control={control}
            name="new_password"
            render={({ field: { onChange } }) => (
              <Input
                onChangeText={onChange}
                placeholder="Nova senha"
                bg="gray.600"
                secureTextEntry
                errorMessage={errors.new_password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input
                onChangeText={onChange}
                placeholder="Confirme a nova senha"
                bg="gray.600"
                secureTextEntry
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            onPress={handleSubmit(handleUpdateProfile)}
            label="Atualizar"
            mt={4}
            isLoading={isUpdating}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
