import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // <-- IMPORT CORRETO
import { fetchTemas, fetchPerguntasByTema } from "../db";
import styles from "../styles";

export default function SelecionarTemaScreen({ navigation }) {
  const [temas, setTemas] = useState([]);
  const [numQuestoes, setNumQuestoes] = useState("");

  useEffect(() => {
    const carregar = async () => setTemas(await fetchTemas());
    carregar();
  }, []);

  const iniciarQuiz = async (tema) => {
    if (!numQuestoes.trim()) {
      Alert.alert("Erro", "Digite o número de perguntas que deseja resolver.");
      return;
    }

    const qtd = parseInt(numQuestoes);
    if (isNaN(qtd) || qtd < 1) {
      Alert.alert("Erro", "Digite um número válido de perguntas.");
      return;
    }

    const perguntas = await fetchPerguntasByTema(tema.id);
    if (perguntas.length === 0) {
      Alert.alert("Aviso", "Este tema não possui perguntas.");
      return;
    }

    if (qtd > perguntas.length) {
      Alert.alert(
        "Erro",
        `O tema "${tema.nome}" possui apenas ${perguntas.length} pergunta${perguntas.length !== 1 ? "s" : ""}.`
      );
      return;
    }

    const perguntasSelecionadas = perguntas.slice(0, qtd);
    navigation.navigate("Quiz", { tema, perguntas: perguntasSelecionadas });
  };

  const renderTema = ({ item }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => iniciarQuiz(item)}>
      <Text style={styles.listText}>{item.nome}</Text>
      <Text style={styles.subText}>
        {item.qtd} pergunta{item.qtd !== 1 ? "s" : ""}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1e1e2e" }}>
      {/* Painel fixo do topo */}
      <View style={{ padding: 16 }}>
        <Text style={[styles.title, { fontSize: 28 }]}>Escolha um Tema</Text>

        <Text style={styles.label}>Número de perguntas:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={numQuestoes}
          onChangeText={setNumQuestoes}
          placeholder="Quantas perguntas deseja?"
          placeholderTextColor="#ccc"
        />
      </View>

      {/* Lista rolando */}
      <FlatList
        data={temas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTema}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />

      {/* Botão fixo no rodapé */}
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.buttonText}>Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
