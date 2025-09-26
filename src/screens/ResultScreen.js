import React from "react";
import { View, Text, TouchableOpacity, FlatList, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles";

export default function ResultScreen({ route, navigation }) {
  // Dados recebidos da tela do Quiz
  const { perguntas, respostas, score } = route.params;
  const total = perguntas.length; // total de perguntas respondidas

  /**
   * Renderiza cada pergunta com feedback visual:
   * - Verde se o usuário acertou
   * - Vermelho se errou
   */
  const renderItem = ({ item, index }) => {
    const respostaUsuario = respostas[index]; // resposta escolhida pelo usuário
    const acertou = item.correta === respostaUsuario; // verifica se foi correta

    return (
      <View
        style={[
          styles.listItem,
          {
            // Define cor de fundo e borda dependendo do acerto
            backgroundColor: acertou ? "#1e3e1e" : "#3e1e1e",
            borderColor: acertou ? "#00ff99" : "#ff4d6d",
            padding: 14,
            marginVertical: 6,
          },
        ]}
      >
        {/* Enunciado da pergunta */}
        <Text style={{ fontSize: 20, color: "#fff", fontWeight: "600", marginBottom: 6 }}>
          {item.texto}
        </Text>

        {/* Resposta escolhida pelo usuário */}
        <Text style={{ fontSize: 18, color: acertou ? "#00ff99" : "#ff4d6d", marginBottom: 4 }}>
          Sua resposta: {respostaUsuario ? item[`alt${respostaUsuario}`] : "Não respondeu"}{" "}
          {acertou ? "✅" : "❌"}
        </Text>

        {/* Caso tenha errado, mostra a resposta correta */}
        {!acertou && (
          <Text style={{ fontSize: 18, color: "#00bfff" }}>
            Resposta correta: {item[`alt${item.correta}`]}
          </Text>
        )}
      </View>
    );
  };

  // Calcula a porcentagem de acertos
  const percScore = ((score / total) * 100).toFixed(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1e1e2e" }}>
      {/* Cabeçalho com título e painel de pontuação */}
      <View style={{ padding: 16 }}>
        <Text style={[styles.title, { fontSize: 36, marginBottom: 16 }]}>Resultado</Text>

        {/* Painel de pontuação com barra de progresso */}
        <View
          style={{
            backgroundColor: "#2e2e3e",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 22, color: "#fff", marginBottom: 8 }}>Pontuação Final</Text>
          <Text style={{ fontSize: 32, fontWeight: "bold", color: "#00ff99" }}>
            {score} / {total} ({percScore}%)
          </Text>

          {/* Barra de progresso visual mostrando % de acertos */}
          <View
            style={{
              height: 12,
              width: "100%",
              backgroundColor: "#39394d",
              borderRadius: 6,
              marginTop: 12,
            }}
          >
            <Animated.View
              style={{
                height: 12,
                width: `${percScore}%`, // largura proporcional ao score
                backgroundColor: "#6c63ff",
                borderRadius: 6,
              }}
            />
          </View>
        </View>
      </View>

      {/* Lista de perguntas com feedback (acertou/errou) */}
      <FlatList
        data={perguntas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />

      {/* Botões fixos no rodapé */}
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        {/* Jogar novamente → volta para tela de seleção de tema */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SelecionarTema")}
        >
          <Text style={styles.buttonText}>Jogar Novamente</Text>
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
