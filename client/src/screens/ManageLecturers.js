import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';

const ManageLecturers = () => {
    // Fetch all lecturers data, this is dummy data and need to change
    const [lecturers, setLecturers] = useState([]); // State to store lecturer data
    const lecturersData = [
        { lecturerID: 'sc101', name: 'Emily', address: '123 Clementi Avenue 5, #04-56, Singapore 120123', contact: '98765253', email: 'emily@work.edu.sg', department: 'School Of Computer Science' }, 
        { lecturerID: 'seg101', name: 'Ericson', address: '212 Yishun Street 21, #12-45, Singapore 760212', contact: '88887777', email: 'ericson@work.edu.sg', department: 'School Of Engineering' }, 
    ];

    const [formData, setFormData] = useState({
        lecturerID: '',
        fname: '',
        lname: '',
        address: '',
        contact: '',
        email: '',
        department: '',
    });
  
    // Handle add lecturer
    const handleSubmit = async () => {
      const apiUrl = 'http://localhost:3000/api/lecturers'; // Replace with your API endpoint
  
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
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
        } else {
          const errorData = await response.json();
          Alert.alert('Error', errorData.message || 'Failed to add lecturer');
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
        const confirmDelete = window.confirm('Are you sure you want to delete this lecturer?');
        if (!confirmDelete) return;
    
        try {
          await fetch(`http://localhost:3000/api/lecturer/${id}`, {
            method: 'DELETE',
          });
          setLecturers((prevLecturers) => prevLecturers.filter((lecturer) => lecturer.id !== id));
          alert('lecturer deleted successfully');
        } catch (error) {
          console.error('Error deleting lecturer:', error);
          alert('Failed to delete lecturer');
        }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add Lecturer</Text>
        <View style={styles.editTable}>
          {/* <Text style={styles.title}>Add Student</Text> */}
          
          <TextInput
            style={styles.input}
            placeholder="Lecturer ID"
            value={formData.lecturerID}
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
            placeholder="Department"
            value={formData.department}
            onChangeText={(value) => handleInputChange('department', value)}
          />

          {/* Submit Button */}
          <Button title="Add/Update Lecturer" onPress={handleSubmit} />
        </View>

        <Text style={styles.title}>Lecturers List</Text>

        <View style={styles.listTable}>
            {/* Header Row */}
            <View style={[styles.row, styles.headerRow]}>
              <Text style={[styles.cell, styles.headerCell]}>LecturerID</Text>
              <Text style={[styles.cell, styles.headerCell]}>Full Name</Text>
              <Text style={[styles.cell, styles.headerCell]}>Address</Text>
              <Text style={[styles.cell, styles.headerCell]}>Contact</Text>
              <Text style={[styles.cell, styles.headerCell]}>Email</Text>
              <Text style={[styles.cell, styles.headerCell]}>Department</Text>
              <Text style={[styles.cell, styles.headerCell]}></Text>
              <Text style={[styles.cell, styles.headerCell]}></Text>
            </View>
  
            {/* Data Rows */}
            {lecturersData.map((items, index) => (
              <View
                key={items}
                style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
              >
                <Text style={styles.cell}>{items.lecturerID}</Text>
                <Text style={styles.cell}>{items.name}</Text>
                <Text style={styles.cell}>{items.address}</Text>
                <Text style={styles.cell}>{items.contact}</Text>
                <Text style={styles.cell}>{items.email}</Text>
                <Text style={styles.cell}>{items.department}</Text>
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

export default ManageLecturers;
