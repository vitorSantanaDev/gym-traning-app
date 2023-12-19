import { useState } from "react";
import { Heading, VStack, SectionList, Text } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";

export function History() {
  const [exercises] = useState([
    {
      title: "20.03.2024",
      data: ["Puxada frontal", "Remada Alta", "Remada Baixa"],
    },
    {
      title: "19.03.2024",
      data: ["Puxada frontal", "Remada Alta", "Remada Baixa"],
    },
    {
      title: "18.03.2024",
      data: ["Puxada frontal", "Remada Alta", "Remada Baixa"],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Hotórico de exercícios" />
      <SectionList
        sections={exercises}
        keyExtractor={(i) => i}
        stickySectionHeadersEnabled={false}
        renderItem={() => <HistoryCard />}
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
    </VStack>
  );
}
