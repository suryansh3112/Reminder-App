import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import GuestBlock from './GuestBlock';
import FilteredUserList from '../components/FilteredUserList';
import { Ionicons } from '@expo/vector-icons';

export default function InvitePeople(props) {
  const ICON_SIZE = 26;
  const { eventDetails, setEventDetails, users } = props;
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');

  const handleSearch = (searchText) => {
    setSearch(searchText);
    if (searchText.length > 0) {
      const filtered = users.filter((u) =>
        u.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  };

  const handleSearchPress = (user) => {
    const alreadyAdded = eventDetails.participants.some(
      (participant) => participant?._id === user?._id
    );
    if (alreadyAdded) {
      alert(`${user.name} is already added.`);
    } else {
      setEventDetails((prev) => {
        prev.participants.push(user);
        return prev;
      });
    }
    setSearch('');
    setFilteredUsers([]);
  };

  const handleRemove = (removedParticipant) => {
    const filter = eventDetails.participants.filter(
      (participant) => participant !== removedParticipant
    );
    setEventDetails((prev) => {
      return {
        ...prev,
        participants: filter,
      };
    });
  };

  return (
    <View
      style={eventDetails.participants?.length > 0 && styles.inviteContainer}
    >
      <View style={styles.flexRow}>
        <Ionicons
          style={styles.icon}
          name='person-add-sharp'
          size={ICON_SIZE}
          color='black'
        />
        <TextInput
          style={styles.input}
          placeholder='Invite People'
          onChangeText={handleSearch}
          value={search}
        />
      </View>
      {filteredUsers?.length > 0 && (
        <FilteredUserList
          filteredUsers={filteredUsers}
          handleOnPress={handleSearchPress}
        />
      )}
      {eventDetails.participants?.length > 0 && (
        <GuestBlock
          participants={eventDetails.participants}
          removeGuest={handleRemove}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#efefef',
  },
  inviteContainer: {
    backgroundColor: '#fbfbfb',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    fontWeight: 'bold',
    fontSize: 15,
    width: '80%',
  },
  activeInput: {
    borderColor: 'blue',
    borderBottomWidth: 2,
  },
});
