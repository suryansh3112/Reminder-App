import React, { useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserContext from '../context/UserContext';
import { localStorage } from '../utils/utils';

export default function Logout() {
  const { setUserData } = useContext(UserContext);

  useEffect(() => {
    setUserData({
      token: undefined,
      user: undefined
    });
    localStorage.setItem('auth-token', '');
  }, []);
  return <View></View>;
}

const styles = StyleSheet.create({});
