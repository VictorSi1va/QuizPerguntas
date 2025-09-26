import React from "react";
import { Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1e1e2e" }}>
      <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1, justifyContent: "center" }}>
        <Text style={styles.title}>Quiz Game</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Temas")}>
          <Text style={styles.buttonText}>Gerenciar Temas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SelecionarTema")}>
          <Text style={styles.buttonText}>Iniciar Quiz</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}