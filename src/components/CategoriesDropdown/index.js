import React, { useState } from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import styles from "./styles";

const CategoriesDropdown = ({ categories, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onSelectCategory(value);
  };

  return (
    <View style={styles.container}>
      <View>
        <RNPickerSelect
          placeholder={{ label: 'All Categories', value: 'All Categories' }}
          onValueChange={handleCategoryChange}
          items={categories.map(category => ({ label: category, value: category }))}
          value={selectedCategory}
        />
      </View>
    </View>
  );
};

export default CategoriesDropdown;
