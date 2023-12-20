import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import Logo from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

type FormFieldsProps = {
  email: string;
  password: string;
  name: string;
  password_confirmation: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe um nome"),
  email: yup.string().required("Informe um e-mail.").email("E-mail inválido"),
  password: yup
    .string()
    .required("Informe uma senha.")
    .min(6, "A senha deve ter no mínimo 6 caracteres."),
  password_confirmation: yup
    .string()
    .oneOf(["", yup.ref("password")], "As senhas devem ser iguais.")
    .required("Por favor, confirme sua senha."),
});

export function SignUp() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFieldsProps>({ resolver: yupResolver(signUpSchema) });

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp({
    name,
    email,
    password,
    password_confirmation,
  }: FormFieldsProps) {
    console.log({ name, email, password, password_confirmation });
  }

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          position="absolute"
          resizeMode="contain"
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="pessoas treinando musculação"
        />
        <Center my={24}>
          <Logo />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>
        <Center mt={16}>
          <Heading mb={6} color="gray.100" fontSize="xl" fontFamily="heading">
            Crie sua conta
          </Heading>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                placeholder="Nome"
                autoCapitalize="none"
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                placeholder="E-mail"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                secureTextEntry
                placeholder="Senha"
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirmation"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                secureTextEntry
                placeholder="Confirme a senha"
                returnKeyType="send"
                onSubmitEditing={handleSubmit(handleSignUp)}
                errorMessage={errors.password_confirmation?.message}
              />
            )}
          />
          <Button
            onPress={handleSubmit(handleSignUp)}
            label="Criar e acessar"
          />
        </Center>

        <Button
          onPress={handleGoBack}
          mt={12}
          variant="outline"
          label="Voltar para o login"
        />
      </VStack>
    </ScrollView>
  );
}
