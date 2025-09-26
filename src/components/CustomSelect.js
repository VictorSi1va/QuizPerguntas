import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

export default function CustomSelect({ options, selected, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      {/* Botão que abre o menu */}
      <TouchableOpacity
        style={{
          backgroundColor: "#6a5acd",
          padding: 12,
          borderRadius: 12,
          marginVertical: 8,
        }}
        onPress={() => setOpen(true)}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>
          {options.find((o) => o.value === selected)?.label || "Selecionar"}
        </Text>
      </TouchableOpacity>

      {/* Modal com as opções */}
      <Modal visible={open} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.7)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#2e2e4f",
              borderRadius: 15,
              padding: 20,
              width: "80%",
            }}
          >
            {options.map((o) => (
              <TouchableOpacity
                key={o.value}
                style={{
                  padding: 12,
                  backgroundColor: "#6a5acd",
                  marginVertical: 5,
                  borderRadius: 10,
                }}
                onPress={() => {
                  onSelect(o.value);
                  setOpen(false);
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>{o.label}</Text>
              </TouchableOpacity>
            ))}

            {/* Botão de fechar */}
            <TouchableOpacity
              onPress={() => setOpen(false)}
              style={{ marginTop: 10, alignSelf: "center" }}
            >
              <Text style={{ color: "#ff5555", fontSize: 16 }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}