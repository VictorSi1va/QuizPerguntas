import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles";

export default function QuizScreen({ route, navigation }) {
  const { tema, perguntas } = route.params;
  const [index, setIndex] = useState(0);
  const [respostas, setRespostas] = useState(Array(perguntas.length).fill(null));

  const perguntaAtual = perguntas[index];

  const selecionarResposta = (alt) => {
    const novasRespostas = [...respostas];
    novasRespostas[index] = alt;
    setRespostas(novasRespostas);

    if (index + 1 < perguntas.length) {
      setIndex(index + 1);
    } else {
      const score = perguntas.reduce(
        (acc, p, i) => acc + (p.correta === novasRespostas[i] ? 1 : 0),
        0
      );
      navigation.replace("ResultScreen", { perguntas, respostas: novasRespostas, score, tema });
    }
  };

  const renderOption = ({ item, index: optionIndex }) => (
    <TouchableOpacity
      style={styles.optionButton}
      onPress={() => selecionarResposta(optionIndex + 1)}
    >
      <Text style={styles.optionText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1e1e2e" }}>
      {/* Cabeçalho fixo */}
      <View style={{ padding: 16 }}>
        <Text style={[styles.title, { fontSize: 28 }]}>Quiz: {tema.nome}</Text>
        <Text style={styles.question}>
          Pergunta {index + 1} de {perguntas.length}
        </Text>
        <Text style={[styles.question, { marginTop: 12 }]}>{perguntaAtual.texto}</Text>
      </View>

      {/* Lista de alternativas rolando */}
      <FlatList
        data={[perguntaAtual.alt1, perguntaAtual.alt2, perguntaAtual.alt3, perguntaAtual.alt4]}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={renderOption}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />

      {/* Botões fixos no rodapé */}
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SelecionarTema")}
        >
          <Text style={styles.buttonText}>Voltar para Seleção de Tema</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
