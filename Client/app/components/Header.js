import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function Header({ title, handleClose }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Entypo
        onPress={handleClose}
        name='circle-with-cross'
        size={24}
        color='black'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
