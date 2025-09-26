import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Container principal das telas
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1e1e2e", // fundo escuro
    justifyContent: "center",
  },

  // Scroll interno para FlatLists
  scrollContainer: {
    paddingBottom: 20,
  },

  // Títulos das telas
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#ffcb05", // amarelo vibrante
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  // Label de campos
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#f1f1f1", // branco
  },

  // Inputs
  input: {
    borderWidth: 2,
    borderColor: "#6c63ff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    backgroundColor: "#2e2e3e",
    fontSize: 16,
    color: "#fff", // texto claro
  },

  // Botões grandes
  button: {
    backgroundColor: "#6c63ff",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  // Botões pequenos
  buttonSmall: {
    backgroundColor: "#ff4d6d",
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

  // Linha de botões lado a lado
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },

  // Item de lista de temas ou perguntas
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

  listText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff", // texto branco para melhor contraste
  },

  subText: {
    fontSize: 14,
    color: "#ddd", // texto secundário cinza claro
    marginTop: 6,
  },

  // Linha com botão e item
  listItemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },

  // Pergunta do quiz
  question: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#ffcb05",
    textAlign: "center",
  },

  // Alternativas (como botões/cartões)
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

  // Score/resultado final
  score: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#00ff99",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});
