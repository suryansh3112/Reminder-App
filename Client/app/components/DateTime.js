import React, { useState } from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getTime, getDay } from '../utils/utils';
import { MaterialIcons } from '@expo/vector-icons';

export default function DateTime(props) {
  const ICON_SIZE = 26;

  const { eventDetails, setEventDetails } = props;
  if (!eventDetails || !setEventDetails) {
    return null;
  }

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDetails.dateTime;
    setShow(Platform.OS === 'ios');
    setEventDetails((prev) => {
      return {
        ...prev,
        dateTime: currentDate,
      };
    });
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View style={styles.flexRow}>
        <MaterialIcons
          style={styles.icon}
          name='access-time'
          size={ICON_SIZE}
          color='black'
        />
        <View>
          <Text onPress={showDatepicker} style={styles.text}>
            {getDay(eventDetails.dateTime)}
          </Text>
          <Text onPress={showTimepicker} style={styles.text}>
            {getTime(eventDetails.dateTime)}
          </Text>
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={eventDetails.dateTime}
          mode={mode}
          is24Hour={false}
          display='default'
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 20,
  },
  flexRow: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#efefef',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 2,
  },
});
