import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const ModuleInfo = () => {
    const [modules, setModules] = useState([]);

    // Fetch all modules from the backend
    const fetchModules = async () => {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            Alert.alert('Error', 'User not authenticated');
            return;
        }

        try {
            const response = await axios.get('http://localhost:3001/api/module/lecturer', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('API Response:', response.data.data); // Debugging
            setModules(response.data.data || []); // Set the modules list from the API response
        } catch (error) {
            console.error('Error fetching modules:', error);
            Alert.alert('Error', 'Failed to load modules');
        }
    };

    // Fetch modules when the component mounts
    useEffect(() => {
        fetchModules();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>View Modules</Text>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.table}>
                    {/* Header Row */}
                    <View style={[styles.row, styles.headerRow]}>
                        <Text style={[styles.cell, styles.headerCell]}>ID</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Module Name</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Description</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Credits</Text>
                    </View>

                    {/* Data Rows */}
                    {modules.map((module, index) => (
                        <View
                            key={module.moduleId}
                            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
                        >
                            <Text style={styles.cell}>{module.Module?.moduleId || 'N/A'}</Text>
                            <Text style={styles.cell}>{module.Module?.moduleName || 'N/A'}</Text>
                            <Text style={styles.cell}>{module.Module?.description || 'N/A'}</Text>
                            <Text style={styles.cell}>{module.Module?.credit || 'N/A'}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
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
    scrollContainer: {
        flex: 1,
        marginTop: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    table: {
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
});

export default ModuleInfo;
