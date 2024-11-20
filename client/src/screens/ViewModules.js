import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ModuleInfo = () => {
    const modulesData = [
        { moduleID: 'TIC2001', moduleName: 'Basic Computing', description: 'This module introduces fundamental computing concepts, including hardware, software, operating systems, and basic programming.', credits: 4 }, 
        { moduleID: 'TIC1002', moduleName: 'Data structure', description: 'description for TIC1002', credits: 4 }, 
        { moduleID: 'MAC1002', moduleName: 'Machanical Engineering', description: 'description for MAC1002', credits: 4 }, 
        { moduleID: 'CEG1001', moduleName: 'Chemistry for Engineers', description: 'description for CEG1001', credits: 4 }, 
    ];

    
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>View Modules</Text>
        <View style={styles.table}>
            {/* Header Row */}
            <View style={[styles.row, styles.headerRow]}>
              <Text style={[styles.cell, styles.headerCell]}>ID</Text>
              <Text style={[styles.cell, styles.headerCell]}>Module Name</Text>
              <Text style={[styles.cell, styles.headerCell]}>Description</Text>
              <Text style={[styles.cell, styles.headerCell]}>Credits</Text>
            </View>
  
            {/* Data Rows */}
            {modulesData.map((modules, index) => (
              <View
                key={modules.moduleID}
                style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
              >
                <Text style={styles.cell}>{modules.moduleID}</Text>
                <Text style={styles.cell}>{modules.moduleName}</Text>
                <Text style={styles.cell}>{modules.description}</Text>
                <Text style={styles.cell}>{modules.credits}</Text>
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

export default ModuleInfo;
