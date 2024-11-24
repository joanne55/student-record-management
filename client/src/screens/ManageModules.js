import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ManageModules = () => {
  const [modules, setModules] = useState([]);
  const [formData, setFormData] = useState({
    moduleId: '',
    moduleName: '',
    description: '',
    credit: '',
  });

  // Handle input changes to update form data
  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // Fetch all modules from the backend
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
      setModules(response.data.data || []); // Set the modules list from the API response
    } catch (error) {
      console.error('Error fetching modules:', error);
      Alert.alert('Error', 'Failed to load modules');
    }
  };

  // Fetch modules when the component mounts
  useEffect(() => {
    fetchModules();
  }, []);

  // Handle form submission for adding or updating a module
  const handleSubmit = async () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    try {
      // Prepare the data in the format expected by the backend
      const postData = {
        moduleId: formData.moduleId,
        moduleName: formData.moduleName,
        description: formData.description,
        credit: formData.credit,
      };

      const response = await axios.post('http://localhost:3001/api/module', postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Module added/updated successfully!');
        // Reset form data
        setFormData({
          moduleId: '',
          moduleName: '',
          description: '',
          credit: '',
        });
        // Re-fetch modules
        fetchModules();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add/update module');
    }
  };

  // Handle module deletion
  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this module?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:3001/api/module/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setModules((prevModules) => prevModules.filter((module) => module.moduleId !== id));
        Alert.alert('Success', 'Module deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting module:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.error || 'Failed to delete module');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Module</Text>
      <View style={styles.editTable}>
        <TextInput
          style={styles.input}
          placeholder="Module ID"
          value={formData.moduleId}
          onChangeText={(value) => handleInputChange('moduleId', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Module Name"
          value={formData.moduleName}
          onChangeText={(value) => handleInputChange('moduleName', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={formData.description}
          onChangeText={(value) => handleInputChange('description', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Credit"
          value={formData.credit}
          onChangeText={(value) => handleInputChange('credit', value)}
        />
        <Button title="Add/Update Module" onPress={handleSubmit} />
      </View>

      <Text style={styles.title}>Modules List</Text>
      <View style={styles.listTable}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell, styles.moduleIdColumn]}>Module ID</Text>
          <Text style={[styles.cell, styles.headerCell, styles.moduleNameColumn]}>Module Name</Text>
          <Text style={[styles.cell, styles.headerCell, styles.descriptionColumn]}>Description</Text>
          <Text style={[styles.cell, styles.headerCell, styles.creditColumn]}>Credit</Text>
          <Text style={[styles.cell, styles.headerCell]}></Text>
          <Text style={[styles.cell, styles.headerCell]}></Text>
        </View>

        {modules.map((module, index) => (
          <View
            key={module.moduleId}
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
          >
            <Text style={[styles.cell, styles.moduleIdColumn]}>{module.moduleId}</Text>
            <Text style={[styles.cell, styles.moduleNameColumn]}>{module.moduleName}</Text>
            <Text style={[styles.cell, styles.descriptionColumn]}>{module.description}</Text>
            <Text style={[styles.cell, styles.creditColumn]}>{module.credit}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(module.moduleId)}
            >
              <Text style={styles.deleteButtonText}>DELETE</Text>
            </TouchableOpacity>
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
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
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
    paddingHorizontal: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  headerCell: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Explicit column widths using flexBasis
  moduleIdColumn: {
    flexBasis: '15%', // Adjust width as needed
  },
  moduleNameColumn: {
    flexBasis: '30%', // Adjust width as needed
  },
  descriptionColumn: {
    flexBasis: '30%', // Adjust width as needed
  },
  creditColumn: {
    flexBasis: '10%', // Adjust width as needed
  },
});

export default ManageModules;
