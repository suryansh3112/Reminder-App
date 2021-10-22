import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Button } from 'react-native';
import { AntDesign, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import InvitePeople from '../components/InvitePeople';
import DateTime from '../components/DateTime';
import GuestBlock from '../components/GuestBlock';
import Header from '../components/Header';
import Api from '../utils/api';
import UserContext from '../context/UserContext';

export default function EventDetailsScreen(props) {
  const ICON_SIZE = 26;
  const { currentEventDetails } = props.route.params || {};
  const { navigation } = props;
  const { userData } = useContext(UserContext);

  const [eventDetails, setEventDetails] = useState({
    ...currentEventDetails,
    dateTime: new Date(currentEventDetails.dateTime)
  });
  const [focusedState, setFocusedState] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const res = await Api.getAllUsers(userData.token);
        setUsers(res?.data?.data || []);
      } catch (error) {
        alert(error?.response?.data?.message);
      }
    };
    fetchUsersData();
  }, []);

  const handleChange = (text, name) => {
    setEventDetails((prev) => {
      return { ...prev, [name]: text };
    });
  };

  const handleFocus = (name) => {
    setFocusedState(name);
  };

  const handleSubmit = async () => {
    const currentDate = new Date();
    if (
      !eventDetails.eventName ||
      !eventDetails.link ||
      eventDetails.participants.length === 0
    ) {
      alert('Please fill all the details');
    }
    // else if (eventDetails.dateTime < currentDate) {
    //   alert('Please select a future date.');
    // }
    else {
      const participantIds = eventDetails.participants.map((p) => p._id);
      const body = { ...eventDetails, participants: participantIds };
      try {
        const res = await Api.editEvent(
          body,
          eventDetails?._id,
          userData.token
        );
        alert(res.data.message);
        props.navigation.navigate('EventScreen');
      } catch (error) {
        alert(error.response.data.message);
        // alert(error.message);
      }
    }
  };

  const handleClose = () => {
    navigation.pop();
  };

  if (!eventDetails) return null;
  return (
    <View style={styles.container}>
      <Header title={'Edit Event'} handleClose={handleClose} />

      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.flexRow}>
          <MaterialIcons
            style={styles.icon}
            name="event"
            size={ICON_SIZE}
            color="black"
          />
          <TextInput
            style={[
              styles.input,
              focusedState === 'eventName' && styles.activeInput
            ]}
            onChangeText={(text) => handleChange(text, 'eventName')}
            value={eventDetails.eventName}
            placeholder="Add Title"
            onFocus={() => handleFocus('eventName')}
            onBlur={() => handleFocus('')}
          />
        </View>

        <DateTime
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
        />
        {/* Organiser */}
        <GuestBlock participants={[eventDetails.host]} host />

        <InvitePeople
          users={users}
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
        />
        {/* LINK */}
        <View style={styles.flexRow}>
          <AntDesign
            style={styles.icon}
            name="link"
            size={ICON_SIZE}
            color="black"
          />
          <TextInput
            style={[styles.link, focusedState === 'link' && styles.activeInput]}
            onChangeText={(text) => handleChange(text, 'link')}
            value={eventDetails.link}
            placeholder="Add Title"
            onFocus={() => handleFocus('link')}
            onBlur={() => handleFocus('')}
          />
        </View>
        <View style={styles.flexRow}>
          <MaterialIcons
            style={styles.icon}
            name="description"
            size={ICON_SIZE}
            color="black"
          />
          <TextInput
            style={[
              styles.input,
              focusedState === 'description' && styles.activeInput
            ]}
            onChangeText={(text) => handleChange(text, 'description')}
            value={eventDetails.description}
            placeholder="Add Title"
            onFocus={() => handleFocus('description')}
            onBlur={() => handleFocus('')}
          />
        </View>
        <View style={styles.btn}>
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  icon: {
    marginRight: 10
  },
  input: {
    fontWeight: 'bold',
    fontSize: 15,
    width: '80%'
  },
  activeInput: {
    borderBottomWidth: 2,
    borderColor: 'blue'
  },
  link: {
    fontWeight: 'bold',
    fontSize: 15,
    width: '80%',
    color: '#0645AD'
  },
  flexRow: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#efefef'
  },
  flexLine: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center'
  },
  btn: {
    marginHorizontal: 10
  }
});
