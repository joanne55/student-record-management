import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const StudentResult = () => {
    const resultData = [
        { studentID: 's101', moduleID: 'TIC2001', grade: 'A' }, 
        { studentID: 's101', moduleID: 'TIC1002', grade: 'B' }, 
        { studentID: 's102', moduleID: 'MAC1002', grade: 'A+' }, 
        { studentID: 's102', moduleID: 'CEG1001', grade: 'B' }, 
    ];
  
    return (
        <View style={styles.container}>
        <Text style={styles.title}>View Module Results</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, styles.headerCell]}>Module</Text>
            <Text style={[styles.cell, styles.headerCell]}>Result</Text>
          </View>
  
          {/* Table Rows */}
          {resultData.map((item, index) => (
            <View
              key={index}
              style={[
                styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow,
              ]}
            >
              <Text style={styles.cell}>{item.moduleID}</Text>
              <Text style={styles.cell}>{item.grade}</Text>
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
      paddingTop: 50,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      color: "#333",
    },
    table: {
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

export default StudentResult;
