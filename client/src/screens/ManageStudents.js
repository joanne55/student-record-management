import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentID: '',
    username: '',
    password: '',  // Added password field
    fname: '',
    lname: '',
    address: '',
    contact: '',
    dob: '',
    email: '',
  });

  // Handle input changes to update form data
  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // Fetch all students from the backend
  const fetchStudents = async () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3001/api/student', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(response.data.data || []); // Set the students list from the API response
    } catch (error) {
      console.error('Error fetching students:', error);
      if (error.response) {
        Alert.alert('Error', `Failed to load students. Status code: ${error.response.status}`);
      } else if (error.request) {
        Alert.alert('Error', 'No response from server');
      } else {
        Alert.alert('Error', `Error: ${error.message}`);
      }
    }
  };

  // Fetch students when the component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle form submission for adding or updating a student
  const handleSubmit = async () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Error', 'Session expired. Please log in again.');
      return;
    }

    // Validation to ensure all fields are filled
    if (!formData.studentID || !formData.username || !formData.password || !formData.fname || !formData.lname || !formData.email) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    try {
      const postData = {
        id: formData.studentID,
        username: formData.username,
        password: formData.password, // Include the password in the post data
        fname: formData.fname,
        lname: formData.lname,
        address: formData.address,
        contact: formData.contact,
        dob: formData.dob,
        email: formData.email,
      };

      const response = await axios.post('http://localhost:3001/api/student', postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Student added successfully!');
        setFormData({
          studentID: '',
          username: '',
          password: '', // Reset password field
          fname: '',
          lname: '',
          address: '',
          contact: '',
          dob: '',
          email: '',
        });
        fetchStudents();
      } else {
        Alert.alert('Error', 'Failed to add/update student.');
      }
    } catch (error) {
      console.error('Detailed Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to add/update student. Check logs for details.');
    }
  };

  // Handle deleting a student
  const handleDelete = async () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Error', 'Session expired. Please log in again.');
      return;
    }

    if (!formData.studentID) {
      Alert.alert('Error', 'Student ID is required for deletion.');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3001/api/student/${formData.studentID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Student deleted successfully!');
        setFormData({
          studentID: '',
          username: '',
          password: '', // Reset password field
          fname: '',
          lname: '',
          address: '',
          contact: '',
          dob: '',
          email: '',
        });
        fetchStudents();
      } else {
        Alert.alert('Error', 'Failed to delete student.');
      }
    } catch (error) {
      console.error('Detailed Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to delete student. Check logs for details.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Student</Text>
      <View style={styles.editTable}>
        <TextInput
          style={styles.input}
          placeholder="Student ID"
          value={formData.studentID}
          onChangeText={(value) => handleInputChange('studentID', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={formData.username}
          onChangeText={(value) => handleInputChange('username', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={(value) => handleInputChange('password', value)}
          secureTextEntry={true} // This will mask the password input
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
          placeholder="Date of Birth"
          value={formData.dob}
          onChangeText={(value) => handleInputChange('dob', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
        />
        <View style={styles.buttonContainer}>
          <Button title="Add/Update Student" onPress={handleSubmit} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Delete Student" onPress={handleDelete} color="red" />
        </View>
      </View>

      <Text style={styles.title}>Students List</Text>
      <View style={styles.listTable}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell]}>StudentID</Text>
          <Text style={[styles.cell, styles.headerCell]}>Full Name</Text>
          <Text style={[styles.cell, styles.headerCell]}>Address</Text>
          <Text style={[styles.cell, styles.headerCell]}>Contact</Text>
          <Text style={[styles.cell, styles.headerCell]}>Email</Text>
        </View>

        {students.map((student, index) => (
          <View
            key={student.id}
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
          >
            <Text style={[styles.cell]}>{student.Sid}</Text>
            <Text style={[styles.cell]}>
              {student.Sfname} {student.Slname}
            </Text>
            <Text style={[styles.cell]}>{student.Saddress}</Text>
            <Text style={[styles.cell]}>{student.Scontact}</Text>
            <Text style={[styles.cell]}>{student.Semail}</Text>
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
    color: '#000',
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
    color: '#000',
  },
  buttonContainer: {
    marginBottom: 15,
    paddingHorizontal: 10,
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
    color: '#000',
  },
  headerCell: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ManageStudents;
