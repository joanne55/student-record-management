import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';


const LoginScreen = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

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

        login(role, userId, token);

        setSuccess('Login successful! Redirecting...');
        setError('');

        // Redirect dynamically based on user role
        navigate(`/${role}Home`);
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
      <form onSubmit={handleLogin} style={styles.form}>
        <div>
          <TextInput
            style={styles.input}
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <TextInput
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            secureTextEntry={true}
          />
        </div>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </form>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {success && <Text style={{ color: 'green' }}>{success}</Text>}
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
  form: {
    width: '100%',
    marginBottom: 20,
  }
});

export default LoginScreen;

