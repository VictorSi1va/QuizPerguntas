import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // 🔹 Container principal usado em várias telas
  // Define o fundo escuro, padding padrão e centraliza conteúdo.
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1e1e2e",
    justifyContent: "center",
  },

  // 🔹 Usado como contentContainerStyle em FlatLists/ScrollViews
  // Garante espaço extra no final para que nada fique colado no rodapé.
  scrollContainer: {
    paddingBottom: 20,
  },

  // 🔹 Títulos principais das telas
  // Usado em headers (Temas, Quiz, Resultado, Seleção de Tema).
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#ffcb05", // amarelo vibrante para dar destaque
    textShadowColor: "#000", // sombra para contraste no fundo escuro
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  // 🔹 Labels de inputs ou seções
  // Ex: "Novo Tema", "Número de perguntas".
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#f1f1f1",
  },

  // 🔹 Campos de entrada (TextInput)
  // Usados em formulários de adicionar/editar temas e quantidade de perguntas.
  input: {
    borderWidth: 2,
    borderColor: "#6c63ff", // roxo padrão da identidade visual
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    backgroundColor: "#2e2e3e", // fundo mais claro que o container
    fontSize: 16,
    color: "#fff",
  },

  // 🔹 Botões principais (grandes)
  // Usados em ações como "Adicionar Tema", "Jogar Novamente", "Voltar para Home".
  button: {
    backgroundColor: "#6c63ff", // roxo destaque
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 6,
    elevation: 5, // sombra no Android
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  // 🔹 Botões secundários (pequenos)
  // Usados em listas (editar/excluir tema ou pergunta).
  buttonSmall: {
    backgroundColor: "#ff4d6d", // vermelho padrão (excluir)
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
  },

  buttonTextSmall: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    textAlign: "center",
  },

  // 🔹 Layout com botões lado a lado
  // Ex: para "Cancelar" e "Salvar" em modais.
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },

  // 🔹 Item de lista genérico (temas ou perguntas)
  // Usado no FlatList em SelecionarTema e TemaScreen.
  listItem: {
    backgroundColor: "#2e2e3e",
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: "#6c63ff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
  },

  // Texto principal do item de lista (nome do tema, texto da pergunta)
  listText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },

  // Texto secundário dentro de itens (qtd de perguntas)
  subText: {
    fontSize: 14,
    color: "#ddd",
    marginTop: 6,
  },

  // 🔹 Linha de item com botões ao lado
  // Ex: tema + botões de editar/excluir.
  listItemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },

  // 🔹 Texto de pergunta no Quiz
  // Exibido acima das alternativas.
  question: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#ffcb05",
    textAlign: "center",
  },

  // 🔹 Botões de alternativas no Quiz
  // Cada alternativa é renderizada como botão em QuizScreen.
  optionButton: {
    backgroundColor: "#39394d",
    borderRadius: 12,
    padding: 14,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: "#6c63ff",
  },

  optionText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },

  // 🔹 Estilo usado para exibir pontuação final (ResultScreen)
  score: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#00ff99", // verde para indicar sucesso
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});
