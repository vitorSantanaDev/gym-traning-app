import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import Logo from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

export function SignUp() {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
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
          <Input placeholder="Nome" autoCapitalize="none" />
          <Input
            placeholder="E-mail"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Input secureTextEntry placeholder="Senha" />
          <Button label="Criar e acessar" />
        </Center>

        <Button
          onPress={handleGoBack}
          mt={24}
          variant="outline"
          label="Voltar para o login"
        />
      </VStack>
    </ScrollView>
  );
}
