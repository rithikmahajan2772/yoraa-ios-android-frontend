import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import ShoppingBagIcon from '../assets/icons/ShoppingBagIcon';
import GlobalBackButton from '../components/GlobalBackButton';
import { useBag } from '../contexts/BagContext';

const BagEmptyScreen = React.memo(({ navigation }) => {
  const { getBagItemsCount } = useBag();

  // Memoize the bag count to prevent unnecessary recalculations
  const bagItemsCount = useMemo(() => getBagItemsCount(), [getBagItemsCount]);
  
  // Check if we should show content or empty state
  const hasBagItems = bagItemsCount > 0;

  // Optimized handlers with useCallback
  const handleBackPress = useCallback(() => {
    console.log('Back button pressed, navigating to Home');
    navigation.navigate('Home');
  }, [navigation]);

  const handleShopNow = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const handleViewBag = useCallback(() => {
    navigation.navigate('BagContent');
  }, [navigation]);

  // If there are items in bag, show a different UI that leads to content
  if (hasBagItems) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackPress}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            accessibilityHint="Navigate to previous screen"
          >
            <GlobalBackButton onPress={handleBackPress} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} accessibilityRole="header">Bag</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.bagIconContainer}>
            <View style={styles.bagIconCircle}>
              <ShoppingBagIcon size={35} color="#000000" />
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.emptyText}>
              You have {bagItemsCount} item{bagItemsCount > 1 ? 's' : ''} in your <Text style={styles.boldText}>bag</Text>!
            </Text>
            <Text style={styles.descriptionText}>
              Tap below to view your bag.
            </Text>
          </View>
        </View>

        {/* View Bag Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.viewBagButton}
            onPress={handleViewBag}
            accessibilityRole="button"
            accessibilityLabel="View Bag"
            accessibilityHint="Navigate to bag content"
          >
            <Text style={styles.buttonText}>View Bag</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Empty state - no items in bag
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          accessibilityHint="Navigate to previous screen"
        >
          <GlobalBackButton onPress={handleBackPress} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} accessibilityRole="header">Bag</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Content - Empty State */}
      <View style={styles.content}>
        <View style={styles.bagIconContainer}>
          <View style={styles.bagIconCircle}>
            <ShoppingBagIcon size={27} color="#000000" />
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.emptyText}>
            Your bag is empty.
          </Text>
          <Text style={styles.descriptionText}>
            When you add products, they'll{'\n'}appear here.
          </Text>
        </View>
      </View>

      {/* Shop Now Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.shopNowButton}
          onPress={handleShopNow}
          accessibilityRole="button"
          accessibilityLabel="Shop Now"
          accessibilityHint="Navigate to shop"
        >
          <Text style={styles.buttonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 68,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.4,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    flex: 1,
  },
  headerRight: {
    width: 68,
  },

  // Content Styles
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: -100, // Adjust to center the content better
  },
  
  bagIconContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  
  bagIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },

  emptyText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
    letterSpacing: -0.384,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 24,
    marginBottom: 8,
  },

  boldText: {
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },

  descriptionText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
    letterSpacing: -0.384,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 24,
  },

  // Button Styles
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 34,
  },

  shopNowButton: {
    backgroundColor: '#000000',
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 51,
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewBagButton: {
    backgroundColor: '#000000',
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 51,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Medium',
    lineHeight: 19.2,
  },
});

export default BagEmptyScreen;