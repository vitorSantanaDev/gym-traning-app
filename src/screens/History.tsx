import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Heading, VStack, SectionList, Text, useToast } from "native-base";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { HistoryByDayDto } from "@dtos/history-by-day.dto";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";

export function History() {
  const [exercises, setExercises] = useState<HistoryByDayDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();

  function fetchHistory() {
    (async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/history");
        setExercises(response.data);
      } catch (error) {
        const isAppError = error instanceof AppError;
        const errorMessage = isAppError
          ? error.message
          : "Não foi possível carregar o histórico de exercícios";

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

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Hotórico de exercícios" />
      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(i) => i.id.toString()}
          stickySectionHeadersEnabled={false}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
              {title}
            </Heading>
          )}
          px={8}
          contentContainerStyle={
            exercises.length === 0 && { flex: 1, justifyContent: "center" }
          }
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados ainda.{"\n"} Vamos treinar hoje?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  );
}
