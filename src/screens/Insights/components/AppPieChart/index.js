
import { useRef } from 'react';
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useExpenses } from "../../../../context/expensesContext";
import styles from "./styles";

export default function AppPieChart() {
  const { expenses } = useExpenses();
  const categoryDataRef = useRef(null);

  function getCategoryData() {
    const currentYear = new Date().getFullYear();

    // Filter expenses for the current year
    const currentYearExpenses = expenses.filter(
      item => new Date(item.date).getFullYear() === currentYear
    );
    const totalSum = currentYearExpenses.reduce((acc, item) => acc + parseFloat(item.amount), 0);

    const groupedData = currentYearExpenses.reduce((acc, item) => {
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

  const renderLegendComponent = () => {
    const halfLength = Math.ceil(categoryDataRef.current.length / 2); // Calculate the midpoint to split the data into two columns
    const firstColumnData = categoryDataRef.current.slice(0, halfLength);
    const secondColumnData = categoryDataRef.current.slice(halfLength);

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          {firstColumnData.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <View style={[styles.dot, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{`${item.category}: ${item.value}%`}</Text>
            </View>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          {secondColumnData.map((item, index) => (
            <View key={index} style={styles.legendTextView}>
              <View style={[styles.dot, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{`${item.category}: ${item.value}%`}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View
      style={styles.container}>
      <Text style={styles.title}>
        Expenses Distribution
      </Text>
      <View style={styles.chartView}>
        <PieChart
          data={pieData}
          donut
          showText
          textColor="#333333"
          fontWeight="bold"
          sectionAutoFocus
          radius={140}
          innerRadius={50}
          innerCircleColor="#232B5D"
        />
      </View>
      {renderLegendComponent()}
    </View>
  );
}