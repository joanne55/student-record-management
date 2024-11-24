import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
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
      if (error.response) {
        // Request made and server responded with a status code outside the range 2xx
        Alert.alert('Error', `Failed to load lecturers. Status code: ${error.response.status}`);
      } else if (error.request) {
        // Request made but no response was received
        Alert.alert('Error', 'No response from server');
      } else {
        // Something else went wrong
        Alert.alert('Error', `Error: ${error.message}`);
      }
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
      Alert.alert('Error', 'Session expired. Please log in again.');
      return;
    }
  
    // Validation to ensure all fields are filled
    if (!formData.lecturerID || !formData.fname || !formData.lname || !formData.email) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
  
    try {
      console.log('Sending data to backend:', formData); // Log the form data
  
      const postData = {
        id: formData.lecturerID,
        username: `${formData.fname.toLowerCase()}${formData.lecturerID}`,
        password: 'password123',
        fname: formData.fname,
        lname: formData.lname,
        address: formData.address,
        contact: formData.contact,
        email: formData.email,
        department: formData.department,
      };
  
      const response = await axios.post('http://localhost:3001/api/lecturer', postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Response from backend:', response);
  
      if (response.status === 201) {
        Alert.alert('Success', 'Lecturer added successfully!');
        setFormData({
          lecturerID: '',
          fname: '',
          lname: '',
          address: '',
          contact: '',
          email: '',
          department: '',
        });
        fetchLecturers();
      } else {
        Alert.alert('Error', 'Failed to add/update lecturer.');
      }
    } catch (error) {
      console.error('Detailed Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to add/update lecturer. Check logs for details.');
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
        </View>

        {lecturers.map((lecturer, index) => (
          <View
            key={lecturer.id}
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
  lecturerIdColumn: {
    flexBasis: '10%',
  },
  fullNameColumn: {
    flexBasis: '20%',
  },
  addressColumn: {
    flexBasis: '20%',
  },
  contactColumn: {
    flexBasis: '15%',
  },
  emailColumn: {
    flexBasis: '20%',
  },
  departmentColumn: {
    flexBasis: '15%',
  },
});

export default ManageLecturers;
