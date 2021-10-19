import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Tag({ text, onClose }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity style={styles.btn} onPress={onClose}>
        <Text style={styles.btnText}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#efefef',
    marginHorizontal: 5,
  },
  text: {
    fontSize: 13,
    color: '#6f6f6f',
    marginRight: 3,
  },
  btnText: {
    fontSize: 13,
    color: '#6f6f6f',
  },
});
