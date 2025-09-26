import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; 
import styles from "../styles";
import CustomSelect from "../components/CustomSelect";
import { fetchPerguntasByTema, insertPergunta, updatePergunta, deletePergunta } from "../db";

export default function QuestionsScreen({ route, navigation }) {
  // Tema recebido por parâmetro da tela anterior (TemaScreen)
  const { tema } = route.params;

  // Estados para gerenciar lista de perguntas e inputs do formulário
  const [perguntas, setPerguntas] = useState([]); // lista de perguntas do tema
  const [texto, setTexto] = useState(""); // enunciado da pergunta
  const [alt1, setAlt1] = useState(""); // alternativa 1
  const [alt2, setAlt2] = useState(""); // alternativa 2
  const [alt3, setAlt3] = useState(""); // alternativa 3
  const [alt4, setAlt4] = useState(""); // alternativa 4
  const [correta, setCorreta] = useState(1); // alternativa correta (1 a 4)
  const [editId, setEditId] = useState(null); // ID da pergunta em edição

  /**
   * Carrega todas as perguntas do tema atual
   */
  const carregarPerguntas = async () => {
    setPerguntas(await fetchPerguntasByTema(tema.id));
  };

  // Executa a carga inicial das perguntas quando a tela abre
  useEffect(() => {
    carregarPerguntas();
  }, []);

  /**
   * Limpa os campos do formulário e reseta estados de edição
   */
  const limparCampos = () => {
    setTexto("");
    setAlt1("");
    setAlt2("");
    setAlt3("");
    setAlt4("");
    setCorreta(1);
    setEditId(null);
  };

  /**
   * Adiciona uma nova pergunta no banco
   */
  const adicionarPergunta = async () => {
    // Valida se todos os campos estão preenchidos
    if (!texto.trim() || !alt1 || !alt2 || !alt3 || !alt4) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    // Verifica se já existe pergunta igual no tema
    if (perguntas.some((p) => p.texto.trim().toLowerCase() === texto.trim().toLowerCase())) {
      Alert.alert("Erro", "Já existe uma pergunta com esse enunciado!");
      return;
    }

    // Impede que adicione caso esteja em modo edição
    if (editId) {
      Alert.alert("Aviso", "Você selecionou uma pergunta para edição. Use Alterar.");
      return;
    }

    // Insere no banco
    await insertPergunta({ texto, tema_id: tema.id, alt1, alt2, alt3, alt4, correta });
    Alert.alert("Sucesso", "Pergunta adicionada!");
    limparCampos();
    carregarPerguntas();
  };

  /**
   * Prepara os campos para edição de uma pergunta selecionada
   */
  const prepararAlterar = (p) => {
    setTexto(p.texto);
    setAlt1(p.alt1);
    setAlt2(p.alt2);
    setAlt3(p.alt3);
    setAlt4(p.alt4);
    setCorreta(p.correta);
    setEditId(p.id);
  };

  /**
   * Altera os dados de uma pergunta existente
   */
  const alterarPergunta = async () => {
    if (!editId) {
      Alert.alert("Erro", "Selecione uma pergunta para alterar.");
      return;
    }
    if (!texto.trim() || !alt1 || !alt2 || !alt3 || !alt4) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    // Evita duplicação de perguntas
    if (perguntas.some((p) => p.id !== editId && p.texto.trim().toLowerCase() === texto.trim().toLowerCase())) {
      Alert.alert("Erro", "Já existe outra pergunta com esse enunciado!");
      return;
    }

    // Atualiza no banco
    await updatePergunta({ id: editId, texto, tema_id: tema.id, alt1, alt2, alt3, alt4, correta });
    Alert.alert("Sucesso", "Pergunta alterada!");
    limparCampos();
    carregarPerguntas();
  };

  /**
   * Exclui uma pergunta após confirmação
   */
  const excluirPergunta = async (id) => {
    Alert.alert("Confirmação", "Deseja realmente excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await deletePergunta(id);
          // Se a pergunta em edição for a mesma que foi excluída → limpa o formulário
          if (editId === id) limparCampos();
          carregarPerguntas();
        },
      },
    ]);
  };

  /**
   * Renderiza cada item da lista de perguntas
   */
  const renderPergunta = ({ item }) => (
    <View style={styles.listItemRow}>
      {/* Ao clicar no item → carrega dados no formulário para edição */}
      <TouchableOpacity
        style={[styles.listItem, { flex: 1 }]}
        onPress={() => prepararAlterar(item)}
      >
        <Text style={styles.listText}>{item.texto}</Text>
      </TouchableOpacity>

      {/* Botão de exclusão */}
      <TouchableOpacity
        style={styles.buttonSmall}
        onPress={() => excluirPergunta(item.id)}
      >
        <Text style={styles.buttonTextSmall}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1e1e2e" }}>
      {/* Cabeçalho e formulário de inputs */}
      <View style={{ padding: 16 }}>
        <Text style={[styles.title, { fontSize: 28, marginBottom: 12 }]}>
          Perguntas de {tema.nome}
        </Text>

        {/* Enunciado */}
        <TextInput
          style={[styles.input, { color: "#fff" }]}
          placeholder="Enunciado"
          placeholderTextColor="#ccc"
          value={texto}
          onChangeText={setTexto}
        />

        {/* Alternativas 1 e 2 na mesma linha */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            style={[styles.input, { flex: 0.48, color: "#fff" }]}
            placeholder="Alternativa 1"
            placeholderTextColor="#ccc"
            value={alt1}
            onChangeText={setAlt1}
          />
          <TextInput
            style={[styles.input, { flex: 0.48, color: "#fff" }]}
            placeholder="Alternativa 2"
            placeholderTextColor="#ccc"
            value={alt2}
            onChangeText={setAlt2}
          />
        </View>

        {/* Alternativas 3 e 4 na mesma linha */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            style={[styles.input, { flex: 0.48, color: "#fff" }]}
            placeholder="Alternativa 3"
            placeholderTextColor="#ccc"
            value={alt3}
            onChangeText={setAlt3}
          />
          <TextInput
            style={[styles.input, { flex: 0.48, color: "#fff" }]}
            placeholder="Alternativa 4"
            placeholderTextColor="#ccc"
            value={alt4}
            onChangeText={setAlt4}
          />
        </View>

        {/* Seleção da resposta correta */}
        <Text style={[styles.label, { marginTop: 8 }]}>Informe a alternativa correta:</Text>
        <CustomSelect
          options={[
            { label: "Alternativa 1", value: 1 },
            { label: "Alternativa 2", value: 2 },
            { label: "Alternativa 3", value: 3 },
            { label: "Alternativa 4", value: 4 },
          ]}
          selected={correta}
          onSelect={setCorreta}
        />

        {/* Botões de ação */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.button} onPress={adicionarPergunta}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={alterarPergunta}>
            <Text style={styles.buttonText}>Alterar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#6c757d" }]}
            onPress={limparCampos}
          >
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de perguntas rolável */}
      <FlatList
        data={perguntas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPergunta}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />

      {/* Botão fixo para voltar à Home */}
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.buttonText}>Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
