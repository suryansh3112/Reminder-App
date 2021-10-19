import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getTime, getDay } from '../utils/utils';
import { MaterialIcons } from '@expo/vector-icons';

const color = {
  // background: '#FF4C29',
  // content: '#334756',
  background: '#fff',
  content: 'black',
};
export default function Card({ event, handlePress }) {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <View style={styles.icon}>
        <MaterialIcons name='event-available' size={30} color={color.content} />
      </View>
      <View style={styles.content}>
        <Text style={styles.cardText}>{event.eventName}</Text>
        <Text style={styles.cardText}>
          {getDay(event.dateTime)} - {getTime(event.dateTime)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#efefef',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: color.background,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  cardText: {
    color: color.content,
    fontSize: 15,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
});
