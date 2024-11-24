import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';

const LoginScreen = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token.token;
        const role = data.token.role;

        sessionStorage.setItem('authToken', token);
        console.log('role:', role);

        onLogin(role, userId);

        setSuccess('Login successful! Redirecting...');
        setError('');

        // Redirect dynamically based on user role
        setTimeout(() => {
          if (role === 'admin') {
            navigate('/AdminHome');
          } else if (role === 'student') {
            navigate('/StudentHome');
          } else {
            setError('Invalid user role');
          }
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed.');
        setSuccess('');
      }
    } catch (err) {
      setError('An error occurred while logging in.');
      setSuccess('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        {/* User ID Input */}
        <TextInput
          style={styles.input}
          placeholder="User ID"
          value={userId}
          onChangeText={(text) => setUserId(text)}
          required
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          required
        />

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Display error or success messages */}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {success && <Text style={styles.successText}>{success}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
  successText: {
    color: 'green',
    marginTop: 20,
  },
});

export default LoginScreen;
