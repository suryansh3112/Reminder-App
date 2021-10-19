import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserInfo from './UserInfo';

export default function GuestList({ guests, removeGuest }) {
  return (
    <View style={styles.container}>
      {guests.map((user, idx) => {
        if (!user) {
          return null;
        }
        return (
          <UserInfo
            key={`filterUser-${idx}`}
            user={user}
            removeGuest={removeGuest}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
  },
});
