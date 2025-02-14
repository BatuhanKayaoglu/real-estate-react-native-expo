import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const SortingModal = ({
  isVisible,
  onClose,
  options,
  selectedOption,
  onSelect,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Sırala</Text>
        {options.map((option) => (
          <View key={option.sorted} style={styles.radioContainer}>
            <BouncyCheckbox
              isChecked={selectedOption === option.sorted}
              fillColor="#1688c9"
              unfillColor="#FFFFFF"
              text={option.label}
              textStyle={styles.checkboxText}
              iconStyle={{ borderColor: "#4CAF50" }}
              onPress={() => onSelect(option.sorted)}
            />
          </View>
        ))}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Vazgeç</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  radioContainer: {
    marginVertical: 5,
    width: "100%",
  },
  checkboxText: {
    fontSize: 16,
    textDecorationLine: "none",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#1688c9",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SortingModal;