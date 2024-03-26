import { Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useExpenses } from "../../../../context/expensesContext";

export default function AppBarChart() {
  const { expenses } = useExpenses();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Filter expenses for the current year
  const currentYear = new Date().getFullYear();
  const currentYearExpenses = expenses.filter(expense => new Date(expense.date).getFullYear() === currentYear);

  // Initialize an object to hold total expenses for each month
  const monthlyExpenses = months.reduce((acc, month) => {
    acc[month] = 0;
    return acc;
  }, {});

  // Calculate total expenses for each month in the current year
  currentYearExpenses.forEach((expense) => {
    const date = new Date(expense.date);
    const month = months[date.getMonth()];
    monthlyExpenses[month] += parseFloat(expense.amount);
  });

  // Find the month with the highest expense
  const highestExpenseMonth = Object.keys(monthlyExpenses).reduce((highestMonth, currentMonth) => {
    return monthlyExpenses[currentMonth] > monthlyExpenses[highestMonth] ? currentMonth : highestMonth;
  }, 'Jan');

  // Create barData array for months with expenses only
  const barData = Object.keys(monthlyExpenses)
    .filter(month => monthlyExpenses[month] > 0) // Filter out months with zero expenses
    .map(month => ({
      value: monthlyExpenses[month],
      label: month,
      frontColor: month === highestExpenseMonth ? '#FF0000' : '#28B2B3',
    }));

  // Find the maximum expense amount among all months
  const maxExpenseAmount = Math.max(...Object.values(monthlyExpenses));

  return (
    <>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 25, marginTop: 10 }}>Monthly Expenses in {currentYear}</Text>
      <BarChart
        showFractionalValue
        showYAxisIndices
        noOfSections={5}
        maxValue={maxExpenseAmount}
        data={barData}
        isAnimated
      />
    </>
  );
}