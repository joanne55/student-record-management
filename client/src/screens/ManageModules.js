import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const ManageModules = () => {
  const [Modules, setModules] = useState([]);
  const [formData, setFormData] = useState({
    moduleID: '',
    name: '',
    description: '',
    credits: '',
  });

  // Handle input changes to update form data
  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // Fetch all Modules from the backend
  const fetchModules = async () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3001/api/module', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setModules(response.data.data || []); // Set the Modules list from the API response
    } catch (error) {
      console.error('Error fetching Modules:', error);
      if (error.response) {
        // Request made and server responded with a status code outside the range 2xx
        Alert.alert('Error', `Failed to load Modules. Status code: ${error.response.status}`);
      } else if (error.request) {
        // Request made but no response was received
        Alert.alert('Error', 'No response from server');
      } else {
        // Something else went wrong
        Alert.alert('Error', `Error: ${error.message}`);
      }
    }
  };

  // Fetch Modules when the component mounts
  useEffect(() => {
    fetchModules();
  }, []);

  // Handle form submission for adding or updating a module
  const handleSubmit = async () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Error', 'Session expired. Please log in again.');
      return;
    }

    // Validation to ensure all fields are filled
    if (!formData.moduleID || !formData.name || !formData.description || !formData.credits) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    try {
      console.log('Sending data to backend:', formData); // Log the form data

      const postData = {
        moduleId: formData.moduleID,
        name: formData.name,
        description: formData.description,
        credit: formData.credits,
      };
      const response = await axios.post('http://localhost:3001/api/module', postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Response from backend:', response);

      if (response.status === 201) {
        Alert.alert('Success', 'module added successfully!');
        setFormData({
          moduleID: '',
          name: '',
          description: '',
          credits: '',
        });
        fetchModules();
      } else {
        Alert.alert('Error', 'Failed to add/update module.');
      }
    } catch (error) {
      console.error('Detailed Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to add/update module. Check logs for details.');
    }
  };

  // Handle module deletion
  const handleDelete = async (moduleID) => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Error', 'Session expired. Please log in again.');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3001/api/module/${moduleID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'module deleted successfully!');
        fetchModules();
      } else {
        Alert.alert('Error', 'Failed to delete module.');
      }
    } catch (error) {
      console.error('Error deleting module:', error);
      Alert.alert('Error', 'Failed to delete module. Check logs for details.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Modules</Text>
      <View style={styles.editTable}>
        <TextInput
          style={styles.input}
          placeholder="module ID"
          value={formData.moduleID}
          onChangeText={(value) => handleInputChange('moduleID', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="module Name"
          value={formData.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={formData.description}
          onChangeText={(value) => handleInputChange('description', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Credits"
          value={formData.credits}
          onChangeText={(value) => handleInputChange('credits', value)}
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          <Button title="Add/Update module" onPress={handleSubmit} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Delete module" onPress={() => handleDelete(formData.moduleID)} color="red" />
        </View>
      </View>

      <Text style={styles.title}>Modules List</Text>
      <View style={styles.listTable}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell]}>module ID</Text>
          <Text style={[styles.cell, styles.headerCell]}>module Name</Text>
          <Text style={[styles.cell, styles.headerCell]}>Description</Text>
          <Text style={[styles.cell, styles.headerCell]}>Credits</Text>
        </View>

        {Modules.map((module, index) => (
          <View
            key={module.id}
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
          >
            <Text style={[styles.cell]}>{module.moduleId}</Text>
            <Text style={[styles.cell]}>{module.moduleName}</Text>
            <Text style={[styles.cell]}>{module.description}</Text>
            <Text style={[styles.cell]}>{module.credit}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  editTable: {
    marginBottom: 20,
  },
  listTable: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerRow: {
    backgroundColor: '#333',
    flexDirection: 'row',
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
  cell: {
    flex: 1,
    paddingVertical: 15,
    paddingLeft: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  headerCell: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default ManageModules;
