import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import Logo from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

type SignInFormFieldsProps = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "A senha deve conter no mínimo 6 dígitos."),
});

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormFieldsProps>({
    resolver: yupResolver(signInFormSchema),
  });

  function handleGotToSignUp() {
    navigation.navigate("signUp");
  }

  async function handleSignIn({ email, password }: SignInFormFieldsProps) {
    console.log({ email, password });
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
        <Center mt={24}>
          <Heading mb={6} color="gray.100" fontSize="xl" fontFamily="heading">
            Acesse sua conta
          </Heading>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                secureTextEntry
                placeholder="Senha"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Button onPress={handleSubmit(handleSignIn)} label="Acessar" />
        </Center>
        <Center mt={24}>
          <Text color="gray.100" mb={3} fontSize="sm" fontFamily="body">
            Ainda não tem acesso?
          </Text>
          <Button
            onPress={handleGotToSignUp}
            variant="outline"
            label="Criar conta"
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
