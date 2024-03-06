import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const CategoriesDropdown = ({ categories, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onSelectCategory(value);
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        placeholder={{ label: 'Select category:', value: null }}
        onValueChange={handleCategoryChange}
        items={categories.map(category => ({ label: category, value: category }))}
        value={selectedCategory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 106,
    backgroundColor: '#E2E2E2',
  },
});

export default CategoriesDropdown;
