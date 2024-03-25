
import { useRef } from 'react';
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useExpenses } from "../../../../context/expensesContext";

export default function AppPieChart() {
  const { expenses } = useExpenses();
  const categoryDataRef = useRef(null);

  function getCategoryData() {
    const totalSum = expenses.reduce((acc, item) => acc + parseFloat(item.amount), 0);

    const groupedData = expenses.reduce((acc, item) => {
      const category = item.category;
      acc[category] = acc[category] || { total: 0 };
      acc[category].total += parseFloat(item.amount);
      return acc;
    }, {});

    let highestTotalCategory = null;
    let highestTotalAmount = 0;
    for (const category in groupedData) {
      if (groupedData[category].total > highestTotalAmount) {
        highestTotalAmount = groupedData[category].total;
        highestTotalCategory = category;
      }
    }

    const colors = ['#177AD5', '#ED6665', '#FFA504', '#20B2AA', '#9370DB'];

    const result = Object.keys(groupedData).map((category, index) => {
      const total = groupedData[category].total;
      const percent = Math.round((total / totalSum) * 100);
      const color = colors[index % colors.length];
      const focused = category === highestTotalCategory;
      return { color, total, category, focused, value: percent, text: category };
    });

    categoryDataRef.current = result;

    return result;
  }

  const pieData = getCategoryData();

  const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    const halfLength = Math.ceil(categoryDataRef.current.length / 2); // Calculate the midpoint to split the data into two columns
    const firstColumnData = categoryDataRef.current.slice(0, halfLength);
    const secondColumnData = categoryDataRef.current.slice(halfLength);

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          {firstColumnData.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              {renderDot(item.color)}
              <Text style={{ color: 'white', marginLeft: 5 }}>{`${item.category}: ${item.value}%`}</Text>
            </View>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          {secondColumnData.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              {renderDot(item.color)}
              <Text style={{ color: 'white', marginLeft: 5 }}>{`${item.category}: ${item.value}%`}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        margin: 20,
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#232B5D',
      }}>
      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
        Expenses Distribution
      </Text>
      <View style={{ padding: 20, alignItems: 'center' }}>
        <PieChart
          data={pieData}
          donut
          showText
          textColor="#333333"
          fontWeight="bold"
          sectionAutoFocus
          radius={140}
          innerRadius={50}
          innerCircleColor={'#232B5D'}
        />
      </View>
      {renderLegendComponent()}
    </View>
  );
}