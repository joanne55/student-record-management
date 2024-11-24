import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseId: '',
    courseName: '',
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
      Alert.alert('Error', 'Failed to load courses');
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
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    try {
      // Prepare the data in the format expected by the backend
      const postData = {
        courseId: formData.courseId,  // mapping course ID
        courseName: formData.courseName,  // mapping course name
        description: formData.description, // mapping course description
      };

      const response = await axios.post('http://localhost:3001/api/course', postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Course added successfully!');
        // Reset form data
        setFormData({
          courseId: '',
          courseName: '',
          description: '',
        });
        // Re-fetch courses
        fetchCourses();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add/update course');
    }
  };

  // Handle course deletion
  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('authToken');
    console.log('Deleting course with ID:', id);
    if (!token) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this course?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:3001/api/course/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCourses((prevCourses) => prevCourses.filter((course) => course.courseId !== id));
        Alert.alert('Success', 'Course deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting course:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.error || 'Failed to delete course');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Course</Text>
      <View style={styles.editTable}>
        <TextInput
          style={styles.input}
          placeholder="Course ID"
          value={formData.courseId}
          onChangeText={(value) => handleInputChange('courseId', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Course Name"
          value={formData.courseName}
          onChangeText={(value) => handleInputChange('courseName', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={formData.description}
          onChangeText={(value) => handleInputChange('description', value)}
        />
        <Button title="Add/Update Course" onPress={handleSubmit} />
      </View>

      <Text style={styles.title}>Courses List</Text>
      <View style={styles.listTable}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell, styles.courseIdColumn]}>Course ID</Text>
          <Text style={[styles.cell, styles.headerCell, styles.courseNameColumn]}>Course Name</Text>
          <Text style={[styles.cell, styles.headerCell, styles.descriptionColumn]}>Description</Text>
          <Text style={[styles.cell, styles.headerCell]}></Text>
          <Text style={[styles.cell, styles.headerCell]}></Text>
        </View>

        {courses.map((course, index) => (
          <View
            key={course.courseId}
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
          >
            <Text style={[styles.cell, styles.courseIdColumn]}>{course.courseId}</Text>
            <Text style={[styles.cell, styles.courseNameColumn]}>{course.courseName}</Text>
            <Text style={[styles.cell, styles.descriptionColumn]}>{course.description}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(course.courseId)}
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

export default ManageCourses;
