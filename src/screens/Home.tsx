import { useState } from "react";
import { FlatList, HStack, Heading, Text, VStack } from "native-base";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
  const [groups] = useState([
    "Peito",
    "Pernas",
    "Ombro",
    "Bíceps",
    "Tríceps",
    "Costas",
    "Abdômen",
  ]);

  const [groupSelected, setGroupSelected] = useState("");
  const [exercises] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

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
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
      />
      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            4
          </Text>
        </HStack>
        <FlatList
          data={exercises}
          keyExtractor={(i) => i.toString()}
          renderItem={() => <ExerciseCard />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}
