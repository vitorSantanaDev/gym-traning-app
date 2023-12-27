import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList, HStack, Heading, Text, VStack, useToast } from "native-base";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { ExerciseDto } from "@dtos/exercise.dto";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Loading } from "@components/Loading";

export function Home() {
  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [groups, setGroups] = useState<string[]>([]);
  const [groupSelected, setGroupSelected] = useState("Antebraço");
  const [exercises, setExercises] = useState<ExerciseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function handleOpenExerciseDetails(exerciseId: number) {
    navigation.navigate("exercise", { exerciseId });
  }

  function fetchGroups() {
    (async () => {
      try {
        const response = await api.get("/groups");
        setGroups(response.data);
      } catch (error) {
        const isAppError = error instanceof AppError;
        const errorMessage = isAppError
          ? error.message
          : "Erro ao buscar grupos de exercícios";

        toast.show({
          title: errorMessage,
          bgColor: "red.500",
          placement: "top",
        });
      }
    })();
  }

  function fetchExercisesByGroup() {
    (async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/exercises/byGroup/${groupSelected}`);
        setExercises(response.data);
      } catch (error) {
        const isAppError = error instanceof AppError;
        const errorMessage = isAppError
          ? error.message
          : "Erro ao buscar exercícios";

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

  useEffect(fetchGroups, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        horizontal
        data={groups}
        keyExtractor={(i) => i}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8}>
          <HStack justifyContent="space-between" mb={5}>
            <Heading color="gray.200" fontSize="md">
              Exercícios
            </Heading>
            <Text color="gray.200" fontSize="sm">
              {exercises.length}
            </Text>
          </HStack>
          <FlatList
            data={exercises}
            keyExtractor={(i) => `${i.id}`}
            renderItem={({ item }) => (
              <ExerciseCard
                onPress={() => handleOpenExerciseDetails(item.id)}
                data={item}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      )}
    </VStack>
  );
}
