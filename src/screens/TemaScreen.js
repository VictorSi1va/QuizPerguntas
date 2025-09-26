import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles";
import { fetchTemas, insertTema, deleteTema } from "../db";

export default function TemaScreen({ navigation }) {
  const [temas, setTemas] = useState([]);
  const [novoTema, setNovoTema] = useState("");

  const carregarTemas = async () => {
    const t = await fetchTemas();
    setTemas(t);
  };

  useEffect(() => {
    carregarTemas();
  }, []);

  const adicionarTema = async () => {
    if (!novoTema.trim()) { 
      Alert.alert("Erro", "Digite um nome para o tema"); 
      return; 
    }
    await insertTema(novoTema.trim());
    setNovoTema("");
    carregarTemas();
  };

  const removerTema = async (id) => {
    Alert.alert("Confirmação", "Deseja excluir?", [
      { text: "Cancelar", style: "cancel" },
      { 
        text: "Excluir", 
        style: "destructive", 
        onPress: async () => { 
          await deleteTema(id); 
          carregarTemas(); 
        } 
      }
    ]);
  };

  const footer = () => (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
      <Text style={styles.buttonText}>Voltar para Home</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1e1e2e", padding: 16 }}>
      
      {/* Header fora do FlatList */}
      <Text style={[styles.title, { fontSize: 28 }]}>Temas</Text>

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
            <TouchableOpacity 
              style={[styles.listItem, { flex: 1 }]} 
              onPress={() => navigation.navigate("QuestionsScreen", { tema: item })}
            >
              <Text style={[styles.listText, { color: "#fff" }]}>{item.nome}</Text>
              <Text style={[styles.subText, { color: "#ddd" }]}>
                {item.qtd} pergunta{item.qtd !== 1 ? "s" : ""}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSmall} onPress={() => removerTema(item.id)}>
              <Text style={styles.buttonTextSmall}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={footer}
      />
    </SafeAreaView>
  );
}
