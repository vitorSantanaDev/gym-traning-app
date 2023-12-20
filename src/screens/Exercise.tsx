import { TouchableOpacity } from "react-native";
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  ScrollView,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Button } from "@components/Button";

import BodySVG from "@assets/body.svg";
import SeriesSVG from "@assets/series.svg";
import RepetitionsSVG from "@assets/repetitions.svg";

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>
        <HStack
          mt={4}
          mb={8}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100" fontSize="lg" flexShrink={1}>
            Puxada Frontal
          </Heading>
          <HStack alignItems="center">
            <BodySVG />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView>
        <VStack p={8}>
          <Image
            h={80}
            mb={3}
            w="full"
            rounded="lg"
            overflow="hidden"
            resizeMode="cover"
            alt="Nome do exercício"
            source={{
              uri: "https://supertreino.com/wp-content/uploads/2018/08/photo-1517963879433-6ad2b056d712.jpg",
            }}
          />
          <Box bg="gray.600" pb={4} px={4} rounded="md">
            <HStack
              mt={5}
              mb={6}
              alignItems="center"
              justifyContent="space-around"
            >
              <HStack alignItems="center">
                <SeriesSVG />
                <Text ml={2} color="gray.200">
                  3 séries
                </Text>
              </HStack>
              <HStack alignItems="center">
                <RepetitionsSVG />
                <Text ml={2} color="gray.200">
                  12 repetições
                </Text>
              </HStack>
            </HStack>
            <Button label="Macar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
