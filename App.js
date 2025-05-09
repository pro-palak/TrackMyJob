import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';


const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/Logo.png')}
          style={styles.logo}
        />
        <Text style={styles.appTitle}>TrackMyJob</Text>
        <Text style={styles.appSubtitle}>Your Career Journey, Organized</Text>
      </View>
      <TouchableOpacity 
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('JobList')}
      >
        <Text style={styles.getStartedText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

function JobListScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const jobs = [
    { id: '1', title: 'Software Engineer', company: 'Google', status: 'Wishlist' },
    { id: '2', title: 'Frontend Developer', company: 'Meta', status: 'Pending' },
    { id: '3', title: 'UX Designer', company: 'Apple', status: 'Offer' },
    { id: '4', title: 'Product Manager', company: 'Amazon', status: 'Interview' },
    { id: '5', title: 'Data Scientist', company: 'Netflix', status: 'Pending' },
    { id: '6', title: 'DevOps Engineer', company: 'Microsoft', status: 'Wishlist' }
  ];

  const jobStats = {
    wishlist: jobs.filter(job => job.status === 'Wishlist').length,
    pending: jobs.filter(job => job.status === 'Pending').length,
    interview: jobs.filter(job => job.status === 'Interview').length,
    offer: jobs.filter(job => job.status === 'Offer').length,
    applied: jobs.filter(job => job.status === 'Applied').length,
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Job Applications</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddJob')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dashboardContainer}>

        <Text style={styles.sectionTitle}>Current Applications</Text>

        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.jobCard}
              onPress={() => navigation.navigate('AddJob', { job: item })}
            >
              <View style={styles.jobCardContent}>
                <View>
                  <Text style={styles.jobTitle}>{item.title}</Text>
                  <Text style={styles.companyName}>{item.company}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  {
                    backgroundColor: 
                      item.status === 'Wishlist' ? '#4A90E2' :
                      item.status === 'Pending' ? '#F5A623' :
                      item.status === 'Interview' ? '#D0021B' :
                      '#7ED321'
                  }
                ]}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

function AddJobScreen({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('Applied');

  const statusOptions = ['Applied', 'Interview', 'Offer', 'Wishlist'];

  const renderOptions = (options, selectedValue, onSelect) => {
    return (
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectedValue === option && styles.selectedOption
            ]}
            onPress={() => onSelect(option)}
          >
            <Text style={[
              styles.optionText,
              selectedValue === option && styles.selectedOptionText
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add New Job</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.formContainer}>
        <Text style={styles.label}>Job Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="e.g., Software Engineer"
        />

        <Text style={styles.label}>Company</Text>
        <TextInput
          style={styles.input}
          value={company}
          onChangeText={setCompany}
          placeholder="e.g., Google"
        />

        <Text style={styles.label}>Status</Text>
        {renderOptions(statusOptions, status, setStatus)}

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.saveButtonText}>Save Job</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#7C9A92',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  splashTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  splashSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
   homeContainer: {
    flex: 1,
    backgroundColor: '#7C9A92',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  appSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  getStartedButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
    width: 200,
    alignItems: 'center',
  },
  getStartedText: {
    color: '#7C9A92',
    fontSize: 18,
    fontWeight: 'bold',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  dashboardContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  jobCardContent: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },

  addButtonText: {
    fontSize: 30,
    color: 'white',
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 10,
  },

  header: {
    backgroundColor: '#7C9A92',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
  },

  addButton: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    gap: 10,
  },

  optionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#7C9A92',
    backgroundColor: 'white',
  },

  selectedOption: {
    backgroundColor: '#7C9A92',
  },

  optionText: {
    color: '#7C9A92',
    fontSize: 14,
  },

  selectedOptionText: {
    color: 'white',
  },

  formContainer: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    color: 'white',
    fontSize: 16,
  },
  jobCard: {
    backgroundColor: 'white',
    margin: 5,
    padding: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  companyName: {
    color: '#666',
    marginBottom: 10,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#7C9A92',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="JobList" component={JobListScreen} />
          <Stack.Screen name="AddJob" component={AddJobScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}