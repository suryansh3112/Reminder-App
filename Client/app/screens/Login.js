import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { isComplete } from '../utils/utils';

export default function Login(props) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = () => {
    if (isComplete(user)) {
      console.log(user);
    } else {
      console.log('Incomplete');
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
        placeholder='Email'
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
        placeholder='Password'
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
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '70%',
  },
  loginBtn: {
    backgroundColor: '#3770ff',
    padding: 10,
    borderRadius: 25,
    width: '70%',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  regPrefix: {
    color: '#6f6f6f',
  },
  regText: {
    color: '#3770ff',
  },
});
