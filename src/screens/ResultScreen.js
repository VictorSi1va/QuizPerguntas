import React from "react";
import { View, Text, TouchableOpacity, FlatList, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles";

export default function ResultScreen({ route, navigation }) {
  const { perguntas, respostas, score } = route.params;
  const total = perguntas.length;

  const renderItem = ({ item, index }) => {
    const respostaUsuario = respostas[index];
    const acertou = item.correta === respostaUsuario;

    return (
      <View
        style={[
          styles.listItem,
          {
            backgroundColor: acertou ? "#1e3e1e" : "#3e1e1e",
            borderColor: acertou ? "#00ff99" : "#ff4d6d",
            padding: 14,
            marginVertical: 6,
          },
        ]}
      >
        <Text style={{ fontSize: 20, color: "#fff", fontWeight: "600", marginBottom: 6 }}>
          {item.texto}
        </Text>

        <Text style={{ fontSize: 18, color: acertou ? "#00ff99" : "#ff4d6d", marginBottom: 4 }}>
          Sua resposta: {respostaUsuario ? item[`alt${respostaUsuario}`] : "Não respondeu"}{" "}
          {acertou ? "✅" : "❌"}
        </Text>

        {!acertou && (
          <Text style={{ fontSize: 18, color: "#00bfff" }}>
            Resposta correta: {item[`alt${item.correta}`]}
          </Text>
        )}
      </View>
    );
  };

  const percScore = ((score / total) * 100).toFixed(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1e1e2e" }}>
      {/* Cabeçalho e painel de pontuação fixos */}
      <View style={{ padding: 16 }}>
        <Text style={[styles.title, { fontSize: 36, marginBottom: 16 }]}>Resultado</Text>

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
                width: `${percScore}%`,
                backgroundColor: "#6c63ff",
                borderRadius: 6,
              }}
            />
          </View>
        </View>
      </View>

      {/* FlatList rolando */}
      <FlatList
        data={perguntas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />

      {/* Botões fixos no rodapé */}
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SelecionarTema")}
        >
          <Text style={styles.buttonText}>Jogar Novamente</Text>
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
