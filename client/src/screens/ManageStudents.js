import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';

const ManageStudents = () => {
    // Fetch all students data, this is dummy data and need to change
    const [students, setStudents] = useState([]); // State to store student data
    const studentsData = [
        { studentID: 's101', name: 'Lee John', address: '56 Bukit Timah Road, #07-34 Singapore 259721', contact: '98987777', email: 'john@u.nus.edu', DOB: '1999-11-11' }, 
        { studentID: 's102', name: 'Wang Joanne', address: '789 Orchard Road, #10-11, Singapore 238883', contact: '98986867', email: 'joanne@u.nus.edu', DOB: '2000-11-11' }, 
    ];

    const [formData, setFormData] = useState({
      studentID: '',
      fname: '',
      lname: '',
      address: '',
      contact: '',
      email: '',
      DOB: '',
    });
  
    // Handle add student
    const handleSubmit = async () => {
      const apiUrl = 'http://localhost:3000/api/student'; // Replace with your API endpoint
  
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          Alert.alert('Success', 'Student added successfully!');
          // Reset form data
          setFormData({
            studentID: '',
            fname: '',
            lname: '',
            address: '',
            contact: '',
            email: '',
            DOB: '',
          });
        } else {
          const errorData = await response.json();
          Alert.alert('Error', errorData.message || 'Failed to add student');
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong: ' + error.message);
      }
    };
  
    // Handle form field changes
    const handleInputChange = (key, value) => {
      setFormData({ ...formData, [key]: value });
    };

    // Handle student deletion
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this student?');
        if (!confirmDelete) return;
    
        try {
          await fetch(`http://localhost:3000/api/students/${id}`, {
            method: 'DELETE',
          });
          setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
          alert('Student deleted successfully');
        } catch (error) {
          console.error('Error deleting student:', error);
          alert('Failed to delete student');
        }
    };

    


  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add Students</Text>
        <View style={styles.editTable}>
          {/* <Text style={styles.title}>Add Student</Text> */}
          
          <TextInput
            style={styles.input}
            placeholder="Student ID"
            value={formData.studentID}
            onChangeText={(value) => handleInputChange('studentID', value)}
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
            placeholder="Date of Birth"
            value={formData.DOB}
            onChangeText={(value) => handleInputChange('DOB', value)}
          />

          {/* Submit Button */}
          <Button title="Add/Update Student" onPress={handleSubmit} />
        </View>

        <Text style={styles.title}>Students List</Text>

        <View style={styles.listTable}>
            {/* Header Row */}
            <View style={[styles.row, styles.headerRow]}>
              <Text style={[styles.cell, styles.headerCell]}>StudentID</Text>
              <Text style={[styles.cell, styles.headerCell]}>Full Name</Text>
              <Text style={[styles.cell, styles.headerCell]}>Address</Text>
              <Text style={[styles.cell, styles.headerCell]}>Contact</Text>
              <Text style={[styles.cell, styles.headerCell]}>Email</Text>
              <Text style={[styles.cell, styles.headerCell]}>Date of Birth</Text>
              <Text style={[styles.cell, styles.headerCell]}></Text>
              <Text style={[styles.cell, styles.headerCell]}></Text>
            </View>
  
            {/* Data Rows */}
            {studentsData.map((items, index) => (
              <View
                key={items}
                style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
              >
                <Text style={styles.cell}>{items.studentID}</Text>
                <Text style={styles.cell}>{items.name}</Text>
                <Text style={styles.cell}>{items.address}</Text>
                <Text style={styles.cell}>{items.contact}</Text>
                <Text style={styles.cell}>{items.email}</Text>
                <Text style={styles.cell}>{items.DOB}</Text>
                <Text style={styles.cell}>UPDATE</Text>
                <Text style={styles.cell}>DELETE</Text>
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
      fontWeight: "bold",
      // textAlign: "center",
      marginBottom: 20,
      color: "#333",
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
      width: "100%",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      overflow: "hidden",
    },
    row: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    headerRow: {
      backgroundColor: "#333",
    },
    evenRow: {
      backgroundColor: "#f9f9f9",
    },
    oddRow: {
      backgroundColor: "#fff",
    },
    cell: {
      flex: 1,
      paddingVertical: 15,
      paddingHorizontal: 10,
      fontSize: 16,
      textAlign: "center",
      color: "#555",
    },
    headerCell: {
      color: "#fff",
      fontWeight: "bold",
    },
  });

export default ManageStudents;

