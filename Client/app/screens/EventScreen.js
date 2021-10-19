import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import { StatusBar } from 'expo-status-bar';

export default function EventScreen(props) {
  const { navigation } = props;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(fetchEvents.data);
  }, []);

  const navigateToEventDetailScreen = (event) => {
    navigation.push('EventDetailsScreen', { eventDetails: event });
  };

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      <Text style={styles.header}>Welcome Suryansh </Text>
      {events?.length > 0 ? (
        <View>
          {events.map((event, idx) => {
            return (
              <Card
                key={`card-${idx}`}
                event={event}
                handlePress={() => navigateToEventDetailScreen(event)}
              />
            );
          })}
        </View>
      ) : (
        <Text style={styles.text}>You don't have any events scheduled!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6f6f6f',
  },
});

const fetchEvents = {
  data: [
    {
      _id: '6161c703e709f5b9316e06a2',
      eventName: 'MCC',
      description: 'HI there',
      link: 'https://meet.google.com/qbh-wewp-beb',
      dateTime: '2021-10-09T16:44:51.987Z',
      host: {
        _id: '61605b42ee30c1e7c85318a5',
        name: 'Suryansh Purohit',
        email: 'suryansh@gmail.com',
      },
      participants: [
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
      ],
      __v: 0,
    },
    {
      _id: '6161c71be709f5b9316e06aa',
      eventName: 'Fun Activity',
      description: 'This is fun',
      link: 'https://meet.google.com/qbh-wewp-beb',
      dateTime: '2021-10-15T16:45:15.104Z',
      host: {
        _id: '61605b42ee30c1e7c85318a5',
        name: 'Suryansh Purohit',
        email: 'suryansh@gmail.com',
      },
      participants: [
        {
          _id: '61605b43ee30c1e7c85318ad',
          name: 'Olivia Ashwoon',
          email: 'olivia@gmail.com',
        },
        {
          _id: '61605b43ee30c1e7c85318ad',
          name: 'Liam Ashwoon',
          email: 'liam@gmail.com',
        },
        {
          _id: '61605b43ee30c1e7c85318ad',
          name: 'Samuel Ashwoon',
          email: 'samuel@gmail.com',
        },
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
      ],
      __v: 0,
    },
  ],
};
