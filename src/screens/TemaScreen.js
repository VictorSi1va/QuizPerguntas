import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles";
import { fetchTemas, insertTema, deleteTema, updateTema } from "../db";

export default function TemaScreen({ navigation }) {
  // Lista de temas carregados do banco
  const [temas, setTemas] = useState([]);
  // Texto do novo tema a ser adicionado
  const [novoTema, setNovoTema] = useState("");

  // Estados auxiliares para edição
  const [editModalVisible, setEditModalVisible] = useState(false); // controla visibilidade do modal
  const [temaEditando, setTemaEditando] = useState(null); // armazena ID do tema em edição
  const [novoNomeEditando, setNovoNomeEditando] = useState(""); // armazena novo nome digitado

  /**
   * Função que busca os temas no banco de dados e atualiza o estado
   */
  const carregarTemas = async () => {
    const t = await fetchTemas();
    setTemas(t);
  };

  // Carrega os temas assim que a tela abre
  useEffect(() => {
    carregarTemas();
  }, []);

  /**
   * Adiciona um novo tema ao banco
   */
  const adicionarTema = async () => {
    if (!novoTema.trim()) {
      Alert.alert("Erro", "Digite um nome para o tema");
      return;
    }

    // Verifica se já existe um tema com o mesmo nome
    const jaExiste = temas.some(
      (t) => t.nome.toLowerCase() === novoTema.trim().toLowerCase()
    );
    if (jaExiste) {
      Alert.alert("Erro", "Esse tema já existe!");
      return;
    }

    // Insere no banco
    await insertTema(novoTema.trim());
    setNovoTema(""); // limpa input
    carregarTemas(); // atualiza lista
  };

  /**
   * Exclui um tema (e suas perguntas associadas) após confirmação
   */
  const removerTema = async (id) => {
    Alert.alert("Confirmação", "Deseja excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await deleteTema(id);
          carregarTemas();
        },
      },
    ]);
  };

  /**
   * Abre modal de edição no Android
   */
  const editarTema = (id, nomeAtual) => {
    setTemaEditando(id);
    setNovoNomeEditando(nomeAtual);
    setEditModalVisible(true);
  };

  /**
   * Salva edição no Android
   */
  const salvarEdicaoAndroid = async () => {
    if (!novoNomeEditando.trim()) {
      Alert.alert("Erro", "O nome não pode estar vazio!");
      return;
    }

    const jaExiste = temas.some(
      (t) => t.nome.toLowerCase() === novoNomeEditando.trim().toLowerCase()
    );
    if (jaExiste) {
      Alert.alert("Erro", "Esse tema já existe!");
      return;
    }

    await updateTema(temaEditando, novoNomeEditando.trim());
    setEditModalVisible(false); // fecha modal
    setTemaEditando(null); // reseta estado
    setNovoNomeEditando("");
    carregarTemas(); // recarrega lista
  };

  /**
   * Footer da lista com botão para voltar para Home
   */
  const footer = () => (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
      <Text style={styles.buttonText}>Voltar para Home</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1e1e2e", padding: 16 }}>
      {/* Título da tela */}
      <Text style={[styles.title, { fontSize: 28 }]}>Temas</Text>

      {/* Formulário para adicionar novo tema */}
      <Text style={styles.label}>Novo Tema:</Text>
      <TextInput
        style={[styles.input, { color: "#fff" }]}
        placeholder="Digite o nome do tema"
        placeholderTextColor="#ccc"
        value={novoTema}
        onChangeText={setNovoTema}
      />
      <TouchableOpacity style={styles.button} onPress={adicionarTema}>
        <Text style={styles.buttonText}>Adicionar Tema</Text>
      </TouchableOpacity>

      {/* Lista de temas */}
      <FlatList
        data={temas}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.listItemRow}>
            {/* Clicar no item leva para tela de perguntas */}
            <TouchableOpacity
              style={[styles.listItem, { flex: 1 }]}
              onPress={() => navigation.navigate("QuestionsScreen", { tema: item })}
            >
              <Text style={[styles.listText, { color: "#fff" }]}>{item.nome}</Text>
              <Text style={[styles.subText, { color: "#ddd" }]}>
                {item.qtd} pergunta{item.qtd !== 1 ? "s" : ""}
              </Text>
            </TouchableOpacity>

            {/* Botão de edição */}
            <TouchableOpacity
              style={[styles.buttonSmall, { backgroundColor: "#4caf50" }]}
              onPress={() => editarTema(item.id, item.nome)}
            >
              <Text style={styles.buttonTextSmall}>Editar</Text>
            </TouchableOpacity>

            {/* Botão de exclusão */}
            <TouchableOpacity style={styles.buttonSmall} onPress={() => removerTema(item.id)}>
              <Text style={styles.buttonTextSmall}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={footer}
      />

      {/* Modal customizado para edição */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.6)" }}>
          <View style={{ backgroundColor: "#333", padding: 20, borderRadius: 10, width: "80%" }}>
            <Text style={{ color: "#fff", marginBottom: 10, fontSize: 18 }}>Editar Tema</Text>
            
            {/* Input para novo nome */}
            <TextInput
              style={[styles.input, { color: "#fff", backgroundColor: "#444" }]}
              value={novoNomeEditando}
              onChangeText={setNovoNomeEditando}
            />

            {/* Botões do modal */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
              {/* Cancelar */}
              <TouchableOpacity style={[styles.buttonSmall, { backgroundColor: "#f44336" }]} onPress={() => setEditModalVisible(false)}>
                <Text style={styles.buttonTextSmall}>Cancelar</Text>
              </TouchableOpacity>
              {/* Salvar */}
              <TouchableOpacity style={[styles.buttonSmall, { backgroundColor: "#4caf50" }]} onPress={salvarEdicaoAndroid}>
                <Text style={styles.buttonTextSmall}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
