import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

const CustomAlert = ({ visible, message, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: '#7440AE', padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, color:"#CBAFF8" }}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={{ marginTop: 20, backgroundColor: '#CBAFF8', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
