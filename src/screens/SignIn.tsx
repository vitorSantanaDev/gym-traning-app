import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import Logo from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleGotToSignUp() {
    navigation.navigate("signUp");
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
          <Input
            placeholder="E-mail"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Input secureTextEntry placeholder="Senha" />
          <Button label="Acessar" />
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
