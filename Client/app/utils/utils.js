import AsyncStorage from '@react-native-async-storage/async-storage';

export const isComplete = (user) => {
  for (let [key, value] of Object.entries(user)) {
    if (!value) return false;
  }
  return true;
};

export const getDay = (date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleString().substring(0, 10);
};

export const getTime = (date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, '0');
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

export const localStorage = {
  getItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (e) {
      // error reading value
    }
  },
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  },
};
