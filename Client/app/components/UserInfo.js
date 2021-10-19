import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default function UserInfo({ user, removeGuest }) {
  return (
    <View style={styles.listItem}>
      <View>
        <Ionicons
          style={styles.icon}
          name='person-circle'
          size={32}
          color='#484848'
        />
      </View>
      <View style={styles.flexOne}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      {removeGuest && (
        <View>
          <AntDesign
            name='minuscircle'
            size={20}
            color='#E02401'
            onPress={() => removeGuest(user)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: '#efefef',
    marginHorizontal: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
  name: {
    color: '#484848',
    fontSize: 15,
  },
  email: {
    color: '#6f6f6f',

    fontSize: 13,
  },
  flexOne: {
    flex: 1,
  },
});
