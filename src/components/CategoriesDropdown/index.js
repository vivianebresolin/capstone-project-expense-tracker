import React, { useState } from 'react';
import { View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { useTheme } from '../../context/themeContext'
import { styles, pickerSelectStyles } from "./styles";

const CategoriesDropdown = ({ categories, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const { isDarkMode } = useTheme();

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
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          Icon={() => {
            return (
              <Entypo name="chevron-down" size={20} color='black' />
            )
          }}
        />
      </View>
    </View>
  );
};

export default CategoriesDropdown;
