import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import GuestList from './GuestList';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

export default function GuestBlock(props) {
  const ICON_SIZE = 26;
  const { participants, removeGuest, host } = props;
  const [isExpanded, setIsExpanded] = useState(true);

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const getHeading = () => {
    if (host) {
      return `Organiser - ${participants[0].name}`;
    }
    return `${participants?.length} Guests`;
  };

  const getIcon = () => {
    if (host) {
      return (
        <MaterialIcons
          style={styles.icon}
          name='person'
          size={ICON_SIZE}
          color='black'
        />
      );
    }
    return (
      <MaterialIcons
        style={styles.icon}
        name='people'
        size={ICON_SIZE}
        color='black'
      />
    );
  };

  return (
    <TouchableHighlight
      onPress={handleExpand}
      underlayColor='white'
      style={styles.guestBlock}
    >
      <>
        <View style={styles.flexLine}>
          {getIcon()}
          <Text style={styles.text}>{getHeading()}</Text>
          {isExpanded ? (
            <Entypo
              name='chevron-small-up'
              size={24}
              color='black'
              style={styles.ml20}
            />
          ) : (
            <Entypo
              name='chevron-small-down'
              size={24}
              color='black'
              style={styles.ml20}
            />
          )}
        </View>
        {isExpanded && (
          <View>
            <GuestList guests={participants} removeGuest={removeGuest} />
          </View>
        )}
      </>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  flexLine: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  guestBlock: {
    borderBottomWidth: 1,
    borderColor: '#efefef',
  },
  ml20: {
    marginLeft: 20,
  },
});
