import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { isComplete } from '../utils/utils';

export default function Register(props) {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = () => {
    if (isComplete(user)) {
      console.log(user);
    } else {
      console.log('Incomplete');
    }
  };

  const handleClick = () => {
    props.navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reminder App</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setUser((prev) => {
            return { ...prev, firstName: text };
          });
        }}
        value={user.firstName}
        placeholder='First Name'
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setUser((prev) => {
            return { ...prev, lastName: text };
          });
        }}
        value={user.lastName}
        placeholder='Last Name'
      />
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
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(pwd) =>
          setUser((prev) => {
            return { ...prev, confirmPassword: pwd };
          })
        }
        value={user.confirmPassword}
        placeholder='Confirm Password'
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>
      <Text>
        <Text style={styles.logPrefix}>Already have an account? Log in </Text>
        <Text style={styles.logText} onPress={handleClick}>
          Here
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
  button: {
    backgroundColor: '#F0A500',
    padding: 10,
    borderRadius: 25,
    width: '70%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  logPrefix: {
    color: '#6f6f6f',
  },
  logText: {
    color: '#3770ff',
  },
});
