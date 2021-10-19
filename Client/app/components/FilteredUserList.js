import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FilteredUserList({ filteredUsers, handleOnPress }) {
  return (
    <View style={styles.container}>
      {filteredUsers.map((user, idx) => {
        return (
          <TouchableOpacity
            style={styles.listItem}
            key={`filterUser-${idx}`}
            onPress={() => handleOnPress(user)}
          >
            <View>
              <Ionicons
                style={styles.icon}
                name='person-circle'
                size={30}
                color='#484848'
              />
            </View>
            <View>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbfbfb',
    paddingHorizontal: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#efefef',
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
});
