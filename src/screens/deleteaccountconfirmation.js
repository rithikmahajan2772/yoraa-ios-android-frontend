import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Linking,
  ScrollView,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FontSizes, FontWeights, Spacing } from '../constants/styles';
import DeleteAccountConfirmationModal from './deleteaccountconfirmationmodal';

const DeleteAccountConfirmation = ({ navigation, route }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLearnMorePress = () => {
    // Replace with your actual learn more URL
    const learnMoreUrl = 'https://yoraa.com/account-deletion-info';
    Linking.openURL(learnMoreUrl).catch(err => {
      if (__DEV__) {
        console.error('Error opening learn more link:', err);
      }
      Alert.alert('Error', 'Unable to open link');
    });
  };

  const handleDeleteAccount = () => {
    if (!isChecked) {
      Alert.alert(
        'Confirmation Required',
        'Please confirm that you want to delete your account.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    // Handle final account deletion logic here
    // Add your account deletion API call here
    
    // Show the confirmation modal directly
    setShowModal(true);
  };

  const renderCheckbox = () => (
    <TouchableOpacity style={styles.checkboxContainer} onPress={() => setIsChecked(!isChecked)}>
      <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
        {isChecked && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.navigate('DeleteAccount')}
        >
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delete Account</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.questionText}>
          Are you sure you want to delete your Yoraa account?
        </Text>

        <Text style={styles.sectionTitle}>On deletion of account</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            you'll lose all data associated with Yoraa app accounts that uses the same email address and phone number further You'll be disconnected from YORAA partner sites, media, collaborations and the associated{' '}
            <Text style={styles.highlightedText}>point balance will be lost.</Text>
          </Text>
          <TouchableOpacity onPress={handleLearnMorePress}>
            <Text style={styles.learnMoreText}>Learn more.</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.changeOfMindText}>
          If you change mind, you can always come back to open new account with us.
        </Text>

        <Text style={styles.finalConfirmationText}>
          Are you sure you want to delete your account? (This Can't be undone)
        </Text>

        <View style={styles.checkboxRow}>
          {renderCheckbox()}
          <Text style={styles.checkboxText}>
            Yes, I want to delete my account.
          </Text>
        </View>

        <Text style={styles.disclaimerText}>
          After you submit your request, we will disable your account. It may take up to 30 days to fully delete and remove all of your data.
        </Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.deleteButton,
            !isChecked && styles.deleteButtonDisabled
          ]}
          onPress={handleDeleteAccount}
          disabled={!isChecked}
        >
          <Text style={[
            styles.deleteButtonText,
            !isChecked && styles.deleteButtonTextDisabled
          ]}>
            Delete Account
          </Text>
        </TouchableOpacity>
      </View>

      {/* Delete Account Confirmation Modal */}
      <DeleteAccountConfirmationModal
        visible={showModal}
        navigation={navigation}
        onClose={() => setShowModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background || '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg || 16,
    paddingVertical: Spacing.md || 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight || '#E5E5E5',
    paddingTop: 16,
  },
  backButton: {
    padding: Spacing.sm || 8,
    marginRight: Spacing.md || 12,
  },
  backButtonText: {
    fontSize: 24,
    color: Colors.textPrimary || '#000000',
    fontWeight: FontWeights.medium || '500',
  },
  headerTitle: {
    fontSize: FontSizes.lg || 16,
    fontWeight: FontWeights.medium || '500',
    color: Colors.textPrimary || '#000000',
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // To center the title properly
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl || 32,
  },
  questionText: {
    fontSize: FontSizes.md || 14,
    color: Colors.textPrimary || '#000000',
    marginTop: Spacing.xl || 24,
    marginBottom: Spacing.lg || 16,
    fontWeight: FontWeights.light || '300',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: FontSizes.md || 14,
    color: Colors.textPrimary || '#000000',
    marginBottom: Spacing.md || 12,
    fontWeight: FontWeights.light || '300',
  },
  infoContainer: {
    marginBottom: Spacing.xl || 24,
  },
  infoText: {
    fontSize: FontSizes.md || 14,
    color: Colors.textPrimary || '#000000',
    lineHeight: 20,
    fontWeight: FontWeights.light || '300',
  },
  highlightedText: {
    color: '#EA4335',
    fontWeight: FontWeights.bold || 'bold',
    textDecorationLine: 'underline',
  },
  learnMoreText: {
    fontSize: FontSizes.md || 14,
    color: Colors.textPrimary || '#000000',
    textDecorationLine: 'underline',
    fontWeight: FontWeights.bold || 'bold',
    marginTop: 4,
  },
  changeOfMindText: {
    fontSize: FontSizes.md || 14,
    color: Colors.textPrimary || '#000000',
    lineHeight: 20,
    marginBottom: Spacing.xl || 24,
    fontWeight: FontWeights.light || '300',
  },
  finalConfirmationText: {
    fontSize: FontSizes.md || 14,
    color: Colors.textPrimary || '#000000',
    lineHeight: 20,
    marginBottom: Spacing.lg || 16,
    fontWeight: FontWeights.light || '300',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg || 16,
  },
  checkboxContainer: {
    marginRight: Spacing.md || 12,
    marginTop: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#BCBCBC',
    backgroundColor: Colors.background || '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  checkboxChecked: {
    backgroundColor: '#111111',
    borderColor: '#111111',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: FontWeights.bold || 'bold',
  },
  checkboxText: {
    flex: 1,
    fontSize: FontSizes.md || 14,
    color: '#767676',
    lineHeight: 20,
    fontWeight: FontWeights.regular || '400',
  },
  disclaimerText: {
    fontSize: 12,
    color: Colors.textPrimary || '#000000',
    lineHeight: 18,
    marginBottom: Spacing.xl || 24,
    fontWeight: FontWeights.light || '300',
  },
  buttonContainer: {
    paddingHorizontal: Spacing.xl || 24,
    paddingVertical: Spacing.xl || 32,
  },
  deleteButton: {
    backgroundColor: '#000000',
    paddingVertical: Spacing.lg || 16,
    borderRadius: 100,
    alignItems: 'center',
    height: 51,
    justifyContent: 'center',
  },
  deleteButtonDisabled: {
    backgroundColor: '#BCBCBC',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: FontSizes.lg || 16,
    fontWeight: FontWeights.medium || '500',
  },
  deleteButtonTextDisabled: {
    color: '#FFFFFF',
    opacity: 0.7,
  },
});

export default DeleteAccountConfirmation;
