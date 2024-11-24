import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ManageLecturers = () => {
  const [lecturers, setLecturers] = useState([]);
  const [formData, setFormData] = useState({
    lecturerID: '',
    fname: '',
    lname: '',
    address: '',
    contact: '',
    email: '',
    department: '',
  });

  // Handle input changes to update form data
  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // Fetch all lecturers from the backend
  const fetchLecturers = async () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3001/api/lecturer', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLecturers(response.data.data || []); // Set the lecturers list from the API response
    } catch (error) {
      console.error('Error fetching lecturers:', error);
      Alert.alert('Error', 'Failed to load lecturers');
    }
  };

  // Fetch lecturers when the component mounts
  useEffect(() => {
    fetchLecturers();
  }, []);

  // Handle form submission for adding or updating a lecturer
  const handleSubmit = async () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    try {
      // Prepare the data in the format expected by the backend
      const postData = {
        Lid: formData.lecturerID,    // assuming your backend expects Lid for lecturer ID
        Lfname: formData.fname,      // mapping first name
        Llname: formData.lname,      // mapping last name
        Laddress: formData.address,
        Lcontact: formData.contact,
        Lemail: formData.email,
        Ldepartment: formData.department,
      };

      const response = await axios.post('http://localhost:3001/api/lecturer', postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Lecturer added successfully!');
        // Reset form data
        setFormData({
          lecturerID: '',
          fname: '',
          lname: '',
          address: '',
          contact: '',
          email: '',
          department: '',
        });
        // Re-fetch lecturers
        fetchLecturers();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add/update lecturer');
    }
  };

  // Handle lecturer deletion
  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('authToken');
    console.log('Deleting lecturer with ID:', id);
    if (!token) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this lecturer?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:3001/api/lecturer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setLecturers((prevLecturers) => prevLecturers.filter((lecturer) => lecturer.Lid !== id));
        Alert.alert('Success', 'Lecturer deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting lecturer:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.error || 'Failed to delete lecturer');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Lecturer</Text>
      <View style={styles.editTable}>
        <TextInput
          style={styles.input}
          placeholder="Lecturer ID"
          value={formData.lecturerID}
          onChangeText={(value) => handleInputChange('lecturerID', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={formData.fname}
          onChangeText={(value) => handleInputChange('fname', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={formData.lname}
          onChangeText={(value) => handleInputChange('lname', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={formData.address}
          onChangeText={(value) => handleInputChange('address', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact"
          value={formData.contact}
          onChangeText={(value) => handleInputChange('contact', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Department"
          value={formData.department}
          onChangeText={(value) => handleInputChange('department', value)}
        />
        <Button title="Add/Update Lecturer" onPress={handleSubmit} />
      </View>

      <Text style={styles.title}>Lecturers List</Text>
      <View style={styles.listTable}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell, styles.lecturerIdColumn]}>LecturerID</Text>
          <Text style={[styles.cell, styles.headerCell, styles.fullNameColumn]}>Full Name</Text>
          <Text style={[styles.cell, styles.headerCell, styles.addressColumn]}>Address</Text>
          <Text style={[styles.cell, styles.headerCell, styles.contactColumn]}>Contact</Text>
          <Text style={[styles.cell, styles.headerCell, styles.emailColumn]}>Email</Text>
          <Text style={[styles.cell, styles.headerCell, styles.departmentColumn]}>Department</Text>
          <Text style={[styles.cell, styles.headerCell]}></Text>
          <Text style={[styles.cell, styles.headerCell]}></Text>
        </View>

        {lecturers.map((lecturer, index) => (
          <View
            key={lecturer.Lid}
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
          >
            <Text style={[styles.cell, styles.lecturerIdColumn]}>{lecturer.Lid}</Text>
            <Text style={[styles.cell, styles.fullNameColumn]}>
              {lecturer.Lfname} {lecturer.Llname}
            </Text>
            <Text style={[styles.cell, styles.addressColumn]}>{lecturer.Laddress}</Text>
            <Text style={[styles.cell, styles.contactColumn]}>{lecturer.Lcontact}</Text>
            <Text style={[styles.cell, styles.emailColumn]}>{lecturer.Lemail}</Text>
            <Text style={[styles.cell, styles.departmentColumn]}>{lecturer.Ldepartment}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(lecturer.Lid)}
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
  lecturerIdColumn: {
    flexBasis: '10%',
  },
  fullNameColumn: {
    flexBasis: '15%',
  },
  addressColumn: {
    flexBasis: '15%',
  },
  contactColumn: {
    flexBasis: '10%',
  },
  emailColumn: {
    flexBasis: '15%',
  },
  departmentColumn: {
    flexBasis: '15%',
  },
});

export default ManageLecturers;
