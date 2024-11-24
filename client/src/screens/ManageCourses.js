import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseID: '',
    name: '',
    description: '',
  });

  // Handle input changes to update form data
  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // Fetch all courses from the backend
  const fetchCourses = async () => {
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
      setCourses(response.data.data || []); // Set the courses list from the API response
    } catch (error) {
      console.error('Error fetching courses:', error);
      if (error.response) {
        Alert.alert('Error', `Failed to load courses. Status code: ${error.response.status}`);
      } else if (error.request) {
        Alert.alert('Error', 'No response from server');
      } else {
        Alert.alert('Error', `Error: ${error.message}`);
      }
    }
  };

  // Fetch courses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle form submission for adding or updating a course
  const handleSubmit = async () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Error', 'Session expired. Please log in again.');
      return;
    }

    // Validation to ensure all fields are filled
    if (!formData.courseID || !formData.name || !formData.description) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    try {
      console.log('Sending data to backend:', formData); // Log the form data

      const postData = {
        id: formData.courseID,
        name: formData.name,
        description: formData.description,
      };

      const response = await axios.post('http://localhost:3001/api/course', postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Response from backend:', response);

      if (response.status === 201) {
        Alert.alert('Success', 'Course added successfully!');
        setFormData({
          courseID: '',
          name: '',
          description: '',
        });
        fetchCourses();
      } else {
        Alert.alert('Error', 'Failed to add/update course.');
      }
    } catch (error) {
      console.error('Detailed Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to add/update course. Check logs for details.');
    }
  };

  // Handle deleting a course
  const handleDelete = async () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Error', 'Session expired. Please log in again.');
      return;
    }

    if (!formData.courseID) {
      Alert.alert('Error', 'Course ID is required for deletion.');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3001/api/course/${formData.courseID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Course deleted successfully!');
        setFormData({
          courseId: '',
          name: '',
          description: '',
        });
        fetchCourses();
      } else {
        Alert.alert('Error', 'Failed to delete course.');
      }
    } catch (error) {
      console.error('Detailed Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to delete course. Check logs for details.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Course</Text>
      <View style={styles.editTable}>
        <TextInput
          style={styles.input}
          placeholder="Course ID"
          value={formData.courseID}
          onChangeText={(value) => handleInputChange('courseID', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Course Name"
          value={formData.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={formData.description}
          onChangeText={(value) => handleInputChange('description', value)}
        />
        <View style={styles.buttonContainer}>
          <Button title="Add/Update Course" onPress={handleSubmit} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Delete Course" onPress={handleDelete} color="red" />
        </View>
      </View>

      <Text style={styles.title}>Courses List</Text>
      <View style={styles.listTable}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell, styles.courseIdColumn]}>CourseID</Text>
          <Text style={[styles.cell, styles.headerCell, styles.nameColumn]}>Name</Text>
          <Text style={[styles.cell, styles.headerCell, styles.descriptionColumn]}>Description</Text>
        </View>

        {courses.map((course, index) => (
          <View
            key={course.id}
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
          >
            <Text style={[styles.cell, styles.courseIdColumn]}>{course.courseId}</Text>
            <Text style={[styles.cell, styles.nameColumn]}>{course.courseName}</Text>
            <Text style={[styles.cell, styles.descriptionColumn]}>{course.description}</Text>
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
  courseIdColumn: {
    flexBasis: '10%',
  },
  nameColumn: {
    flexBasis: '30%',
  },
  descriptionColumn: {
    flexBasis: '50%',
  },
  buttonContainer: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default ManageCourses;
