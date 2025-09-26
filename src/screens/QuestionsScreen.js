import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // SafeAreaView correto
import styles from "../styles";
import CustomSelect from "../components/CustomSelect";
import { fetchPerguntasByTema, insertPergunta, updatePergunta, deletePergunta } from "../db";

export default function QuestionsScreen({ route, navigation }) {
  const { tema } = route.params;
  const [perguntas, setPerguntas] = useState([]);
  const [texto, setTexto] = useState("");
  const [alt1, setAlt1] = useState("");
  const [alt2, setAlt2] = useState("");
  const [alt3, setAlt3] = useState("");
  const [alt4, setAlt4] = useState("");
  const [correta, setCorreta] = useState(1);
  const [editId, setEditId] = useState(null);

  const carregarPerguntas = async () => {
    setPerguntas(await fetchPerguntasByTema(tema.id));
  };

  useEffect(() => {
    carregarPerguntas();
  }, []);

  const limparCampos = () => {
    setTexto("");
    setAlt1("");
    setAlt2("");
    setAlt3("");
    setAlt4("");
    setCorreta(1);
    setEditId(null);
  };

  const adicionarPergunta = async () => {
    if (!texto.trim() || !alt1 || !alt2 || !alt3 || !alt4) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    if (perguntas.some((p) => p.texto.trim().toLowerCase() === texto.trim().toLowerCase())) {
      Alert.alert("Erro", "Já existe uma pergunta com esse enunciado!");
      return;
    }

    if (editId) {
      Alert.alert("Aviso", "Você selecionou uma pergunta para edição. Use Alterar.");
      return;
    }

    await insertPergunta({ texto, tema_id: tema.id, alt1, alt2, alt3, alt4, correta });
    Alert.alert("Sucesso", "Pergunta adicionada!");
    limparCampos();
    carregarPerguntas();
  };

  const prepararAlterar = (p) => {
    setTexto(p.texto);
    setAlt1(p.alt1);
    setAlt2(p.alt2);
    setAlt3(p.alt3);
    setAlt4(p.alt4);
    setCorreta(p.correta);
    setEditId(p.id);
  };

  const alterarPergunta = async () => {
    if (!editId) {
      Alert.alert("Erro", "Selecione uma pergunta para alterar.");
      return;
    }
    if (!texto.trim() || !alt1 || !alt2 || !alt3 || !alt4) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    if (perguntas.some((p) => p.id !== editId && p.texto.trim().toLowerCase() === texto.trim().toLowerCase())) {
      Alert.alert("Erro", "Já existe outra pergunta com esse enunciado!");
      return;
    }

    await updatePergunta({ id: editId, texto, tema_id: tema.id, alt1, alt2, alt3, alt4, correta });
    Alert.alert("Sucesso", "Pergunta alterada!");
    limparCampos();
    carregarPerguntas();
  };

  const excluirPergunta = async (id) => {
    Alert.alert("Confirmação", "Deseja realmente excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await deletePergunta(id);
          if (editId === id) limparCampos();
          carregarPerguntas();
        },
      },
    ]);
  };

  const renderPergunta = ({ item }) => (
    <View style={styles.listItemRow}>
      <TouchableOpacity
        style={[styles.listItem, { flex: 1 }]}
        onPress={() => prepararAlterar(item)}
      >
        <Text style={styles.listText}>{item.texto}</Text>
      </TouchableOpacity>
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
      {/* Área fixa de inputs */}
      <View style={{ padding: 16 }}>
        <Text style={[styles.title, { fontSize: 28, marginBottom: 12 }]}>
          Perguntas de {tema.nome}
        </Text>

        <TextInput
          style={[styles.input, { color: "#fff" }]}
          placeholder="Enunciado"
          placeholderTextColor="#ccc"
          value={texto}
          onChangeText={setTexto}
        />
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

      {/* FlatList rolando separadamente */}
      <FlatList
        data={perguntas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPergunta}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />

      {/* Botão fixo */}
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.buttonText}>Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
