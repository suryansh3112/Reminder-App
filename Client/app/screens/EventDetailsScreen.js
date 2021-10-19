import React from 'react';
import { StyleSheet, Text, View, Linking, ScrollView } from 'react-native';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import { getTime, getDay } from '../utils/utils';
import GuestBlock from '../components/GuestBlock';
import Header from '../components/Header';

export default function EventDetailsScreen(props) {
  const ICON_SIZE = 26;
  const { navigation } = props;
  const { eventDetails } = props.route.params || {};

  const handleLinkPress = (link) => {
    Linking.openURL(link).catch((err) => {
      /**TODO: Add error handling */
    });
  };

  const handleDelete = () => {};

  const handleEdit = () => {
    navigation.push('EditEventScreen', { currentEventDetails: eventDetails });
  };

  const handleClose = () => {
    navigation.pop();
  };

  if (!eventDetails) return null;
  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Event Details</Text> */}
      <Header title={'Event Details'} handleClose={handleClose} />
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
          <Text style={[styles.text, { flex: 1 }]}>
            {eventDetails.eventName}
          </Text>

          <Feather
            style={[styles.icon]}
            name='edit'
            size={ICON_SIZE}
            color='#35beff'
            onPress={handleEdit}
          />
          <MaterialIcons
            style={styles.icon}
            name='delete'
            size={ICON_SIZE}
            color='#E02401'
            onPress={handleDelete}
          />
        </View>
        <View style={styles.flexRow}>
          <MaterialIcons
            style={styles.icon}
            name='access-time'
            size={ICON_SIZE}
            color='black'
          />
          <View>
            <Text style={styles.dateText}>{getDay(eventDetails.dateTime)}</Text>
            <Text style={styles.dateText}>
              {getTime(eventDetails.dateTime)}
            </Text>
          </View>
        </View>

        {/* LINK */}
        <View style={styles.flexRow}>
          <AntDesign
            style={styles.icon}
            name='link'
            size={ICON_SIZE}
            color='black'
          />
          <Text
            numberOfLines={1}
            onPress={() => handleLinkPress(eventDetails.link)}
            style={[styles.text, styles.link]}
          >
            {eventDetails.link}
          </Text>
        </View>

        {/* Organiser */}
        <GuestBlock participants={[eventDetails.host]} host />

        {/* GUESTS */}
        <GuestBlock participants={eventDetails.participants} />

        {eventDetails.description ? (
          <View style={styles.flexRow}>
            <MaterialIcons
              style={styles.icon}
              name='description'
              size={ICON_SIZE}
              color='black'
            />
            <Text style={styles.text}>{eventDetails.description}</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  scrollView: {
    paddingVertical: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  link: {
    color: '#0645AD',
  },
  flexRow: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#efefef',
  },
});
