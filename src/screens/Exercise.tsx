import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  Box,
  Icon,
  Text,
  Image,
  VStack,
  HStack,
  Heading,
  useToast,
  ScrollView,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { ExerciseDto } from "@dtos/exercise.dto";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Button } from "@components/Button";

import BodySVG from "@assets/body.svg";
import SeriesSVG from "@assets/series.svg";
import RepetitionsSVG from "@assets/repetitions.svg";
import { Loading } from "@components/Loading";

type RouteParams = {
  exerciseId: number;
};

export function Exercise() {
  const [isLoading, setIsLoading] = useState(true);
  const [sendingRegister, setSendingRegister] = useState(false);
  const [exercise, setExercise] = useState<ExerciseDto>({} as ExerciseDto);

  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();

  const { exerciseId } = route.params as RouteParams;

  function handleGoBack() {
    navigation.goBack();
  }

  function fetchExerciseDetails() {
    (async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/exercises/${exerciseId}`);
        setExercise(response.data);
      } catch (error) {
        const isAppError = error instanceof AppError;
        const errorMessage = isAppError
          ? error.message
          : "Erro ao buscar os detalhes do exercício";

        toast.show({
          title: errorMessage,
          bgColor: "red.500",
          placement: "top",
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }

  function handleExerciseDone() {
    (async () => {
      try {
        setSendingRegister(true);
        await api.post(`/history`, { exercise_id: exerciseId });
        toast.show({
          title: "Exercício marcado como realizado",
          bgColor: "green.700",
          placement: "top",
        });
        navigation.navigate("history");
      } catch (error) {
        const isAppError = error instanceof AppError;
        const errorMessage = isAppError
          ? error.message
          : "Não foi possível marcar o exercício como realizado";

        toast.show({
          title: errorMessage,
          bgColor: "red.500",
          placement: "top",
        });
      } finally {
        setSendingRegister(false);
      }
    })();
  }

  useEffect(fetchExerciseDetails, [exerciseId]);

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
            {exercise.name}
          </Heading>
          <HStack alignItems="center">
            <BodySVG />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <VStack p={8}>
          <Box rounded="lg" mb={3} overflow="hidden">
            <Image
              w="full"
              h={80}
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}`,
              }}
              alt="Nome do exercício"
              resizeMode="cover"
              rounded="lg"
            />
          </Box>
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
                  {exercise.series} séries
                </Text>
              </HStack>
              <HStack alignItems="center">
                <RepetitionsSVG />
                <Text ml={2} color="gray.200">
                  {exercise.repetitions} repetições
                </Text>
              </HStack>
            </HStack>
            <Button
              onPress={handleExerciseDone}
              isLoading={sendingRegister}
              label="Macar como realizado"
            />
          </Box>
        </VStack>
      )}
    </VStack>
  );
}
