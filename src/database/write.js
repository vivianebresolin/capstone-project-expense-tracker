import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
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

export async function updateExpense(newAmount, newDescription, newDate, expenseId) {
  const updatedExpense = {
    amount: parseStringToFloat(newAmount),
    description: newDescription,
    date: formatDateToDB(newDate),
  };

  try {
    const deviceId = await getUniqueId(); 
    const expenseRef = doc(db, 'users', deviceId, 'expenses', expenseId); 
    await updateDoc(expenseRef, updatedExpense); 
    return updatedExpense; 
  } catch (error) {
    console.error('Error updating expense: ', error);
    return null; 
  }
}

export async function deleteExpense(id) {
  try {
    const deviceId = await getUniqueId();
    const expenseRef = doc(db, 'users', deviceId, 'expenses', id);
    await deleteDoc(expenseRef);
    return id;
  } catch (error) {
    console.error('Error deleting expense: ', error);
    return null;
  }
}
