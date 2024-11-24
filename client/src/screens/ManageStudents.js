import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    fname: '',
    lname: '',
    address: '',
    contact: '',
    email: '',
    dob: '',
    password: '',
    username: ''
  });
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch the list of students from the API
  const fetchStudents = async () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Error', 'You must be logged in to access this page.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/student', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setStudents(data.data);
        } else {
          Alert.alert('Error', 'Fetched data is not an array.');
        }
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to fetch students');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while fetching student data');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to generate username automatically
  const generateUsername = (fname, lname) => {
    return `${fname.toLowerCase()}${lname.toLowerCase()}`;
  };

  const handleInputChange = (key, value) => {
    setFormData(prevData => {
      const newData = { ...prevData, [key]: value };

      // Automatically generate username when fname or lname is changed
      if (key === 'fname' || key === 'lname') {
        newData.username = generateUsername(newData.fname, newData.lname);
      }

      return newData;
    });
  };

  const handleSubmit = async () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Error', 'You must be logged in to add a student');
      return;
    }

    // Validate required fields
    if (!formData.id || !formData.username || !formData.password || !formData.fname || !formData.lname ||
        !formData.address || !formData.contact || !formData.dob || !formData.email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Add student data (Including id from the form)
    setLoading(true);  // Start loading indicator
    try {
      const response = await fetch('http://localhost:3001/api/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          id: formData.id,       // Include id from the input
          username: formData.username,
          password: formData.password,
          fname: formData.fname,
          lname: formData.lname,
          address: formData.address,
          contact: formData.contact,
          dob: formData.dob,
          email: formData.email
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Student added successfully!');
        setFormData({
          id: '', username: '', password: '', fname: '', lname: '', address: '', contact: '', dob: '', email: ''
        });
        fetchStudents(); // Re-fetch students after adding
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to add student');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while adding student');
    } finally {
      setLoading(false);  // Stop loading indicator
    }
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Error', 'You must be logged in to delete a student');
      return;
    }

    Alert.alert(
      'Delete Student',
      'Are you sure you want to delete this student?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const response = await fetch(`http://localhost:3001/api/student/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
              });

              if (response.ok) {
                setStudents(students.filter(student => student.id !== id));
                Alert.alert('Success', 'Student deleted successfully');
              } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Failed to delete student');
              }
            } catch (error) {
              Alert.alert('Error', 'Something went wrong while deleting student');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Students</Text>

      {/* Add Student Form */}
      <View style={styles.editTable}>
        <TextInput
          style={styles.input}
          placeholder="Student ID"
          value={formData.id}  // Changed Sid to id for consistency
          onChangeText={(value) => handleInputChange('id', value)}  // Changed Sid to id
        />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={formData.fname}  // Changed Sfname to fname
          onChangeText={(value) => handleInputChange('fname', value)}  // Changed Sfname to fname
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={formData.lname}  // Changed Slname to lname
          onChangeText={(value) => handleInputChange('lname', value)}  // Changed Slname to lname
        />
        <TextInput
          style={styles.input}
          placeholder="Username (auto-generated)"
          value={formData.username}
          editable={false}  // Make the username input read-only
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={formData.address}  // Changed Saddress to address
          onChangeText={(value) => handleInputChange('address', value)}  // Changed Saddress to address
        />
        <TextInput
          style={styles.input}
          placeholder="Contact"
          value={formData.contact}  // Changed Scontact to contact
          onChangeText={(value) => handleInputChange('contact', value)}  // Changed Scontact to contact
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}  // Changed Semail to email
          onChangeText={(value) => handleInputChange('email', value)}  // Changed Semail to email
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (YYYY-MM-DD)"
          value={formData.dob}  // Changed Sdob to dob
          onChangeText={(value) => handleInputChange('dob', value)}  // Changed Sdob to dob
        />
        <TextInput
          style={styles.input}
          placeholder="Provide a temp Password for student login account"
          value={formData.password}
          onChangeText={(value) => handleInputChange('password', value)}
          secureTextEntry
        />
        <Button title="Add Student" onPress={handleSubmit} disabled={loading} />
      </View>

      {/* Students Table */}
      <Text style={styles.title}>Students List</Text>
      <ScrollView style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>ID</Text>
          <Text style={styles.tableHeader}>Full Name</Text>
          <Text style={styles.tableHeader}>Contact</Text>
          <Text style={styles.tableHeader}>Email</Text>
          <Text style={styles.tableHeader}>DOB</Text>
          <Text style={styles.tableHeader}>Actions</Text>
        </View>

        {/* Table Body */}
        {students.length > 0 ? (
          students.map((student) => (
            <View key={student.Sid} style={styles.tableRow}>  {/* Changed Sid to id */}
              <Text style={[styles.tableCell, { textAlign: 'center' }]}>{student.Sid}</Text>  {/* Changed Sid to id */}
              <Text style={[styles.tableCell, { textAlign: 'left' }]}>{student.Sfname} {student.Slname}</Text>  {/* Changed Sfname, Slname to fname, lname */}
              <Text style={[styles.tableCell, { textAlign: 'center' }]}>{student.Scontact}</Text>  {/* Changed Scontact to contact */}
              <Text style={[styles.tableCell, { textAlign: 'left' }]}>{student.Semail}</Text>  {/* Changed Semail to email */}
              <Text style={[styles.tableCell, { textAlign: 'center' }]}>{student.Sdob}</Text>  {/* Changed Sdob to dob */}
              <View style={styles.tableCell}>
                <TouchableOpacity onPress={() => handleDelete(student.Sid)}>  {/* Changed Sid to id */}
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No students found</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  editTable: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  table: {
    marginTop: 20,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  buttonText: {
    color: '#f00',
    textAlign: 'center',
  },
  noDataText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
  },
});

export default ManageStudents;
