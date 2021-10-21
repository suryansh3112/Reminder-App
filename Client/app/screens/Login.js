import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { isComplete, localStorage } from '../utils/utils';
import Api from '../utils/api';
import UserContext from '../context/UserContext';

export default function Login(props) {
  const { setUserData } = useContext(UserContext);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async () => {
    if (isComplete(user)) {
      try {
        const loginRes = await Api.login(user);
        setUserData({
          token: loginRes?.data?.token,
          user: loginRes?.data?.user
        });
        localStorage.setItem('auth-token', loginRes.data.token);
      } catch (error) {
        alert(error?.response?.data?.message);
      }
    } else {
      alert('Please fill all the details');
    }
  };

  const handleClick = () => {
    props.navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reminder App</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setUser((prev) => {
            return { ...prev, email: text };
          });
        }}
        value={user.email}
        placeholder="Email"
      />

      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(pwd) =>
          setUser((prev) => {
            return { ...prev, password: pwd };
          })
        }
        value={user.password}
        placeholder="Password"
      />

      <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <Text>
        <Text style={styles.regPrefix}>Need an account? </Text>
        <Text style={styles.regText} onPress={handleClick}>
          Register
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '70%'
  },
  loginBtn: {
    backgroundColor: '#3770ff',
    padding: 10,
    borderRadius: 25,
    width: '70%',
    alignItems: 'center',
    marginBottom: 10
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  },
  regPrefix: {
    color: '#6f6f6f'
  },
  regText: {
    color: '#3770ff'
  }
});
