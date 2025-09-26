import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Garante que a tela respeite áreas seguras (notch, barra superior, etc.)
import { fetchTemas, fetchPerguntasByTema } from "../db"; // Funções para buscar dados no banco
import styles from "../styles";

export default function SelecionarTemaScreen({ navigation }) {
  // Lista de temas carregados do banco
  const [temas, setTemas] = useState([]);
  // Quantidade de questões que o usuário deseja responder
  const [numQuestoes, setNumQuestoes] = useState("");

  /**
   * useEffect: carrega os temas assim que a tela é montada
   */
  useEffect(() => {
    const carregar = async () => setTemas(await fetchTemas());
    carregar();
  }, []);

  /**
   * Função responsável por iniciar o quiz com base no tema escolhido
   * @param {object} tema - tema selecionado pelo usuário
   */
  const iniciarQuiz = async (tema) => {
    // Valida se o usuário digitou um número
    if (!numQuestoes.trim()) {
      Alert.alert("Erro", "Digite o número de perguntas que deseja resolver.");
      return;
    }

    // Converte para número inteiro
    const qtd = parseInt(numQuestoes);
    if (isNaN(qtd) || qtd < 1) {
      Alert.alert("Erro", "Digite um número válido de perguntas.");
      return;
    }

    // Busca todas as perguntas do tema selecionado
    const perguntas = await fetchPerguntasByTema(tema.id);

    // Caso o tema não tenha perguntas cadastradas
    if (perguntas.length === 0) {
      Alert.alert("Aviso", "Este tema não possui perguntas.");
      return;
    }

    // Caso o usuário peça mais perguntas do que o tema possui
    if (qtd > perguntas.length) {
      Alert.alert(
        "Erro",
        `O tema "${tema.nome}" possui apenas ${perguntas.length} pergunta${perguntas.length !== 1 ? "s" : ""}.`
      );
      return;
    }

    // Seleciona apenas a quantidade de perguntas requisitada
    const perguntasSelecionadas = perguntas.slice(0, qtd);

    // Navega para a tela de Quiz passando:
    // - o tema selecionado
    // - as perguntas que serão usadas
    navigation.navigate("Quiz", { tema, perguntas: perguntasSelecionadas });
  };

  /**
   * Renderiza cada item (tema) da lista
   */
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
      {/* Painel fixo no topo com título e campo para número de perguntas */}
      <View style={{ padding: 16 }}>
        <Text style={[styles.title, { fontSize: 28 }]}>Escolha um Tema</Text>

        <Text style={styles.label}>Número de perguntas:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric" // Força teclado numérico
          value={numQuestoes}
          onChangeText={setNumQuestoes}
          placeholder="Quantas perguntas deseja?"
          placeholderTextColor="#ccc"
        />
      </View>

      {/* Lista de temas cadastrados no banco */}
      <FlatList
        data={temas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTema}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />

      {/* Botão fixo no rodapé para voltar para tela inicial */}
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.buttonText}>Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
