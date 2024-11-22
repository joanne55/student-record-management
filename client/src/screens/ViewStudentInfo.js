import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StudentInfo = ({ studentId }) => {
    const [student, setStudent] = useState(null); // Store student data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch student data, code not test yet
    useEffect(() => {
        const fetchStudent = async () => {
        try {
            const response = await fetch(`http://localhost:3000/students/${studentId}`); // API URL
            if (!response.ok) {
                throw new Error('Student not found');
            }
            const data = await response.json();
            setStudent(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        fetchStudent();
    }, [studentId]);
    
    return (
        //dummy data and need to implement
        <View style={styles.container}>
            <Text style={styles.title}>Student Information</Text>
            <View style={styles.table}>
            <View style={styles.row}>
            <Text style={styles.cellLabel}>Student ID</Text>
            <Text style={styles.cellValue}>s101</Text>
            {/* <Text style={styles.cellValue}>{student.id}</Text> // once data able to retrieve, use this intead dummy data */}
            </View>
            <View style={styles.row}>
            <Text style={styles.cellLabel}>Full Name</Text>
            <Text style={styles.cellValue}>Lee John</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.cellLabel}>Address</Text>
            <Text style={styles.cellValue}>456 Bukit Timah Road, #07-34 Singapore 259721</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.cellLabel}>Contact</Text>
            <Text style={styles.cellValue}>98987777</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.cellLabel}>Email</Text>
            <Text style={styles.cellValue}>john@u.nus.edu</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.cellLabel}>Date of Birth</Text>
            <Text style={styles.cellValue}>1999-11-11</Text>
            </View>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center', // Center table vertically
      alignItems: 'center',    // Center table horizontally
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
      },
    table: {
      width: '90%', // Table width
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingVertical: 15,
      paddingHorizontal: 10,
      backgroundColor: '#f9f9f9',
    },
    cellLabel: {
      flex: 1, // Take 1 part of the row
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'left',
    },
    cellValue: {
      flex: 2, // Take 2 parts of the row
      fontSize: 16,
      color: '#555',
      textAlign: 'left',
    },
  });

export default StudentInfo;

