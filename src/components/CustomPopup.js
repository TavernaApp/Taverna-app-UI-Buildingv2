import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../css/styles';

const Popup = ({ visible, onClose, onConfirm, message }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.popupContainer}>
        <View style={styles.popup}>
          <Text style={styles.popupText}>{message}</Text>
          <View style={styles.popupbuttonContainer}>
            <TouchableOpacity onPress={onConfirm} style={[styles.popupButton, { marginRight: 10 }]}>
              <Text style={styles.popupButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.popupButton}>
              <Text style={styles.popupButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
