import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

const UpdateResults = () => {
  const [grades, setGrades] = useState([]);
  const [formData, setFormData] = useState({
    studentID: '',
    moduleID: '',
    grade: '',
  });

  // Handle input changes to update form data
  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // Fetch all grades from the backend
  const fetchGrades = async () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3001/api/course', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGrades(response.data.data || []); // Set the courses list from the API response
    } catch (error) {
      console.error('Error fetching grades:', error);
      Alert.alert('Error', 'Failed to load grades');
    }
  };

  // Fetch courses when the component mounts
  useEffect(() => {
    fetchGrades();
  }, []);

  // Handle form submission for adding or updating a course
  const handleSubmit = async () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    try {
      // Prepare the data in the format expected by the backend
      const postData = {
        studentID: formData.studentID,  // mapping student ID
        moduleID: formData.moduleID,  // mapping module ID
        grade: formData.grade, // mapping grade
      };

      const response = await axios.post('http://localhost:3001/api/course', postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Grade added successfully!');
        // Reset form data
        setFormData({
            studentID: '',
          moduleID: '',
          grade: '',
        });
        // Re-fetch courses
        fetchGrades();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add/update course');
    }
  };

  const handleUpdate = async (id) => {
    const token = sessionStorage.getItem('authToken');
    console.log('Update grade with ID:', id);
    if (!token) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3001/api/course/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setGrades((prevCourses) => prevCourses.filter((course) => course.courseId !== id)); //need to change
        Alert.alert('Success', 'Course deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting grade:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.error || 'Failed to delete grade');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Grade</Text>
      <View style={styles.editTable}>
        <TextInput
          style={styles.input}
          placeholder="Student ID"
          value={formData.studentID}
          onChangeText={(value) => handleInputChange('studentID', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Module ID"
          value={formData.moduleID}
          onChangeText={(value) => handleInputChange('moduleID', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Grade"
          value={formData.grade}
          onChangeText={(value) => handleInputChange('grade', value)}
        />
        <Button title="Add/Update Grade" onPress={handleSubmit} />
      </View>

      <Text style={styles.title}>Grades List</Text>
      <View style={styles.listTable}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell, styles.courseIdColumn]}>Student ID</Text>
          <Text style={[styles.cell, styles.headerCell, styles.courseNameColumn]}>Module ID</Text>
          <Text style={[styles.cell, styles.headerCell, styles.descriptionColumn]}>Grade</Text>
          <Text style={[styles.cell, styles.headerCell]}></Text>
          <Text style={[styles.cell, styles.headerCell]}></Text>
        </View>

        {grades.map((grade, index) => (
          <View
            key={grade}
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
          >
            <Text style={[styles.cell, styles.courseIdColumn]}>{grade.studentID}</Text>
            <Text style={[styles.cell, styles.courseNameColumn]}>{grade.moduleID}</Text>
            <Text style={[styles.cell, styles.descriptionColumn]}>{grade.grade}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleUpdate(grade)}
            >
              <Text style={styles.deleteButtonText}>UPDATE</Text>
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
  courseIdColumn: {
    flexBasis: '20%',
  },
  courseNameColumn: {
    flexBasis: '30%',
  },
  descriptionColumn: {
    flexBasis: '40%',
  },
});

export default UpdateResults;
