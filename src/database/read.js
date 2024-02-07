import { collection, getDocs } from 'firebase/firestore';
import { db } from './config';
import { getUniqueId } from '../utils/deviceInfo';

export async function getAllExpenses() {
  const deviceId = await getUniqueId();
  const querySnapshot = await getDocs(collection(db, 'users', deviceId, 'expenses'));
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