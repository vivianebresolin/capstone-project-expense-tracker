import { collection, addDoc } from 'firebase/firestore';
import { formatDateToDB, parseStringToFloat } from '../utils/utils';
import { db } from './config';
import { getUniqueId } from '../utils/deviceInfo';

export async function addExpense(amount, description, date) {
  const newExpense = {
    amount: parseStringToFloat(amount),
    description: description,
    date: formatDateToDB(date),
  };

  try {
    const deviceId = await getUniqueId();
    const docRef = await addDoc(collection(db, 'users', deviceId, 'expenses'), newExpense);
    return {
      ...newExpense,
      id: docRef.id
    };
  } catch (e) {
    return null;
  }
}

export async function updateExpense(updateExpense) { }

export async function deleteExpense(id) { }
