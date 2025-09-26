import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importa inicialização do banco de dados
import { initDB } from "./src/db";

// Importa as telas do app
import HomeScreen from "./src/screens/HomeScreen";
import TemaScreen from "./src/screens/TemaScreen";
import QuestionsScreen from "./src/screens/QuestionsScreen";
import SelecionarTemaScreen from "./src/screens/SelecionarTemaScreen";
import QuizScreen from "./src/screens/QuizScreen";
import ResultScreen from "./src/screens/ResultScreen";

// Cria o stack de navegação
const Stack = createNativeStackNavigator();

/**
 * App
 * 
 * Este é o componente raiz do aplicativo "Quiz Game".
 * Suas responsabilidades principais são:
 *   1. Inicializar o banco de dados SQLite (função initDB).
 *   2. Configurar a navegação entre telas usando React Navigation (Stack Navigator).
 *   3. Garantir o uso do SafeAreaProvider para respeitar áreas seguras (notch, status bar).
 * 
 * Telas disponíveis no Stack Navigator:
 *   - Home: Tela inicial (menu principal).
 *   - Temas: Gerenciamento de temas (criar/editar/excluir).
 *   - QuestionsScreen: CRUD de perguntas dentro de um tema.
 *   - SelecionarTema: Seleção de tema para iniciar o quiz.
 *   - Quiz: Execução do jogo (perguntas e respostas).
 *   - ResultScreen: Exibe o resultado final após o quiz.
 */
export default function App() {
  // Executa uma vez na montagem do app para inicializar o banco de dados
  useEffect(() => {
    initDB();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* Stack Navigator controla a navegação entre telas */}
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Temas" component={TemaScreen} />
          <Stack.Screen name="QuestionsScreen" component={QuestionsScreen} />
          <Stack.Screen name="SelecionarTema" component={SelecionarTemaScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="ResultScreen" component={ResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
