import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import InvitePeople from '../components/InvitePeople';
import DateTime from '../components/DateTime';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export default function AddEventScreen() {
  const ICON_SIZE = 26;
  const [users, setUsers] = useState([]);

  const [focusedState, setFocusedState] = useState('');

  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    description: '',
    link: '',
    participants: [],
    dateTime: new Date(),
  });

  useEffect(() => {
    setUsers(fetchData.data);
  }, []);

  const handleSubmit = () => {
    const currentDate = new Date();
    if (
      !eventDetails.eventName ||
      !eventDetails.link ||
      eventDetails.participants.length === 0
    ) {
      alert('Please fill all the details');
    } else if (eventDetails.dateTime < currentDate) {
      alert('Please select a future date.');
    } else {
      const participantIds = eventDetails.participants.map((p) => p._id);
      const body = { ...eventDetails, participants: participantIds };
      console.log(body);
    }
  };

  const handleFocus = (name) => {
    setFocusedState(name);
  };

  const handleChange = (text, name) => {
    setEventDetails((prev) => {
      return { ...prev, [name]: text };
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Add Event</Text>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.flexRow}>
          <MaterialIcons
            style={styles.icon}
            name='event'
            size={ICON_SIZE}
            color='black'
          />
          <TextInput
            style={[
              styles.input,
              focusedState === 'eventName' && styles.activeInput,
            ]}
            onChangeText={(text) => handleChange(text, 'eventName')}
            value={eventDetails.eventName}
            placeholder='Add Title'
            onFocus={() => handleFocus('eventName')}
            onBlur={() => handleFocus('')}
          />
        </View>
        <DateTime
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
        />
        <InvitePeople
          users={users}
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
        />

        {/* LINK */}
        <View style={styles.flexRow}>
          <AntDesign
            style={styles.icon}
            name='link'
            size={ICON_SIZE}
            color='black'
          />
          <TextInput
            style={[styles.link, focusedState === 'link' && styles.activeInput]}
            onChangeText={(text) => handleChange(text, 'link')}
            value={eventDetails.link}
            placeholder='Add Link'
            onFocus={() => handleFocus('link')}
            onBlur={() => handleFocus('')}
          />
        </View>

        <View style={styles.flexRow}>
          <MaterialIcons
            style={styles.icon}
            name='description'
            size={ICON_SIZE}
            color='black'
          />
          <TextInput
            style={[
              styles.input,
              focusedState === 'description' && styles.activeInput,
            ]}
            onChangeText={(text) => handleChange(text, 'description')}
            value={eventDetails.description}
            placeholder='Add Title'
            onFocus={() => handleFocus('description')}
            onBlur={() => handleFocus('')}
          />
        </View>

        <View style={styles.btn}>
          <Button onPress={handleSubmit} title='Submit' />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  btn: {
    marginHorizontal: 10,
  },
  scrollView: {
    paddingVertical: 20,
  },
  icon: {
    marginRight: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  flexRow: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#efefef',
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
  link: {
    fontWeight: 'bold',
    fontSize: 15,
    width: '80%',
    color: '#0645AD',
  },
});

const fetchData = {
  data: [
    {
      _id: '61605b42ee30c1e7c85318a7',
      name: 'Rahul Shinde',
      email: 'rahul@gmail.com',
    },
    {
      _id: '61605b43ee30c1e7c85318a9',
      name: 'Sahil Jain',
      email: 'sahil@gmail.com',
    },
    {
      _id: '61605b43ee30c1e7c85318ab',
      name: 'Liam Anderson',
      email: 'liam@gmail.com',
    },
    {
      _id: '61605b43ee30c1e7c85318ad',
      name: 'Olivia Ashwoon',
      email: 'olivia@gmail.com',
    },
    {
      _id: '61605b43ee30c1e7c85318af',
      name: 'Noah Aikin',
      email: 'noah@gmail.com',
    },
    {
      _id: '61605b43ee30c1e7c85318b1',
      name: 'Emma Bateman',
      email: 'emma@gmail.com',
    },
    {
      _id: '61605b43ee30c1e7c85318b3',
      name: 'Oliver Bongard',
      email: 'oliver@gmail.com',
    },
    {
      _id: '61605b43ee30c1e7c85318b5',
      name: 'Ava Bowers',
      email: 'ava@gmail.com',
    },
    {
      _id: '61605b43ee30c1e7c85318b7',
      name: 'William Boyd',
      email: 'william@gmail.com',
    },
    {
      _id: '61605b43ee30c1e7c85318b9',
      name: 'Sophia Cannon',
      email: 'sophia@gmail.com',
    },
    {
      _id: '61605b43ee30c1e7c85318bb',
      name: 'Elijah Cast',
      email: 'elijah@gmail.com',
    },
    {
      _id: '61605b43ee30c1e7c85318bd',
      name: 'Isabella Deitz',
      email: 'isabella@gmail.com',
    },
    {
      _id: '61605b43ee30c1e7c85318bf',
      name: 'James Dewalt',
      email: 'james@gmail.com',
    },
    {
      _id: '61605b43ee30c1e7c85318c1',
      name: 'Charlotte Ebner',
      email: 'charlotte@gmail.com',
    },
  ],
};
