import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles";

export default function QuizScreen({ route, navigation }) {
  // Parâmetros recebidos da tela anterior
  const { tema, perguntas } = route.params;

  // Estado que guarda o índice da pergunta atual
  const [index, setIndex] = useState(0);
  // Array que guarda as respostas escolhidas pelo usuário (inicialmente todas null)
  const [respostas, setRespostas] = useState(Array(perguntas.length).fill(null));

  // Pergunta que está sendo exibida no momento
  const perguntaAtual = perguntas[index];

  /**
   * Função chamada quando o usuário seleciona uma resposta
   * @param {number} alt - índice da alternativa escolhida (1 a 4)
   */
  const selecionarResposta = (alt) => {
    // Cria uma cópia das respostas para não mutar o estado diretamente
    const novasRespostas = [...respostas];
    // Marca a alternativa escolhida para a pergunta atual
    novasRespostas[index] = alt;
    setRespostas(novasRespostas);

    // Verifica se ainda há perguntas restantes
    if (index + 1 < perguntas.length) {
      // Vai para a próxima pergunta
      setIndex(index + 1);
    } else {
      // Se não há mais perguntas, calcula o score final
      const score = perguntas.reduce(
        (acc, p, i) => acc + (p.correta === novasRespostas[i] ? 1 : 0),
        0
      );

      // Redireciona para a tela de resultados, passando:
      // - todas as perguntas
      // - as respostas do usuário
      // - o score calculado
      // - o tema do quiz
      navigation.replace("ResultScreen", { perguntas, respostas: novasRespostas, score, tema });
    }
  };

  /**
   * Renderiza cada opção de resposta como um botão
   */
  const renderOption = ({ item, index: optionIndex }) => (
    <TouchableOpacity
      style={styles.optionButton}
      onPress={() => selecionarResposta(optionIndex + 1)} // +1 pois as alternativas vão de 1 a 4
    >
      <Text style={styles.optionText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1e1e2e" }}>
      {/* Cabeçalho fixo: mostra tema e progresso da pergunta */}
      <View style={{ padding: 16 }}>
        <Text style={[styles.title, { fontSize: 28 }]}>Quiz: {tema.nome}</Text>
        <Text style={styles.question}>
          Pergunta {index + 1} de {perguntas.length}
        </Text>
        <Text style={[styles.question, { marginTop: 12 }]}>{perguntaAtual.texto}</Text>
      </View>

      {/* Lista de alternativas da pergunta atual */}
      <FlatList
        data={[perguntaAtual.alt1, perguntaAtual.alt2, perguntaAtual.alt3, perguntaAtual.alt4]}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={renderOption}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />

      {/* Botões fixos no rodapé para sair do quiz */}
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        {/* Voltar para a seleção de tema */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SelecionarTema")}
        >
          <Text style={styles.buttonText}>Voltar para Seleção de Tema</Text>
        </TouchableOpacity>

        {/* Voltar para Home */}
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
