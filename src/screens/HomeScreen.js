import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import GlobalSearchIcon from '../assets/icons/GlobalSearchIcon';
import NewIcon from '../assets/icons/NewIcon';
import NewShoppingBagIcon from '../assets/icons/NewShoppingBagIcon';
import RightArrowIcon from '../assets/icons/RightArrowIcon';

const HomeScreen = React.memo(({ navigation }) => {
  const [activeTab, setActiveTab] = useState('My');

  // Memoize categories data to prevent recreation on each render
  const categories = useMemo(() => [
    { id: '1', name: 'Sale', isSale: true },
    { id: '2', name: 'Lifestyle', isSale: false },
    { id: '3', name: 'Running', isSale: false },
    { id: '4', name: 'Soccer', isSale: false },
    { id: '5', name: 'Tennis', isSale: false },
    { id: '6', name: 'Golf', isSale: false },
  ], []);

  // Memoize tabs array to prevent recreation
  const tabs = useMemo(() => ['My', 'Men', 'Women', 'Kids'], []);

  // Optimized navigation handlers with useCallback
  const handleNavigateToSearch = useCallback(() => {
    navigation?.navigate('SearchScreen', { previousScreen: 'Home' });
  }, [navigation]);

  const handleNavigateToFavourites = useCallback(() => {
    navigation?.navigate('favourites');
  }, [navigation]);

  const handleNavigateToBag = useCallback(() => {
    console.log('Attempting to navigate to Bag screen');
    navigation?.navigate('bagemptyscreen', { previousScreen: 'Home' });
  }, [navigation]);

  const handleNavigateToProduct = useCallback(() => {
    navigation?.navigate('ProductViewOne');
  }, [navigation]);

  const handleTabPress = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  // Memoized category renderer with performance optimization
  const renderCategoryItem = useCallback((item) => (
    <TouchableOpacity 
      key={item.id} 
      style={[
        styles.categoryItem,
        item.name === 'Golf' && styles.lastCategoryItem
      ]}
      onPress={handleNavigateToProduct}
      accessibilityRole="button"
      accessibilityLabel={`${item.name} category${item.isSale ? ' - On Sale' : ''}`}
      accessibilityHint="Navigate to product listing"
    >
      <View style={styles.categoryImageContainer}>
        <View style={styles.categoryImagePlaceholder} />
      </View>
      <View style={styles.categoryInfo}>
        <Text style={[styles.categoryName, item.isSale && styles.saleText]}>
          {item.name}
        </Text>
      </View>
      <RightArrowIcon size={24} color="#292526" />
    </TouchableOpacity>
  ), [handleNavigateToProduct]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.shopTitle} accessibilityRole="header">Shop</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={handleNavigateToSearch}
            accessibilityRole="button"
            accessibilityLabel="Search"
            accessibilityHint="Navigate to search screen"
          >
            <GlobalSearchIcon size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={handleNavigateToFavourites}
            accessibilityRole="button"
            accessibilityLabel="Favourites"
            accessibilityHint="Navigate to favourites"
          >
            <NewIcon size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={handleNavigateToBag}
            accessibilityRole="button"
            accessibilityLabel="Shopping bag"
            accessibilityHint="Navigate to shopping bag"
          >
            <NewShoppingBagIcon size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <View style={styles.tabWrapper}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
                index === 0 && styles.firstTab
              ]}
              onPress={() => handleTabPress(tab)}
              accessibilityRole="tab"
              accessibilityLabel={`${tab} tab`}
              accessibilityState={{ selected: activeTab === tab }}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          {categories.map(renderCategoryItem)}
        </View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 16, // 16px top padding
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16, // Consistent spacing
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  shopTitle: {
    fontSize: 28,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.168,
    lineHeight: 33.6, // 1.2 line height as in Figma
    fontFamily: 'Montserrat-Medium',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 23, // Match Figma spacing between icons
  },
  iconButton: {
    padding: 4, // Reduce padding for better visual spacing
  },

  // Tab Navigation Styles
  tabContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#CDCDCD',
    paddingTop: 12, // Add top padding to match Figma
    flexDirection: 'row',
    position: 'relative',
  },
  tabWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 4,
    flex: 1,
  },
  tab: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 16,
    position: 'relative',
  },
  firstTab: {
    paddingLeft: 16,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeTab: {
    // Active tab styling handled by indicator
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#767676',
    letterSpacing: -0.4,
    fontFamily: 'Montserrat-Medium',
  },
  activeTabText: {
    color: '#000000',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#000000',
  },

  // Content Styles
  content: {
    flex: 1,
    marginTop: 6, // Small gap after tabs to match Figma content positioning
  },
  categoriesContainer: {
    paddingTop: 0, // Remove extra top padding
  },

  // Category Item Styles
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
  },
  lastCategoryItem: {
    borderBottomWidth: 0,
  },
  categoryImageContainer: {
    marginRight: 16,
  },
  categoryImagePlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    letterSpacing: -0.14,
    lineHeight: 16.8, // 1.2 line height as in Figma
    fontFamily: 'Montserrat-Regular',
  },
  saleText: {
    color: '#CA3327',
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default HomeScreen;
