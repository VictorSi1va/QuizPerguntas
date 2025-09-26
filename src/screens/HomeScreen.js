import React from "react";
import { Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles";

/**
 * HomeScreen
 * 
 * Tela inicial do aplicativo "Quiz Game".
 * Aqui o usuário pode escolher entre:
 *   - Gerenciar Temas (criar, editar ou excluir temas e perguntas)
 *   - Iniciar o Quiz (selecionando um tema já existente)
 * 
 * Estrutura:
 *   - SafeAreaView: garante que o conteúdo respeite áreas seguras do dispositivo (notch, status bar)
 *   - ScrollView: permite rolagem e centraliza os elementos em telas pequenas
 *   - Título do app
 *   - Botões de navegação
 */
export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1e1e2e" }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          flexGrow: 1, // garante que o conteúdo ocupe a tela toda
          justifyContent: "center", // centraliza verticalmente
        }}
      >
        {/* Título principal */}
        <Text style={styles.title}>Quiz Game</Text>

        {/* Botão que leva à tela de gerenciamento de temas */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Temas")}
        >
          <Text style={styles.buttonText}>Gerenciar Temas</Text>
        </TouchableOpacity>

        {/* Botão que leva à tela de seleção de tema para iniciar o quiz */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SelecionarTema")}
        >
          <Text style={styles.buttonText}>Iniciar Quiz</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
