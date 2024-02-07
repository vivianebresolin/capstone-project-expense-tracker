import { collection, getDocs } from 'firebase/firestore';
import { db } from './config';

export async function getAllExpenses() {
  const querySnapshot = await getDocs(collection(db, 'expenses'));
  const expensesList = [];

  querySnapshot.forEach((doc) => {
    expensesList.push(
      {
        ...doc.data(),
        id: doc.id
      }
    );
  });

  return expensesList;
}